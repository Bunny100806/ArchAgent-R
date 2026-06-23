from sqlalchemy import Column, Integer, Text, DateTime
from sqlalchemy.sql import func

from app.database.db import Base


class UserAccount(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(Text, unique=True, index=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ArchitectureProject(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    project_title = Column(Text, nullable=False)
    project_description = Column(Text, nullable=False)

    requirements_output = Column(Text)
    architecture_output = Column(Text)
    decomposition_output = Column(Text)
    validation_output = Column(Text)

    architecture_json = Column(Text)
    evaluation_scores = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())