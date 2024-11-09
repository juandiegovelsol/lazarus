// tasks.js
class NotificationSystem {
  constructor() {
    this.tasks = [];
    this.notifiedTasks = {};
  }

  // Add task to the system
  addTask(task) {
    this.tasks.push(task);
  }

  // Check if browser has notification permissions and request if not granted
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

  // Filter tasks due within the next hour and send notifications
  async sendNotifications() {
    const now = new Date();
    const tasksDueSoon = this.tasks.filter((task) => {
      const dueTime = new Date(task.dueTime);
      const timeDiff = dueTime.getTime() - now.getTime();
      return timeDiff > 0 && timeDiff <= 60 * 60 * 1000; // 1 hour
    });

    for (const task of tasksDueSoon) {
      if (!this.notifiedTasks[task.name]) {
        try {
          const notification = new Notification(task.name, {
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

  // Run periodic check every 5 minutes
  async start() {
    await this.requestNotificationPermission();
    setInterval(async () => {
      await this.sendNotifications();
    }, 1000); // 5 minutes
  }
}

module.exports = NotificationSystem;
