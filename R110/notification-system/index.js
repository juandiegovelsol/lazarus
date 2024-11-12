// index.js
const NotificationSystem = require("./tasks");

// Create a new notification system
const system = new NotificationSystem();

// Add some tasks
system.addTask({
  name: "Task 1",
  dueTime: new Date(Date.now() + 60 * 1000).toISOString(), // due in 30 minutes
  priority: "high",
});

system.addTask({
  name: "Task 2",
  dueTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // due in 2 hours
  priority: "low",
});

// Start the notification system
system.start();
