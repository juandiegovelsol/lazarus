// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simulated database (JavaScript object)
let devices = [
  {
    id: 1,
    title: "Device 1",
    description: "This is device 1",
    price: 100,
    quantity: 10,
    imageUrl: "https://example.com/device1.jpg",
  },
  {
    id: 2,
    title: "Device 2",
    description: "This is device 2",
    price: 200,
    quantity: 20,
    imageUrl: "https://example.com/device2.jpg",
  },
];

let users = [
  {
    id: 1,
    email: "admin@example.com",
    password: "admin",
    role: "admin",
  },
];

let activeUser = null;

// Endpoint to get all devices
app.get("/api/devices", (req, res) => {
  if (activeUser) {
    res.json(devices);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Endpoint to create a new device
app.post("/api/devices", (req, res) => {
  if (activeUser && activeUser.role === "admin") {
    const newDevice = {
      id: devices.length + 1,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      imageUrl: req.body.imageUrl,
    };
    devices.push(newDevice);
    res.json(newDevice);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Endpoint to create a new user
app.post("/api/users", (req, res) => {
  const existingUser = users.find((user) => user.email === req.body.email);
  if (existingUser) {
    res.status(400).json({ message: "Email already exists" });
  } else {
    const newUser = {
      id: users.length + 1,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    users.push(newUser);
    res.json(newUser);
  }
});

// Endpoint to login a user
app.post("/api/login", (req, res) => {
  const existingUser = users.find(
    (user) =>
      user.email === req.body.email && user.password === req.body.password
  );
  if (existingUser) {
    activeUser = existingUser;
    res.json(existingUser);
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// Endpoint to logout a user
app.post("/api/logout", (req, res) => {
  activeUser = null;
  res.json({ message: "Logged out successfully" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
