document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function addTask(e) {
    e.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const priority = document.getElementById('task-priority').value;
    const dueDate = document.getElementById('task-due-date').value;

    const task = {
        id: Date.now(),
        title,
        description,
        priority,
        dueDate,
        completed: false
    };

    addTaskToDOM(task);
    saveTaskToLocalStorage(task);

    taskForm.reset();
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
        <div>
            <h3 class="${task.completed ? 'completed' : ''}">${task.title}</h3>
            <p>${task.description}</p>
            <p>Priority: ${task.priority}</p>
            <p>Due Date: ${task.dueDate}</p>
        </div>
        <div class="task-actions">
            <button onclick="toggleCompletion(${task.id})">
                ${task.completed ? 'Mark as Active' : 'Mark as Completed'}
            </button>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleCompletion(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload(); // Reload to reflect changes
}

function editTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === id);
    
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-description').value = task.description;
    document.getElementById('task-priority').value = task.priority;
    document.getElementById('task-due-date').value = task.dueDate;

    deleteTask(id); // Remove the task to allow re-adding it after editing
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload(); // Reload to reflect changes
}