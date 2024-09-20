from sqlalchemy import Column, String, Integer, Boolean
from .database import Base

class Task(Base):
    __tablename__ = "TodoTasks"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False)