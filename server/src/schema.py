from pydantic import BaseModel,EmailStr,Field,AliasChoices
from enum import Enum
from typing import Any, Annotated, Optional,Dict,List
from datetime import datetime
from fastapi import  UploadFile
from datetime import datetime,date,time
from uuid import UUID, uuid4



class Create_User(BaseModel):
    id:UUID
    username:str
    disabled:bool = False
    email:str | None = None
    password:str
    
    
class User_Symptoms(BaseModel):
    image: Optional[str] = Field(None, alias="image")
    symptom: Optional[str] = Field(None)
    result: Optional[str] = Field(None)
    
    class Config:
        allow_population_by_field_name = True
    
    

        
        
class Contact(BaseModel):
    name:str = Field(..., alias="name")
    email: EmailStr 
    phone:str = Field(..., alias="phone")
    description: str
    
    class Config:
        allow_population_by_field_name = True
        
        
class ImagePaths(BaseModel):
    path1: str