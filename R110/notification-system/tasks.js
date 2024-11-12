class NotificationSystem {
    constructor() {
      this.tasks = []; // Array to store task objects
      this.notifiedTasks = {}; // Object to track tasks that have already been notified
    }
  
    // Method to add a task to the system
    addTask(task) {
      if (new Date(task.dueTime) > new Date()) { // Ensure due time is in the future
        this.tasks.push(task);
      } else {
        console.error('Task due time must be in the future.');
      }
    }
  
    // Method to check and request notification permission
    async requestNotificationPermission() {
      if (Notification.permission !== 'granted') {
        try {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            console.log('Notification permission not granted');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      }
    }
  
    // Method to filter tasks due within the next hour and send notifications
    async sendNotifications() {
      const now = new Date();
      const tasksDueSoon = this.tasks.filter((task) => {
        const dueTime = new Date(task.dueTime);
        const timeDiff = dueTime.getTime() - now.getTime();
        return timeDiff > 0 && timeDiff <= 60 * 60 * 1000; // Check if due within the next hour
      });
  
      for (const task of tasksDueSoon) {
        if (!this.notifiedTasks[task.name]) {
          try {
            new Notification(task.name, {
              body: `Due: ${new Date(task.dueTime).toLocaleTimeString()}`,
            });
            this.notifiedTasks[task.name] = true; // Mark task as notified
            console.log(`Notification sent for task: ${task.name}`);
          } catch (error) {
            console.error('Error sending notification:', error);
          }
        }
      }
    }
  
    // Method to start the notification system
    async start() {
      await this.requestNotificationPermission();
      setInterval(async () => {
        await this.sendNotifications();
      }, 5 * 60 * 1000); // Check every 5 minutes
    }
  }
  
  module.exports = NotificationSystem;
  