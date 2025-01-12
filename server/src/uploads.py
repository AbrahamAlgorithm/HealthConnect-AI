from typing import BinaryIO
from .config import settings
from PIL import Image
from PIL.Image import Image as ImageType
import pathlib, os
from .schema import ImagePaths


upload_path = pathlib.Path(settings.UPLOAD_DIR)

async def save_image(image: ImageType, type_folder: str, resource_id: str, name: str):
    _format = image.format
    ext = _format.lower() if _format else "jpg"
    image_name = name.split(".")[0]
    name = f"{image_name}.{ext}"
    upload_dir = upload_path.joinpath(type_folder, resource_id)
    os.makedirs(upload_dir, exist_ok=True)
    path = upload_dir.joinpath(name)
    image.save(path)
    return str(path)

async def save_symptoms_images(
    user_id: str,
    image: BinaryIO,
    file_name:str
):
    img = Image.open(image)
    path_1 = await save_image(img, settings.IMG_UPLOAD_DIR, user_id, file_name)
    return path_1