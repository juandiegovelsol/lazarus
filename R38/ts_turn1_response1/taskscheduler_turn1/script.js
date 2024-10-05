class Task {
  constructor(name, priority, dependencies = []) {
    this.name = name;
    this.priority = priority;
    this.dependencies = dependencies; // List of task names that this task depends on
    this.executed = false;
  }
}

class TaskScheduler {
  constructor() {
    this.tasks = [];
    this.taskMap = new Map(); // A map for quick lookups of tasks by name
  }

  addTask(name, priority, dependencies = []) {
    const task = new Task(name, priority, dependencies);
    this.tasks.push(task);
    this.taskMap.set(name, task);
  }

  // Topological sorting function to order tasks based on dependencies
  topologicalSort() {
    const visited = new Set();
    const ordering = [];

    // Recursive helper function to perform DFS
    function dfs(taskName) {
      const task = this.taskMap.get(taskName);
      if (visited.has(taskName)) {
        return;
      }

      visited.add(taskName);

      task.dependencies.forEach((dep) => {
        if (!visited.has(dep)) {
          dfs.call(this, dep); // Recursion here
        }
      });

      ordering.push(task);
    }

    // Perform DFS on all tasks
    this.tasks.forEach((task) => {
      if (!visited.has(task.name)) {
        dfs.call(this, task.name);
      }
    });

    // Sort the ordering array based on task priorities
    ordering.sort((a, b) => b.priority - a.priority);

    return ordering;
  }

  // Executes tasks in the correct order, taking dependencies and priorities into account
  runAll() {
    const sortedTasks = this.topologicalSort();

    // Check for circular dependencies
    if (sortedTasks.length !== this.tasks.length) {
      throw new Error("Circular dependency detected");
    }

    sortedTasks.forEach((task) => {
      if (!task.executed) {
        console.log(`Executing task: ${task.name}`);
        task.executed = true;
      }
    });
  }
}

// Initialize the task scheduler
const scheduler = new TaskScheduler();

scheduler.addTask("Task A", 3, ["Task E"]);
scheduler.addTask("Task B", 2, ["Task C"]);

// scheduler.addTask('Task C', 1, ['Task A']); // This line creates a circular dependency
scheduler.addTask("Task D", 5);
scheduler.addTask("Task E", 2, ["Task B"]);
scheduler.addTask("Task C", 1); // Remove the circular dependency

// Run the scheduler
scheduler.runAll();
