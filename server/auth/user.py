from datetime import timedelta , datetime
from typing import Annotated,Optional,Any,Dict
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi import Depends, HTTPException,status, APIRouter
from pydantic import BaseModel
from starlette import status
from jose import JWTError, jwt
from passlib.context import CryptContext
from db.database import get_session
from sqlmodel.ext.asyncio.session import AsyncSession
from db.table import User
from sqlmodel import select
import bcrypt
from .schema import *


SECRET_KEY = "535000$x6IN/FYr1vXZZJEK$bdfKb/nIQIPIYULWvdBtGrCGIiXIq8OmUArGb6clh97"
ALOGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  
# db_dependency = Annotated[AsyncSession, Depends(get_session)]

# db = {
#     "paul":{
#       "username":"pythondev",
#       "full_name":"Dare Timileyin",
#       "email": "daretimileyin1@gmail.com",
#       "hashed_password":"$2b$12$u3NxMkSA0EUfWkEGUvN/v.mvj/oJtY0ZtxhAQckqTd.m6JyXtIX7W",
#       "disabled":False
#     }
# }




router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl= "auth/token")

async def verify_password(plain_password, hashed_password):
    # return pwd_context.verify(plain_password, hashed_password
    password_byte_enc = plain_password.encode('utf-8')
    hashed_password_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password = password_byte_enc , hashed_password = hashed_password_bytes)

def get_password_hash(password):
    # return pwd_context.hash(password)
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
    return hashed_password


async def get_user(username:str,session:AsyncSession=Depends(get_session)):
    print("username",username)
    user = select(User).where(User.username == username)
    print(user)
    result = await session.exec(user)
    user_data = result.one_or_none()
    
    if user_data is not None:
        print(user_data.__dict__)
        return User_(**user_data.__dict__)



async def authenticate_user(username:str, password:str,session:AsyncSession=Depends(get_session)):
    user = await get_user(username,session) 
    if not user:
        return False
    print(user.password)
    if not  await verify_password(password, user.password):
        return False
    
    return user


async def create_access_token(data:dict, expire_delta:timedelta | None = None):
    to_encode = data.copy()
    if expire_delta:
        expire = datetime.now() + expire_delta
    else:
        expire = datetime.now() + timedelta(minutes=15)
        
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm = ALOGORITHM)
    return encoded_jwt


async def get_current_user(token:str = Depends(oauth_2_scheme),session:AsyncSession = Depends(get_session)):
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate":"Bearer"}
    )
    try:
        print("token",token)
        payload = jwt.decode(token, SECRET_KEY, algorithms = [ALOGORITHM])
        username:str = payload.get("sub")
        if not username:
            raise credential_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credential_exception 
    
    user = await get_user(token_data.username,session)
    print(user)
    if user is None: 
        print("hello")
        raise credential_exception
    
    return user


async def get_current_active_user(current_user:User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Sorry you have be disabled")
    
    return current_user


@router.post("/signup", status_code=status.HTTP_201_CREATED,response_model=Dict)
async def create_user(create_user_request:CreateUserRequest,session:AsyncSession = Depends(get_session)):
    try:
        create_user_model = User(
        username = create_user_request.username,
        email= create_user_request.email,
        password = get_password_hash(create_user_request.password)
        )
        print(create_user_model)
        session.add(create_user_model)
        await session.commit()
        await session.refresh(create_user_model)
        return {
            "status": 200,
            "message": "User created successfully",
            "data": create_user_model
        }

    except Exception as e:
        print("Error occurred:", e)
        # Rollback in case of an exception
        await session.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error occurred: {e}"
        )


@router.post("/token",response_model=Token)
async def login_for_access_token(form_data:Login,session:AsyncSession=Depends(get_session)):
    try:
        users = await authenticate_user(form_data.username,form_data.password,session)
        if not users:
            raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                                detail="Incorrect username or password",
                                headers={"WWW-Authenticate":"Bearer"})
            
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = await create_access_token(
            data={"sub":users.username}, expire_delta=access_token_expires)
        return {"access_token":access_token, "token_type":"bearer"} 
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))



# import asyncio
# password = input("enter your password:")
# hash_p = get_password_hash("darrey327739")
# print(hash_p)
    