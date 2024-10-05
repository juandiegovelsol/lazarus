// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

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

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Get all devices
app.get("/devices", (req, res) => {
  res.json(devices);
});

// Create a new device
app.post("/devices", (req, res) => {
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

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
