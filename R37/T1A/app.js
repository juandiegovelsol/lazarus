// task.js
class Task {
    constructor(id, title, description, startDate, endDate, status) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
      this.status = status;
    }
  }
  
  class TaskManager {
    constructor() {
      this.tasks = [];
      this.idCounter = 1; // Task ID starts at 1
    }
  
    addTask(title, description, startDate, endDate) {
      if (!title || !description || !startDate || !endDate) {
        throw new Error("All fields are required");
      }
  
      const newTask = new Task(
        this.idCounter,
        title,
        description,
        startDate,
        endDate,
        "Planning"
      );
      this.tasks.push(newTask);
      this.idCounter++;
    }
  
    editTask(id, newTitle, newDescription, newStartDate, newEndDate) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.title = newTitle;
        task.description = newDescription;
        task.startDate = newStartDate;
        task.endDate = newEndDate;
      }
    }
  
    moveTask(id, newStatus) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.status = newStatus;
      }
    }
  
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }
  
    getTasksByStatus(status) {
      return this.tasks.filter((task) => task.status === status);
    }
  }
  
  // app.js
  const taskManager = new TaskManager();
  
  // Initialize task panels
  const planningPanel = document.getElementById("planning-panel");
  const developmentPanel = document.getElementById("development-panel");
  const testingPanel = document.getElementById("testing-panel");
  
  // Function to render tasks in panels
  function renderTasks() {
    planningPanel.innerHTML = "";
    developmentPanel.innerHTML = "";
    testingPanel.innerHTML = "";
  
    taskManager.tasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.textContent = task.title;
      taskElement.draggable = true;
      taskElement.dataset.taskId = task.id;
  
      switch (task.status) {
        case "Planning":
          planningPanel.appendChild(taskElement);
          break;
        case "Development":
          developmentPanel.appendChild(taskElement);
          break;
        case "Testing":
          testingPanel.appendChild(taskElement);
          break;
      }
    });
  }
  
  // Add event listeners for drag and drop
  document.addEventListener("dragstart", (event) => {
    if (event.target.dataset.taskId) {
      event.dataTransfer.setData("taskId", event.target.dataset.taskId);
    }
  });
  
  document.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  
  document.addEventListener("drop", (event) => {
    const taskId = event.dataTransfer.getData("taskId");
    const newStatus = event.target.id.replace("-panel", "");
  
    taskManager.moveTask(parseInt(taskId), newStatus);
    renderTasks();
  });
  
  // Add event listener for adding tasks
  document.getElementById("add-task-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
  
    taskManager.addTask(title, description, startDate, endDate);
    renderTasks();
  });
  
  // Add event listener for editing tasks
  document.getElementById("edit-task-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const id = parseInt(document.getElementById("task-id").value);
    const newTitle = document.getElementById("new-title").value;
    const newDescription = document.getElementById("new-description").value;
    const newStartDate = document.getElementById("new-start-date").value;
    const newEndDate = document.getElementById("new-end-date").value;
  
    taskManager.editTask(id, newTitle, newDescription, newStartDate, newEndDate);
    renderTasks();
  });
  
  // Add event listener for deleting tasks
  document.getElementById("delete-task-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const id = parseInt(document.getElementById("task-id-delete").value);
  
    taskManager.deleteTask(id);
    renderTasks();
  });
  
  // Periodically check for reminders
  setInterval(() => {
    const currentDate = new Date();
    taskManager.tasks.forEach((task) => {
      const taskEndDate = new Date(task.endDate);
      if (taskEndDate < currentDate) {
        alert(`Reminder: The task "${task.title}" is overdue!`);
      }
    });
  }, 10000);
  
  // Initialize tasks
  taskManager.addTask("Task 1", "Description for Task 1", "2024-10-05", "2024-10-10");
  taskManager.addTask("Task 2", "Description for Task 2", "2024-10-01", "2024-10-15");
  taskManager.addTask("Task 3", "Description for Task 3", "2024-10-01", "2024-10-15");
  
  renderTasks();