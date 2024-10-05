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

let users = [];

// Endpoint to get all devices
app.get(
  "/api/devices",
  authenticate,
  authorize("admin", "customer"),
  (req, res) => {
    res.json(devices);
  }
);

// Endpoint to create a new device
app.post("/api/devices", authenticate, authorize("admin"), (req, res) => {
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
});

// Endpoint to create a new user
app.post("/api/users", (req, res) => {
  const { email, password, role } = req.body;
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }
  const newUser = {
    id: users.length + 1,
    email,
    password,
    role,
  };
  users.push(newUser);
  res.json(newUser);
});

// Endpoint to login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = generateToken(user);
  res.json({ token });
});

// Middleware to authenticate the user
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = users.find((user) => generateToken(user) === token);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = user;
  next();
}

// Middleware to authorize the user
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

// Function to generate a token
function generateToken(user) {
  return `token-${user.id}`;
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
