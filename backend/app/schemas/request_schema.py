from pydantic import BaseModel, EmailStr
from typing import Any, Dict


class GenerateRequest(BaseModel):
    project_title: str
    project_description: str


class ChatRequest(BaseModel):
    message: str
    current_architecture: Dict[str, Any] | None = None


class AuthRequest(BaseModel):
    email: EmailStr
    password: str