from pydantic import BaseModel
from typing import Optional

class auth(BaseModel):
    username: str
    password: str
