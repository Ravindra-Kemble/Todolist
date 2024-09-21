from fastapi import FastAPI, Depends, status, HTTPException
from typing import List
from . import  models, schema
from app.database import get_db ,engine, Base
from sqlalchemy.orm import Session
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()


origins = [
    "http://127.0.0.1:5500",  # Your frontend origin
    "http://localhost:5500",
    "https://todolist-1-43my.onrender.com"  # You may also add this for localhost compatibility

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,  # Whether or not to allow cookies
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/", status_code= status.HTTP_202_ACCEPTED)
def Welcome():
    return {"Message": "Welcome"}


@app.get("/todos/", response_model=List[schema.Task], status_code= status.HTTP_202_ACCEPTED)
def getTask(db: Session = Depends(get_db)):
    tasks = db.query(models.Task).all()
    return tasks

@app.post("/todos/", response_model= schema.Task, status_code= status.HTTP_201_CREATED)
def createTask(task: schema.TaskCreate, db: Session = Depends(get_db)):
    task = models.Task(title = task.title, description = task.description, completed = task.completed)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@app.put("/todos/{id}", response_model= schema.Task, status_code=status.HTTP_202_ACCEPTED)
def updateTask(id: int, task: schema.TaskCreate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == id).first()
    if db_task:
        db_task.title = task.title
        db_task.description = task.description
        db_task.completed = task.completed
        db.commit()
        db.refresh(db_task)
        return db_task
    
    else:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail="Task not found")
    
    
@app.delete("/todos/{id}")
def deleteTask(id: int, db:Session= Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == id).first()
    if task:
        db.delete(task)
        db.commit()
        return {"message": "Task Deleted Successful"}
    else:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail="Task not found")
    
