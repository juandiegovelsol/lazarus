import { CommandFactory } from './CommandFactory';



describe('CommandFactory', () => {
  it('should create a CreateTaskCommand', () => {
    const command = 'Create a task called "Task 1" with a due date of October 5, 2024';
    const commandFactory = new CommandFactory();
    const createTaskCommand = commandFactory.createCommand(command);
    expect(createTaskCommand).toBeInstanceOf(CreateTaskCommand);
  });

  it('should create an UpdateTaskStatusCommand', () => {
    const command = 'Mark the "Task 1" task as completed';
    const commandFactory = new CommandFactory();
    const updateTaskStatusCommand = commandFactory.createCommand(command);
    expect(updateTaskStatusCommand).toBeInstanceOf(UpdateTaskStatusCommand);
  });

  it('should create a GetTaskStatusCommand', () => {
    const command = 'What is the status of the "Task 1" task?';
    const commandFactory = new CommandFactory();
    const getTaskStatusCommand = commandFactory.createCommand(command);
    expect(getTaskStatusCommand).toBeInstanceOf(GetTaskStatusCommand);
  });

  it('should throw a CommandError for an invalid command', () => {
    const command = 'Invalid command';
    const commandFactory = new CommandFactory();
    expect(() => commandFactory.createCommand(command)).toThrow(CommandError);
  });
});