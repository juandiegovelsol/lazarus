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

const taskManager = new TaskManager();

// Display tasks in each panel
function displayTasks() {
    const planningTasks = taskManager.getTasksByStatus("Planning");
    const developmentTasks = taskManager.getTasksByStatus("Development");
    const testingTasks = taskManager.getTasksByStatus("Testing");

    const planningList = document.getElementById("planning-tasks");
    const developmentList = document.getElementById("development-tasks");
    const testingList = document.getElementById("testing-tasks");

    planningList.innerHTML = "";
    developmentList.innerHTML = "";
    testingList.innerHTML = "";

    planningTasks.forEach((task) => {
        const taskElement = document.createElement("li");
        taskElement.textContent = task.title;
        taskElement.draggable = true;
        taskElement.dataset.id = task.id;
        planningList.appendChild(taskElement);
    });

    developmentTasks.forEach((task) => {
        const taskElement = document.createElement("li");
        taskElement.textContent = task.title;
        taskElement.draggable = true;
        taskElement.dataset.id = task.id;
        developmentList.appendChild(taskElement);
    });

    testingTasks.forEach((task) => {
        const taskElement = document.createElement("li");
        taskElement.textContent = task.title;
        taskElement.draggable = true;
        taskElement.dataset.id = task.id;
        testingList.appendChild(taskElement);
    });
}

// Add event listeners for drag and drop
document.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "LI") {
        e.dataTransfer.setData("text", e.target.dataset.id);
    }
});

document.addEventListener("dragover", (e) => {
    e.preventDefault();
});

document.addEventListener("drop", (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text");
    const panelId = e.target.parentNode.id;
    let newStatus;

    switch (panelId) {
        case "planning-panel":
            newStatus = "Planning";
            break;
        case "development-panel":
            newStatus = "Development";
            break;
        case "testing-panel":
            newStatus = "Testing";
            break;
        default:
            return;
    }

    taskManager.moveTask(parseInt(taskId), newStatus);
    displayTasks();
});

// Add event listener for adding tasks
document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    taskManager.addTask(title, description, startDate, endDate);
    displayTasks();
});

// Periodically check for reminders
setInterval(() => {
    const currentDate = new Date();
    taskManager.tasks.forEach((task) => {
        const taskEndDate = new Date(task.endDate);
        if (taskEndDate < currentDate) {
            console.log(`Reminder: The task "${task.title}" is overdue!`);
            // Display notification to the user
            // ...
        }
    });
}, 10000);

displayTasks();