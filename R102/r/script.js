// Initialize tasks and log arrays
let tasks = [];
let log = [];

// Function to add a new task
function addTask() {
  // Prompt user for task details
  let taskName = prompt("Enter task name:");
  let taskDescription = prompt("Enter task description:");
  if (taskName && taskDescription) {
    // Ensure that incomplete tasks are no more than 5
    if (tasks.filter((task) => task.stage !== "Completed").length < 5) {
      // Ensure Planning stage has less than 3 tasks
      if (document.querySelectorAll("#planning-stage .task").length < 3) {
        // Create new task object and add to tasks array
        let task = {
          name: taskName,
          description: taskDescription,
          stage: "Planning",
        };
        tasks.push(task);
        updateStages();
        log.push(`${taskName} created`);
        updateLog();
      } else {
        alert("Cannot add more than 3 tasks to the Planning stage.");
      }
    } else {
      alert("Cannot add more than 5 incomplete tasks.");
    }
  }
}

// Function to update the stages with current tasks
function updateStages() {
  // Clear the current content of all stages
  document.querySelectorAll(".stage").forEach((stage) => {
    stage.innerHTML = `<h2>${
      stage.id.replace("-stage", "").charAt(0).toUpperCase() +
      stage.id.replace("-stage", "").slice(1)
    }</h2>`;
  });

  // Loop through tasks and add them to the appropriate stage
  tasks.forEach((task) => {
    let taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `${task.name} - ${task.description}`;

    // Add control options based on the current stage
    if (task.stage === "Testing") {
      taskElement.innerHTML += `
                <input type="checkbox" id="${task.name}-proceed">
                <label for="${task.name}-proceed">Proceed</label>
                <input type="checkbox" id="${task.name}-revert">
                <label for="${task.name}-revert">Revert</label>
            `;
      document
        .querySelector(`#${task.stage.toLowerCase()}-stage`)
        .appendChild(taskElement);

      // Event listener for proceeding to Completed stage
      document
        .querySelector(`#${task.name}-proceed`)
        .addEventListener("change", () => {
          if (document.querySelector(`#${task.name}-proceed`).checked) {
            task.stage = "Completed";
            log.push(`${task.name} moved to Completed stage`);
            updateLog();
            updateStages();
          }
        });

      // Event listener for reverting to Development stage
      document
        .querySelector(`#${task.name}-revert`)
        .addEventListener("change", () => {
          if (document.querySelector(`#${task.name}-revert`).checked) {
            task.stage = "Development";
            log.push(`${task.name} reverted to Development stage`);
            updateLog();
            updateStages();
          }
        });
    } else if (task.stage !== "Completed") {
      taskElement.innerHTML += `
                <input type="checkbox" id="${task.name}-proceed">
                <label for="${task.name}-proceed">Proceed</label>
            `;
      document
        .querySelector(`#${task.stage.toLowerCase()}-stage`)
        .appendChild(taskElement);

      // Event listener for proceeding from Planning to Development or Development to Testing
      document
        .querySelector(`#${task.name}-proceed`)
        .addEventListener("change", () => {
          if (document.querySelector(`#${task.name}-proceed`).checked) {
            if (
              task.stage === "Planning" &&
              document.querySelectorAll("#development-stage .task").length < 2
            ) {
              task.stage = "Development";
              log.push(`${task.name} moved to Development stage`);
            } else if (
              task.stage === "Development" &&
              document.querySelectorAll("#testing-stage .task").length < 1
            ) {
              task.stage = "Testing";
              log.push(`${task.name} moved to Testing stage`);
            }
            updateLog();
            updateStages();
          }
        });
    } else {
      // Append to the Completed stage
      document
        .querySelector(`#${task.stage.toLowerCase()}-stage`)
        .appendChild(taskElement);
    }
  });
}

// Function to update the log area
function updateLog() {
  // Clear current log and add the latest 5 entries
  document.querySelector("#log-stage").innerHTML = "<h2>Log</h2>";
  log.slice(-5).forEach((logEntry) => {
    let logElement = document.createElement("div");
    logElement.innerHTML = logEntry;
    document.querySelector("#log-stage").appendChild(logElement);
  });
}

// Add event listener to the add task button
document.querySelector("#add-task-button").addEventListener("click", addTask);
