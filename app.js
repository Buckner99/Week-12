document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    const taskForm = document.getElementById('taskForm');
    const saveBtn = document.getElementById('saveBtn');
    const taskIdInput = document.getElementById('taskId');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const taskStatusInput = document.getElementById('taskStatus');

    let tasks = []; // Assume this is your array of tasks

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task.description} - ${task.status}
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to edit a task
    window.editTask = function (id) {
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            taskIdInput.value = taskToEdit.id;
            taskDescriptionInput.value = taskToEdit.description;
            taskStatusInput.value = taskToEdit.status;
            saveBtn.innerText = 'Update';
        }
    };

    // Event listener for form submission
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const id = taskIdInput.value;
        const description = taskDescriptionInput.value;
        const status = taskStatusInput.value;

        // Check if it's an update or a new task
        if (id) {
            // Update existing task
            const existingTaskIndex = tasks.findIndex(task => task.id === parseInt(id));
            if (existingTaskIndex !== -1) {
                tasks[existingTaskIndex] = { id: parseInt(id), description, status };
            }
        } else {
            // Add new task
            const newId = tasks.length + 1;
            tasks.push({ id: newId, description, status });
        }

        // Clear the form
        taskIdInput.value = '';
        taskDescriptionInput.value = '';
        taskStatusInput.value = 'todo';
        saveBtn.innerText = 'Save';

        // Render the updated task list
        renderTasks();
    });

    // Function to delete a task
    window.deleteTask = function (id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };

    // Initial render
    renderTasks();
});
document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');

    // Function to fetch tasks from the mock API
    function fetchTasks() {
        const apiUrl = 'https://your-mockapi-url/tasks'; // Replace with your actual MockAPI URL

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                renderTasks(data); // Assuming the API response is an array of tasks
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    // Function to render tasks
    function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.description} - ${task.status}`;
            taskList.appendChild(li);
        });
    }



})
