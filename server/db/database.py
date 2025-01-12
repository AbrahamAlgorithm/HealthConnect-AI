from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import Text,SQLModel
from sqlalchemy.orm import sessionmaker
from src.config import settings




print(settings.DATABASE_URL)
asyc_engine = create_async_engine(settings.DATABASE_URL,
                                  echo=True)


async def init_db()-> None:
   async with asyc_engine.begin() as conn:
        from .table import User,Symptoms
        await conn.run_sync(SQLModel.metadata.create_all)
        
        
        
async def get_session()->AsyncSession:
    asyc_session = sessionmaker(
        bind=asyc_engine,
        class_=AsyncSession,
        expire_on_commit=False
    )
    async with asyc_session() as section:
        yield section