class Task {
  constructor(name, priority, dependencies = []) {
    this.name = name;
    this.priority = priority;
    this.dependencies = dependencies; // List of tasks this task depends on
    this.executed = false; // Flag to mark if the task has been executed
  }
}

class TaskScheduler {
  constructor() {
    this.tasks = [];
    this.taskMap = new Map(); // Map to quickly look up tasks by name
  }

  addTask(name, priority, dependencies = []) {
    const task = new Task(name, priority, dependencies);
    this.tasks.push(task);
    this.taskMap.set(name, task); // Store tasks in a map for quick access
  }

  // Topological sorting function added to replace the original recursive executeTask function
  topologicalSort() {
    const visited = new Set(); // Tracks tasks that have been visited to prevent reprocessing
    const stack = new Set(); // Added to detect circular dependencies during DFS traversal
    const ordering = []; // Stores tasks in the correct execution order

    const dfs = (taskName) => {
      const task = this.taskMap.get(taskName);

      // Circular dependency detection: If the task is already in the stack, a cycle is found
      if (stack.has(taskName)) {
        throw new Error("Circular dependency detected");
      }

      // If the task has been visited there is no need to process it again
      if (visited.has(taskName)) {
        return;
      }

      visited.add(taskName); // Mark the task as visited
      stack.add(taskName); // Add task to stack to detect cycles during recursion

      // Recursively process each dependency before the current task
      for (const dep of task.dependencies) {
        dfs(dep); // Recursive DFS to ensure dependencies are executed first
      }

      stack.delete(taskName); // Remove the task from the stack after processing its dependencies
      ordering.push(task); // Push the task to the ordering once dependencies are resolved
    };

    // Start DFS for each task to ensure all tasks are processed
    for (const task of this.tasks) {
      if (!visited.has(task.name)) {
        dfs(task.name); // Start DFS if the task hasn't been visited
      }
    }

    return ordering.reverse(); // Return tasks in the correct order for execution
  }

  // Executes tasks in the correct order based on the topological sort
  runAll() {
    const sortedTasks = this.topologicalSort(); // Get the sorted tasks based on dependencies

    // Execute each task in the order determined by topological sorting
    sortedTasks.forEach((task) => {
      if (!task.executed) {
        console.log(`Executing task: ${task.name}`);
        task.executed = true; // Mark task as executed to prevent re-execution
      }
    });
  }
}

// Initialize the task scheduler
const scheduler = new TaskScheduler();

scheduler.addTask("Task A", 5, ["Task B"]); // Task A depends on Task B
scheduler.addTask("Task B", 2, ["Task C"]); // Task B depends on Task C
scheduler.addTask("Task C", 1); // Task C has no dependencies
scheduler.addTask("Task D", 4); // Task C has no dependencies

// Run the scheduler
scheduler.runAll();
