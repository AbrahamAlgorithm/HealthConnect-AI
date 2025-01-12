from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL:str|None
    API_KEY:str
    UPLOAD_DIR: str = "uploads"
    IMG_UPLOAD_DIR: str = "symptoms_images"
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')
    
    
settings = Settings()