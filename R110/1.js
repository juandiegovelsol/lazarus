// tasks.js
class TaskManager {
  constructor() {
    this.tasks = [];
    this.notifiedTasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  requestNotificationPermission() {
    if (Notification.permission === "granted") {
      console.log("Notification permission already granted");
    } else if (Notification.permission === "denied") {
      console.log("Notification permission denied");
    } else {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        }
      });
    }
  }

  sendNotification(task) {
    const notification = new Notification(task.name, {
      body: `Due: ${new Date(task.dueTime).toLocaleTimeString()}`,
    });
    notification.onclick = () => {
      notification.close();
    };
  }

  checkForUpcomingTasks() {
    const now = new Date();
    const upcomingTasks = this.tasks.filter((task) => {
      const dueTime = new Date(task.dueTime);
      return (
        dueTime > now && dueTime.getTime() - now.getTime() <= 60 * 60 * 1000
      );
    });

    upcomingTasks.forEach((task) => {
      if (!this.notifiedTasks.includes(task.name)) {
        this.sendNotification(task);
        this.notifiedTasks.push(task.name);
      }
    });
  }

  start() {
    this.requestNotificationPermission();
    setInterval(() => {
      this.checkForUpcomingTasks();
    }, 5 * 60 * 1000); // 5 minutes
  }
}

// Example usage
const taskManager = new TaskManager();

// Add some test tasks
taskManager.addTask({
  name: "Task 1",
  dueTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
  priority: "high",
});

taskManager.addTask({
  name: "Task 2",
  dueTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
  priority: "medium",
});

taskManager.addTask({
  name: "Task 3",
  dueTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
  priority: "low",
});

// Start the task manager
taskManager.start();
