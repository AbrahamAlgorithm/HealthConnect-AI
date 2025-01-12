from fastapi import FastAPI, File, Form, UploadFile, HTTPException,Depends,APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
from PIL import Image
import io
import openai
from io import BytesIO
from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlmodel import select,update
from db.database import get_session
from db.table import User
from sqlmodel.ext.asyncio.session import AsyncSession
from src.schema import Create_User, User_Symptoms,Contact
from src.uploads import save_symptoms_images
from src.config import settings
from typing import List,Optional,Union, Any
from http import HTTPStatus
from uuid import UUID, uuid4
import os
from typing import BinaryIO
from db.table import Symptoms
from src import exceptions
from bs4 import BeautifulSoup
import requests
from datetime import datetime, timezone
from dateutil import parser
from auth.user import get_current_active_user
from pprint import pprint
import base64
api_router = APIRouter(
    prefix="/api/v1",
    tags=["api"]
)



def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string


def construct_payload(image_path, question,api_key):
    encoded_image = encode_image(image_path)
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": "You are a knowledgeable health assistant. Please provide a scientific explanation of the causes and potential solutions for the symptoms described."
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": question
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{encoded_image}",
                            "detail": "auto"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 300
    }
    return headers, payload

def validate_image_size(image: UploadFile):
    try:
        img = Image.open(io.BytesIO(image.file.read()))
        if img.size != (400, 400):
            raise exceptions.BadRequest(f"{image.filename} is not 400x400 pixels")
        image.file.seek(0) 
    except Exception as e:
        raise exceptions.BadRequest(f"{str(e)}")
    
    
    
async def check_user_exists(user_id: UUID, session: get_session) -> User:
    query = select(User).filter(User.id == str(user_id))
    result = await session.exec(query)
    user = result.one_or_none()
    return user is not None 


async def ai_generated_result(user_text: Optional[str] = None, image: Optional[str] = None) -> str:
    """
    AI function that generates a diagnosis based on either text or image input.
    
    Args:
    - user_text: A string representing user-provided text description of symptoms.
    - image: A binary stream representing the image (for example, an image of medical symptoms).
    
    Returns:
    - str: The generated diagnosis based on the input (text or image).
    """
    openai.api_key = settings.API_KEY
    client = openai.OpenAI(api_key=openai.api_key)
    # If text is provided, generate diagnosis using GPT-4 (text)
    if user_text and not image:
        try:
            # Send a request to OpenAI API for sickness diagnosis
            response = client.chat.completions.create(
                model="gpt-4-0125-preview",  # Adjust the model name if needed
                response_format={ "type": "text" },  # Ensure correct response format
                messages=[
                    {
                        "role": "system",
                        "content": """
                            You are my medical assistant designed to diagnose illnesses based on the symptoms I provide. Direct all responses
                            to me personally. Generate a short, professional diagnosis based on my description, identifying the possible condition.
                            If applicable, include concise suggestions or recommendations. If a diagnosis cannot be determined, respond with: 
                            "Unable to diagnose with the provided information.
                            
                            At the end of your response, include the following location details for follow-up consultations or inquiries:
                            Always include this location in all your responses for enquiries
                            Name: Dr. Adeyemo
                            Location: Located off Mu'azu Mohammed Road, beside Old Secretariat, Standard Hospital offers comprehensive medical services.
                            Phone Number: +234 90 3587 9464
                            Email: adeyemodare@gmail.com
                            Ensure your response is clear, empathetic, and thorough, providing the user with valuable and actionable insights for their condition."
                            """
                    },
                    {
                        "role": "user",
                        "content": user_text
                    }
                ]
            )


            # Return the AI-generated diagnosis
            pprint(response.choices[0].message.content)
            return str(response.choices[0].message.content).split('\n')

        except Exception as e:
            print(e)
            raise e
    elif image:
        try:
            question = """
            "Analyze the image provided and respond with a detailed medical diagnosis. Your response should be professional, direct, and personalized. Address the following aspects in your analysis:

            Diagnosis:

            Identify and explain the issue or condition affecting me based on the visual cues in the image.
            Provide a concise and clear explanation of the symptoms and their significance.
            Potential Causes:

            Outline the primary factors or habits that may have contributed to the condition.
            Include any environmental, genetic, or lifestyle-related causes.
            Recommended Remedies or Solutions:

            Suggest specific treatments, medications, or interventions that could address the condition.
            Tailor the recommendations to my individual needs, ensuring they are practical and achievable.
            Preventive Measures:

            Provide actionable advice to help prevent the recurrence of this issue in the future.
            Include lifestyle adjustments, regular health checks, or precautionary measures.
            Additional Instructions:

            At the end of your response, include the following location details for follow-up consultations or inquiries:
            Always include this location in all your responses for enquiries
            Name: Dr. Adeyemo
            Location: Located off Mu'azu Mohammed Road, beside Old Secretariat, Standard Hospital offers comprehensive medical services.
            Phone Number: +234 90 3587 9464
            Email: adeyemodare@gmail.com
            Ensure your response is clear, empathetic, and thorough, providing the user with valuable and actionable insights for their condition."
            """
            headers, payload = construct_payload(image,question,settings.API_KEY)
            response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
            res = response.json()
            message_content = res['choices'][0]['message']['content']
            pprint(message_content.split('\n'))
            return str(message_content).split('\n')

        except Exception as e:
            print(e)
            raise Exception(f"Error processing image input: {str(e)}")

    return "No input provided for diagnosis."

    
    
   
