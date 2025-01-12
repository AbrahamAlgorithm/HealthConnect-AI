from fastapi import FastAPI
from contextlib import asynccontextmanager
from db.database import init_db
from route.api import api_router
from auth.user import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from route import path
import os

@asynccontextmanager
async def lifespan(app:FastAPI):
    print("server is running at port 8000")
    await init_db()
    print("database started successfully")
    yield
    print("the system has close automatically")
    # await close_db()
    
print(path.base_dir)

app = FastAPI(lifespan=lifespan)
app.include_router(api_router)
app.include_router(router)
app.mount("/uploads", StaticFiles(directory=os.path.join(path.base_dir, "uploads")), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)