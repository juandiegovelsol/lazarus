let tasks = [
  { id: 1, name: "Finish report", category: "Work", priority: false },
  { id: 2, name: "Buy groceries", category: "Personal", priority: false },
];

const taskList = document.getElementById("task-list");
const workTasksContainer = document.getElementById("work-tasks");
const personalTasksContainer = document.getElementById("personal-tasks");

document.getElementById("add-task").addEventListener("click", function () {
  const taskName = prompt("Enter task:");
  const category = prompt("Enter category (Work/Personal):");
  const priority = confirm("Is this a high-priority task?");

  if (taskName && category) {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      category,
      priority,
    };
    tasks.push(newTask);
    renderTasks();
  }
});

function renderTasks() {
  workTasksContainer.innerHTML = "";
  personalTasksContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>Priority: ${
              task.priority ? '<span class="priority">Yes</span>' : "No"
            }</p>
            <button class="delete-button">Delete</button>
            <button class="edit-button">Edit</button>
        `;

    if (task.category === "Work") {
      workTasksContainer.appendChild(taskElement);
    } else {
      personalTasksContainer.appendChild(taskElement);
    }

    // Add event listeners for delete and edit buttons
    const deleteButton = taskElement.querySelector(".delete-button");
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    const editButton = taskElement.querySelector(".edit-button");
    editButton.addEventListener("click", function () {
      editTask(task);
    });
  });
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function editTask(task) {
  const newName = prompt("Enter new task name:");
  const newCategory = prompt("Enter new category (Work/Personal):");
  const newPriority = confirm("Is this a high-priority task?");

  if (newName && newCategory) {
    task.name = newName;
    task.category = newCategory;
    task.priority = newPriority;
    renderTasks();
  }
}

// Add event listeners for collapse buttons
const collapseButtons = document.querySelectorAll(".collapse-button");
collapseButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const taskContainer = button.parentNode.querySelector(".task-container");
    if (taskContainer.classList.contains("hidden")) {
      taskContainer.classList.remove("hidden");
      button.textContent = "-";
    } else {
      taskContainer.classList.add("hidden");
      button.textContent = "+";
    }
  });
});

renderTasks();
