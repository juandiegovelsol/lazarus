"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandFactory_1 = require("./CommandFactory");
describe('CommandFactory', function () {
    it('should create a CreateTaskCommand', function () {
        var command = 'Create a task called "Task 1" with a due date of October 5, 2024';
        var commandFactory = new CommandFactory_1.CommandFactory();
        var createTaskCommand = commandFactory.createCommand(command);
        expect(createTaskCommand).toBeInstanceOf(CreateTaskCommand);
    });
    it('should create an UpdateTaskStatusCommand', function () {
        var command = 'Mark the "Task 1" task as completed';
        var commandFactory = new CommandFactory_1.CommandFactory();
        var updateTaskStatusCommand = commandFactory.createCommand(command);
        expect(updateTaskStatusCommand).toBeInstanceOf(UpdateTaskStatusCommand);
    });
    it('should create a GetTaskStatusCommand', function () {
        var command = 'What is the status of the "Task 1" task?';
        var commandFactory = new CommandFactory_1.CommandFactory();
        var getTaskStatusCommand = commandFactory.createCommand(command);
        expect(getTaskStatusCommand).toBeInstanceOf(GetTaskStatusCommand);
    });
    it('should throw a CommandError for an invalid command', function () {
        var command = 'Invalid command';
        var commandFactory = new CommandFactory_1.CommandFactory();
        expect(function () { return commandFactory.createCommand(command); }).toThrow(CommandError);
    });
});