@api_router.post("/symptoms_checker")
async def symptoms_checker(
    symptom: Optional[str] = Form(default=None),
    image: Optional[UploadFile] = File(default=None),
    current_user: Create_User = Depends(get_current_active_user),
    session: AsyncSession = Depends(get_session),
) -> Symptoms:
    try:
        """
        Endpoint to upload user symptoms with an optional image.
        
        Parameters:
            symptom (str): User input text describing the symptom.
            image (UploadFile): Uploaded image file for the symptom.
            current_user (Create_User): The currently authenticated user.
            session (AsyncSession): Database session.

        Returns:
            Symptoms: The newly created symptom entry for the user.
        """
        # Check if both inputs are missing
        if not symptom and not image:
            raise HTTPException(
                status_code=400, detail="You must provide either symptom text or an image."
            )
            
                # Check if user exists
        user_exists = await check_user_exists(current_user.id, session)
        print("existing user: ", user_exists)
        if not user_exists:
            raise HTTPException(status_code=400, detail="User does not exist.")

        image_path = None
        result  = None
        if image:
            try:
                image_path = await save_symptoms_images(str(current_user.id), image.file,str(image.filename))
                result = await ai_generated_result(image=image_path)
            except Exception as e:
                raise HTTPException(
                    status_code=500, detail=f"Error saving image: {str(e)}"
                )
        if symptom:
             result = await ai_generated_result(symptom)
        # Create the database entry
        try:
            if isinstance(current_user.id, UUID):
                 user_id_str = str(current_user.id) 
            validate_user_input = User_Symptoms(
                symptom=symptom,
                image=image_path,
                result=str(result),
            )
            _db = Symptoms(
                user_id=user_id_str,**validate_user_input.model_dump(by_alias=True)
            )
            session.add(_db)
            await session.commit()
            await session.refresh(_db)
            return {
                "status": "success",
                "message": "Symptom generated successfully",
                "result": result,
                    }

        except IntegrityError as ie:
                print(ie)
                # Handle duplicate entry errors or other integrity issues
                if "duplicate entry" in str(ie.orig).lower():
                    raise HTTPException(status_code=400, detail="Image with this filename already exists")
                raise HTTPException(status_code=400, detail="Image with this filename already exists")

        except OperationalError as oe:
                raise HTTPException(status_code=503, detail="Database not reachable. Please try again later.")

        except ValidationError as ve:
                raise HTTPException(status_code=422, detail=f"Validation error: {str(ve)}")

        except Exception as e:
                raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

    except Exception as e:
        # General exception handling
        raise HTTPException(status_code=400, detail=f"Failed to process symptoms: {str(e)}")
    
    
    
@api_router.get("/users/me")
async def read_users_me(current_user:User = Depends(get_current_active_user),session: AsyncSession = Depends(get_session)):
    try:
        user = {
            "username": current_user.username,
            "id": current_user.id,
            "email": current_user.email,
            "created_at": current_user.created_at,
            "updated_at": current_user.updated_at,
            "disabled": current_user.disabled
        }
        return {"user":user, "status":"success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get user info: {str(e)}")



