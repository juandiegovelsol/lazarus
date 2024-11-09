class NotificationSystem {
  constructor() {
    this.tasks = [];
    this.notifiedTasks = {};
  }

  addTask(task) {
    if (new Date(task.dueTime) > new Date()) {
      this.tasks.push(task);
    } else {
      console.error("Task due time must be in the future.");
    }
  }

  async requestNotificationPermission() {
    if (Notification.permission !== "granted") {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.log("Notification permission not granted");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    }
  }

  async sendNotifications() {
    const now = new Date();
    const tasksDueSoon = this.tasks.filter((task) => {
      const dueTime = new Date(task.dueTime);
      const timeDiff = dueTime.getTime() - now.getTime();
      return timeDiff > 0 && timeDiff <= 60 * 60 * 1000;
    });

    for (const task of tasksDueSoon) {
      if (!this.notifiedTasks[task.name]) {
        try {
          new Notification(task.name, {
            body: `Due: ${new Date(task.dueTime).toLocaleTimeString()}`,
          });
          this.notifiedTasks[task.name] = true;
          console.log(`Notification sent for task: ${task.name}`);
        } catch (error) {
          console.error("Error sending notification:", error);
        }
      }
    }
  }

  async start() {
    await this.requestNotificationPermission();
    setInterval(async () => {
      await this.sendNotifications();
    }, 1000);
  }
}

function startNotificationSystem() {
  const system = new NotificationSystem();

  // Add test tasks
  system.addTask({
    name: "Task 1",
    dueTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // Due in 30 minutes
    priority: "high",
  });

  system.addTask({
    name: "Task 2",
    dueTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // Due in 15 minutes
    priority: "medium",
  });

  system.start();
}
