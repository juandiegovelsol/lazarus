// script.js

// Define the task list
let tasks = [
  { id: 1, name: "Finish report", category: "Work", priority: false },
  { id: 2, name: "Buy groceries", category: "Personal", priority: false },
];

// Get the task list elements
const workTasksList = document.getElementById("work-tasks");
const personalTasksList = document.getElementById("personal-tasks");

// Function to render tasks
function renderTasks() {
  // Clear the task lists
  workTasksList.innerHTML = "";
  personalTasksList.innerHTML = "";

  // Loop through tasks and render them
  tasks.forEach((task) => {
    // Create a list item element
    const taskElement = document.createElement("li");
    taskElement.classList.add("task");

    // Create a text element for the task name
    const taskNameElement = document.createElement("span");
    taskNameElement.textContent = task.name;
    if (task.priority) {
      taskNameElement.classList.add("high-priority");
    }

    // Create a button element for editing the task
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit";
    editButton.onclick = () => editTask(task.id);

    // Create a button element for deleting the task
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(task.id);

    // Append elements to the list item
    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    // Append the list item to the correct task list
    if (task.category === "Work") {
      workTasksList.appendChild(taskElement);
    } else if (task.category === "Personal") {
      personalTasksList.appendChild(taskElement);
    }
  });
}

// Function to add a new task
function addTask() {
  // Get the task name, category, and priority from the user
  const taskName = prompt("Enter task name:");
  const category = prompt("Enter category (Work/Personal):");
  const priority = confirm("Is this a high-priority task?");

  // Create a new task object
  const newTask = {
    id: tasks.length + 1,
    name: taskName,
    category,
    priority,
  };

  // Add the new task to the task list
  tasks.push(newTask);

  // Render the updated task list
  renderTasks();
}

// Function to edit a task
function editTask(id) {
  // Find the task to edit
  const task = tasks.find((task) => task.id === id);

  // Get the new task name, category, and priority from the user
  const newTaskName = prompt("Enter new task name:", task.name);
  const newCategory = prompt(
    "Enter new category (Work/Personal):",
    task.category
  );
  const newPriority = confirm("Is this a high-priority task?");

  // Update the task object
  task.name = newTaskName;
  task.category = newCategory;
  task.priority = newPriority;

  // Render the updated task list
  renderTasks();
}

// Function to delete a task
function deleteTask(id) {
  // Confirm deletion with the user
  if (confirm("Are you sure you want to delete this task?")) {
    // Remove the task from the task list
    tasks = tasks.filter((task) => task.id !== id);

    // Render the updated task list
    renderTasks();
  }
}

// Add event listener to the add task button
document.getElementById("add-task").addEventListener("click", addTask);

// Render the initial task list
renderTasks();

// Add event listeners to collapsible buttons
const collapsibleButtons = document.getElementsByClassName("collapsible");
for (let i = 0; i < collapsibleButtons.length; i++) {
  collapsibleButtons[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
