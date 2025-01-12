
from pydantic import BaseModel,EmailStr,Field,AliasChoices
from enum import Enum
from typing import Any, Annotated, Optional,Dict,List
from datetime import datetime
from fastapi import  UploadFile
from datetime import datetime,date,time
from uuid import UUID, uuid4

class Data(BaseModel):
    name:str
    
class Token(BaseModel):
    access_token:str
    token_type:str
    

class TokenData(BaseModel):
    username:str|None = None 

class User_(BaseModel):
    id:UUID
    username:str
    disabled:bool = False
    email:str | None = None
    password:str
    

    
class CreateUserRequest(BaseModel):
    username:str
    password:Optional[str | Any] = Any
    email:str
    
class Login(BaseModel):
    username:str
    password:str
