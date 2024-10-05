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

// Endpoint to get all devices
app.get("/api/devices", (req, res) => {
  res.json(devices);
});

// Endpoint to create a new device
app.post("/api/devices", (req, res) => {
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

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
