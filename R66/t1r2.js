// Import required modules
const express = require("express");
const app = express();
const http = require("http").createServer(app);

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store for vehicles
vehicles = {
  V001: {
    id: "V001",
    location: { latitude: 40.7128, longitude: -74.006 },
    driver: { name: "John Doe" },
    status: "active",
  },
  V002: {
    id: "V002",
    location: { latitude: 34.0522, longitude: -118.2437 },
    driver: { name: "Jane Smith" },
    status: "inactive",
  },
  V003: {
    id: "V003",
    location: { latitude: 51.5074, longitude: -0.1278 },
    driver: { name: "Bob Wilson" },
    status: "maintenance",
  },
};

// Data validation function
function validateVehicleData(data) {
  if (!data.id || typeof data.id !== "string") {
    throw new Error("Vehicle ID is required and must be a string");
  }
  if (
    data.latitude &&
    (typeof data.latitude !== "number" ||
      data.latitude < -90 ||
      data.latitude > 90)
  ) {
    throw new Error("Latitude must be a number between -90 and 90");
  }
  if (
    data.longitude &&
    (typeof data.longitude !== "number" ||
      data.longitude < -180 ||
      data.longitude > 180)
  ) {
    throw new Error("Longitude must be a number between -180 and 180");
  }
  if (data.driverName && typeof data.driverName !== "string") {
    throw new Error("Driver name must be a string");
  }
  if (data.status && typeof data.status !== "string") {
    throw new Error("Vehicle status must be a string");
  }
}

// API endpoint to update vehicle location
app.put("/vehicles/:id/location", (req, res) => {
  try {
    const id = req.params.id;
    const { latitude, longitude } = req.body;
    const data = { id, latitude, longitude };
    validateVehicleData(data);
    if (!vehicles[id]) {
      vehicles[id] = {};
    }
    vehicles[id].latitude = latitude;
    vehicles[id].longitude = longitude;
    res.send(`Location updated for vehicle ${id}`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// API endpoint to update vehicle information
app.put("/vehicles/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { driverName, status } = req.body;
    const data = { id, driverName, status };
    validateVehicleData(data);
    if (!vehicles[id]) {
      vehicles[id] = {};
    }
    if (driverName) {
      vehicles[id].driverName = driverName;
    }
    if (status) {
      vehicles[id].status = status;
    }
    res.send(`Information updated for vehicle ${id}`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// API endpoint to list all vehicles with their latest location and status
app.get("/vehicles", (req, res) => {
  try {
    const vehicleList = Object.keys(vehicles).map((id) => ({
      id,
      latitude: vehicles[id].latitude,
      longitude: vehicles[id].longitude,
      driverName: vehicles[id].driverName,
      status: vehicles[id].status,
    }));
    res.json(vehicleList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching vehicle list");
  }
});

// API endpoint to delete a vehicle's data
app.delete("/vehicles/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (vehicles[id]) {
      delete vehicles[id];
      res.send(`Vehicle ${id} deleted`);
    } else {
      res.status(404).send(`Vehicle ${id} not found`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting vehicle");
  }
});

// Start the server
const port = 3000;
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
