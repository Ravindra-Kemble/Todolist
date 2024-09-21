# To-do list API
# django-rest-api
This is a simple RESTful API for managing a to-do list, built using FastAPI and SQLite. It supports basic CRUD operations for to-do items.

## Installation
* If you wish to run your own build, first ensure you have python globally installed in your computer. If not, you can get python [here](https://www.python.org").
* After doing this, confirm that you have installed virtualenv globally as well. If not, run this:
    ```sh
        pip install virtualenv
    ```
* Then, Git clone this repo to your PC
    ```sh
        git clone https://github.com/Ravindra-Kemble/Todolist.git
        cd Todolist
    ```

* #### Dependencies
    1. Create and fire up your virtual environment:
        ```sh
             virtualenv  venv -p python3
             venv/scripts/activate
        ```
    3. Install the dependencies needed to run the app:
        ```sh
             pip install -r requirements.txt
        ```
    4. Make those migrations work
        ```sh
            python -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"
        ```

* #### Run It
    Fire up the server using this one simple command:
    ```sh
        uvicorn app.main:app --reload
    ```
    You can now access the file api service on your browser by using
    ```
        http://localhost:8000
    ```
    
    #### API Endpoints

1. **Get All To-Do Items**:
   - GET /todos
   - Returns a list of all to-do items.

2. **Add a New To-Do Item**:
   - POST /todos
     - Request: {
    "title": "New To-Do",
    "description": "Description of the task",
    "completed": false
}

3. **Update a To-Do Item**:
   - PUT /todos/{id}
     - Request: {
    "title": "Updated Title",
    "description": "Updated Description",
    "completed": true
}

3. **Delete a To-Do Item**:
   - DELETE /todos/{id}
     - Request: DELETE /todos/{id}

