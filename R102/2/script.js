let tasks = [];
let log = [];

const addTaskButton = document.getElementById("add-task-button");
const planningTasks = document.getElementById("planning-tasks");
const developmentTasks = document.getElementById("development-tasks");
const testingTasks = document.getElementById("testing-tasks");
const completedTasks = document.getElementById("completed-tasks");
const logList = document.getElementById("log-list");

addTaskButton.addEventListener("click", addTask);

function addTask() {
  if (tasks.length >= 5) {
    alert("Maximum number of incomplete tasks reached");
    return;
  }

  const taskName = prompt("Enter task name");
  const taskDescription = prompt("Enter task description");

  if (taskName && taskDescription) {
    const task = {
      name: taskName,
      description: taskDescription,
      stage: "planning",
    };

    tasks.push(task);

    updateTasks();
    updateLog(`Task "${taskName}" created`);
  }
}

function updateTasks() {
  planningTasks.innerHTML = "";
  developmentTasks.innerHTML = "";
  testingTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        moveTaskForward(index);
      }
    });

    const backButton = document.createElement("input");
    backButton.type = "checkbox";
    backButton.style.display = "none";
    backButton.addEventListener("change", () => {
      if (backButton.checked) {
        moveTaskBackward(index);
      }
    });

    const taskName = document.createElement("span");
    taskName.textContent = task.name;

    taskElement.appendChild(checkbox);
    taskElement.appendChild(
      document
        .createElement("span")
        .appendChild(document.createTextNode(" Move forward"))
    );
    taskElement.appendChild(backButton);
    taskElement.appendChild(
      document
        .createElement("span")
        .appendChild(document.createTextNode(" Move backward"))
    );
    taskElement.appendChild(taskName);

    switch (task.stage) {
      case "planning":
        planningTasks.appendChild(taskElement);
        break;
      case "development":
        developmentTasks.appendChild(taskElement);
        break;
      case "testing":
        testingTasks.appendChild(taskElement);
        backButton.style.display = "inline-block";
        break;
      case "completed":
        completedTasks.appendChild(taskElement);
        break;
    }
  });
}

function moveTaskForward(index) {
  const task = tasks[index];

  switch (task.stage) {
    case "planning":
      if (tasks.filter((t) => t.stage === "development").length >= 2) {
        alert("Maximum number of tasks in development stage reached");
        return;
      }
      task.stage = "development";
      break;
    case "development":
      if (tasks.filter((t) => t.stage === "testing").length >= 1) {
        alert("Maximum number of tasks in testing stage reached");
        return;
      }
      task.stage = "testing";
      break;
    case "testing":
      task.stage = "completed";
      break;
  }

  updateTasks();
  updateLog(`Task "${task.name}" moved to ${task.stage} stage`);
}

function moveTaskBackward(index) {
  const task = tasks[index];

  switch (task.stage) {
    case "testing":
      task.stage = "development";
      break;
  }

  updateTasks();
  updateLog(`Task "${task.name}" moved to ${task.stage} stage`);
}

function updateLog(message) {
  log.push(message);
  logList.innerHTML = "";

  log.slice(-5).forEach((logMessage) => {
    const logElement = document.createElement("li");
    logElement.textContent = logMessage;
    logList.appendChild(logElement);
  });
}
