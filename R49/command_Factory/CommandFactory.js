// Define the CommandType enum
var CommandType;
(function (CommandType) {
    CommandType[CommandType["CreateTask"] = 0] = "CreateTask";
    CommandType[CommandType["UpdateTaskStatus"] = 1] = "UpdateTaskStatus";
    CommandType[CommandType["GetTaskStatus"] = 2] = "GetTaskStatus";
})(CommandType || (CommandType = {}));
// Define the CreateTaskCommand class
var CreateTaskCommand = /** @class */ (function () {
    function CreateTaskCommand(taskName, dueDate) {
        this.taskName = taskName;
        this.dueDate = dueDate;
    }
    CreateTaskCommand.prototype.execute = function () {
        // Add the task to the project management system
        addTask(this.taskName, this.dueDate);
    };
    return CreateTaskCommand;
}());
// Define the UpdateTaskStatusCommand class
var UpdateTaskStatusCommand = /** @class */ (function () {
    function UpdateTaskStatusCommand(taskName, status) {
        this.taskName = taskName;
        this.status = status;
    }
    UpdateTaskStatusCommand.prototype.execute = function () {
        // Update the task status in the project management system
        updateTaskStatus(this.taskName, this.status);
    };
    return UpdateTaskStatusCommand;
}());
// Define the GetTaskStatusCommand class
var GetTaskStatusCommand = /** @class */ (function () {
    function GetTaskStatusCommand(taskName) {
        this.taskName = taskName;
    }
    GetTaskStatusCommand.prototype.execute = function () {
        // Get the task status from the project management system
        getTaskStatus(this.taskName);
    };
    return GetTaskStatusCommand;
}());
// Define the CommandFactory class
var CommandFactory = /** @class */ (function () {
    function CommandFactory() {
    }
    CommandFactory.prototype.createCommand = function (command) {
        // Use a state machine to parse the command
        var words = command.split(' ');
        var commandType = null;
        var taskName = null;
        var dueDate = null;
        var status = null;
        for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
            var word = words_1[_i];
            if (word === 'Create') {
                commandType = CommandType.CreateTask;
            }
            else if (word === 'Mark') {
                commandType = CommandType.UpdateTaskStatus;
            }
            else if (word === 'What') {
                commandType = CommandType.GetTaskStatus;
            }
            else if (word.startsWith("'") && word.endsWith("'")) {
                taskName = word.slice(1, -1);
            }
            else if (word === 'with' && words[words.indexOf(word) + 1] === 'a' && words[words.indexOf(word) + 2] === 'due' && words[words.indexOf(word) + 3] === 'date' && words[words.indexOf(word) + 4] === 'of') {
                dueDate = new Date(words[words.indexOf(word) + 5]);
            }
            else if (word === 'as') {
                status = words[words.indexOf(word) + 1].toLowerCase();
            }
        }
        if (commandType === null || taskName === null) {
            return null;
        }
        switch (commandType) {
            case CommandType.CreateTask:
                return new CreateTaskCommand(taskName, dueDate);
            case CommandType.UpdateTaskStatus:
                return new UpdateTaskStatusCommand(taskName, status);
            case CommandType.GetTaskStatus:
                return new GetTaskStatusCommand(taskName);
            default:
                return null;
        }
    };
    return CommandFactory;
}());
// Define the addTask function
function addTask(taskName, dueDate) {
    // Add the task to the project management system
    tasks.push({
        name: taskName,
        status: 'pending',
        dueDate: dueDate,
    });
    // Respond with a confirmation message
    console.log("Task '".concat(taskName, "' created with a due date of ").concat(dueDate.toLocaleDateString(), "."));
}
// Define the updateTaskStatus function
function updateTaskStatus(taskName, status) {
    // Find the task to update
    var taskToUpdate = tasks.find(function (task) { return task.name === taskName; });
    // Check if the task exists
    if (taskToUpdate) {
        // Update the task status
        taskToUpdate.status = status;
        // Respond with a confirmation message
        console.log("Task '".concat(taskName, "' marked as ").concat(status, "."));
    }
    else {
        // Respond with an error message if the task does not exist
        console.log("Task '".concat(taskName, "' not found."));
    }
}
// Define the getTaskStatus function
function getTaskStatus(taskName) {
    // Find the task to retrieve the status for
    var task = tasks.find(function (task) { return task.name === taskName; });
    // Check if the task exists
    if (task) {
        // Respond with the task status
        console.log("The status of task '".concat(taskName, "' is ").concat(task.status, "."));
    }
    else {
        // Respond with an error message if the task does not exist
        console.log("Task '".concat(taskName, "' not found."));
    }
}
// Initialize an array to simulate a project management system
var tasks = [];
// Test the conversational assistant
var commandFactory = new CommandFactory();
var createTaskCommand = commandFactory.createCommand("Create a task called 'Design Homepage' with a due date of October 5, 2024");
var updateTaskStatusCommand = commandFactory.createCommand("Mark the 'Design Homepage' task as completed");
var getTaskStatusCommand = commandFactory.createCommand("What is the status of the 'Design Homepage' task?");
if (createTaskCommand) {
    createTaskCommand.execute();
}
if (updateTaskStatusCommand) {
    updateTaskStatusCommand.execute();
}
if (getTaskStatusCommand) {
    getTaskStatusCommand.execute();
}
