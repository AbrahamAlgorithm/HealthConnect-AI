from sqlmodel import SQLModel, Field, Column, Integer, String, Relationship
from uuid import UUID, uuid4
from sqlalchemy.dialects.mysql import CHAR
from datetime import datetime
from typing import Optional, List
from pydantic import EmailStr
from sqlalchemy import Text


class User(SQLModel, table=True):
    __tablename__ = "User"
    id:UUID = Field(
        sa_column=Column(type_=CHAR(36),
                         default=lambda: str(uuid4()),
                         primary_key=True, 
                         unique=True
                         
                         ) )
    username: str = Field(sa_column=Column(String(100), unique=True)),  
    email: EmailStr = Field(sa_column=Column(String(255), unique=True))
    password: str = Field(sa_column=Column(String(255)))
    disabled: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    
    # Define the relationship to Symptoms
    symptoms: List["Symptoms"] = Relationship(back_populates="user")
    
    model_config = {
        'arbitrary_types_allowed': True
    }
    

class Symptoms(SQLModel, table=True):
    __tablename__ = "Symptoms"
    id: Optional[int] = Field(default=None, primary_key=True, sa_column_kwargs={"autoincrement": True})
    symptom: str = Field(default=None, sa_column=Column(String(255)))
    image: Optional[str] = Field(default=None, sa_column=Column(Text))
    result: Optional[str] = Field(default=None, sa_column=Column(Text))
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    
    # Add the foreign key to reference the User table
    user_id: str= Field(foreign_key="User.id")
    
    # Define the relationship back to User
    user: Optional[User] = Relationship(back_populates="symptoms")
    
    model_config = {
        'arbitrary_types_allowed': True
    }

