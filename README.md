# Backend
# To-do list API
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
    
# Frontend
To-Do List Frontend (Vanilla JavaScript)
This is a simple To-Do List web application built with HTML, CSS, and Vanilla JavaScript. It connects to a backend To-Do List API to manage tasks through CRUD operations.

Features
1.Display a list of to-do items retrieved from the API.
2.Add new to-do items.
3.Mark to-do items as completed or delete them.
4.Responsive UI design for different screen sizes.

#### 1. Clone the Repository (As Both Frontend and Backend file are in same repo so not need to clone again)
        ```sh
        git clone https://github.com/Ravindra-Kemble/Todolist.git
        cd Todolist
    ```
#### 2. Modify API Endpoint 
Ensure that the frontend points to the correct backend API. In app.js, update the API_URL constant to match the URL where your API is running (e.g., http://127.0.0.1:8000 for local development).
    ```sh
        const API_URL = 'http://127.0.0.1:8000/todos';
    ```

#### 3. Open the Application in a Browser
Since this is a simple HTML, CSS, and JavaScript project, you can open the index.html file directly in your browser.

#### 4. Interacting with the API
Once the application is running, it will automatically fetch and display the list of to-do items from the API. You can add new to-do items, mark them as completed, or delete them.
