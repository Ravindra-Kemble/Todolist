const todoListElement = document.getElementById("todo-list")
const todoform = document.getElementById("todo-form")
import API_URL from "./config.js";

const apiUrl = API_URL

// fetch todos from API and Display 
const fetchTodos = async () => {
    try {
        const response = await fetch(apiUrl);
        const todos = await response.json()
        displayTodos(todos);
        console.log(todos);

    } catch (error) {
        console.error('Error fetching todos:', error);
    }   
};


// Display todos in the Dom

const displayTodos = (todos) => {
    todoListElement.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement("li")
        todoItem.classList.add('todo-item');
        if (todo.completed) {
            todoItem.classList.add('completed')
        }
        
        todoItem.innerHTML = `
            <strong>${todo.title}</strong>: ${todo.description || 'No description'}
            <div class="todo-actions">
                <button class="delete" data-id="${todo.id}">Delete</button>
                <button class="toggle-complete" data-id="${todo.id}" data-title="${todo.title}" data-description="${todo.description}" data-completed="${todo.completed}">
                    ${todo.completed ? 'Undo' : 'Complete'}
                </button>
            </div>
        `;
        todoListElement.appendChild(todoItem);
    });

    setupEventListeners(); // Set up listeners after todos are rendered
};

// Set up event listeners for delete and toggle buttons
const setupEventListeners = () => {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            var result = confirm("Are you sure you want to delete a task?");
            if (result == false){
                event.preventDefault()
            };
            const id = button.getAttribute('data-id');
            deleteTodo(id);
            location.reload();
        });
    });

    const toggleButtons = document.querySelectorAll('.toggle-complete');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const currentTask = {
                title: button.getAttribute('data-title'),
                description: button.getAttribute('data-description'),
                completed: button.getAttribute('data-completed') === 'true',
            };
            toggleComplete(id, currentTask);
            location.reload();
        });
    });
};

// Add a new Todo

const addTodo = async (title, description) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                title,
                description,
                completed: false
            }),
        });

        const newTodo = await response.json();
        fetchTodos();
    } catch (error) {
        console.error('Error occur while adding task', error)
    }

};

// Delete a Todo

const deleteTodo = async (id) => {
    try {
        await fetch(`${apiUrl}${id}`, {
            method: "DELETE", 
        });
        fetchTodos();
    } catch (error) {
        console.error('Error occur While deleting task', error);
    }
};

const toggleComplete = async (id, currentTask) => {
    try {
        const updatedTask = {
            title: currentTask.title,         
            description: currentTask.description, 
            completed: !currentTask.completed  
        };

        const response = await fetch(`${apiUrl}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
            
        });
        console.log(updatedTask)

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Update failed');
        }

        console.log('Todo updated successfully');
    } catch (error) {
        console.error('Error toggling todo completion:', error);
    }
};


// Form submission handler
todoform.addEventListener('submit', (e) =>{
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    if (title && description) {
        addTodo(title, description);
        todoform.reset();
    }
});

// Initial fetch 
fetchTodos();

