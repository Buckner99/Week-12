$(document).ready(function() {
  // Load tasks on page load
  loadTasks();

  // Handle form submission
  $('#taskForm').submit(function(e) {
    e.preventDefault();
    const taskTitle = $('#taskTitle').val();
    addTask(taskTitle);
  });

  // Function to load tasks from the API
  function loadTasks() {
    $.get('http://localhost:3000/api/tasks', function(tasks) {
      displayTasks(tasks);
    });
  }

  // Function to display tasks in the UI
  function displayTasks(tasks) {
    $('#taskList').empty();
    tasks.forEach(function(task) {
      const listItem = `<li class="list-group-item">
                          ${task.title}
                          <button class="btn btn-danger btn-sm float-right" onclick="deleteTask(${task.id})">Delete</button>
                        </li>`;
      $('#taskList').append(listItem);
    });
  }

  // Function to add a new task
  function addTask(title) {
    $.post('http://localhost:3000/api/tasks', { title, completed: false }, function() {
      loadTasks();
      $('#taskForm')[0].reset();
    });
  }


});
