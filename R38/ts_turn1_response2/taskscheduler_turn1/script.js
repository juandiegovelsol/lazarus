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

  // Creates a graph from the tasks and their dependencies
  createGraph() {
    const graph = new Map();
    this.tasks.forEach((task) => {
      graph.set(task.name, task.dependencies);
    });
    return graph;
  }

  // Performs a topological sort on the graph
  topologicalSort(graph) {
    const visited = new Set();
    const sorted = [];

    function visit(node) {
      if (visited.has(node)) {
        return;
      }
      visited.add(node);

      const neighbors = graph.get(node);
      if (neighbors) {
        neighbors.forEach((neighbor) => {
          visit(neighbor);
        });
      }

      sorted.push(node);
    }

    // Visit all nodes in the graph
    graph.forEach((neighbors, node) => {
      visit(node);
    });

    // Check for circular dependencies
    if (sorted.length !== this.tasks.length) {
      throw new Error("Circular dependency detected");
    }

    return sorted;
  }

  // Executes tasks in the sorted order
  runAll() {
    const graph = this.createGraph();
    const sortedTaskNames = this.topologicalSort(graph);

    // Sort the tasks by priority within each dependency level
    const sortedTasks = sortedTaskNames.map((name) => this.taskMap.get(name));
    sortedTasks.sort((a, b) => {
      if (a.dependencies.includes(b.name)) {
        return 1;
      } else if (b.dependencies.includes(a.name)) {
        return -1;
      } else {
        return b.priority - a.priority;
      }
    });

    sortedTasks.forEach((task) => {
      if (!task.executed) {
        console.log(`Executing task: ${task.name}`);
        task.executed = true;
      }
    });
    console.log(sortedTaskNames);
  }
}

// Initialize the task scheduler
const scheduler = new TaskScheduler();

scheduler.addTask("Task A", 3, ["Task B"]);
scheduler.addTask("Task B", 2, ["Task C"]);
// scheduler.addTask('Task C', 1, ['Task A']); // Commented out to avoid circular dependency

// Add a new task 'Task D' with a higher priority than 'Task A'
scheduler.addTask("Task D", 4, ["Task A"]);

// Run the scheduler
scheduler.runAll();
