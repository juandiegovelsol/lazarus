// Import required modules
const express = require("express");
const app = express();
const http = require("http").createServer(app);

// Initialize in-memory vehicle data store
let vehicles = {};

// Middleware to parse JSON requests
app.use(express.json());

// Validate vehicle data
function validateVehicleData(data) {
  if (!data.id || typeof data.id !== "string") {
    throw new Error("Vehicle ID is required and must be a string.");
  }
  if (
    data.latitude &&
    (typeof data.latitude !== "number" ||
      data.latitude < -90 ||
      data.latitude > 90)
  ) {
    throw new Error("Latitude must be a number between -90 and 90.");
  }
  if (
    data.longitude &&
    (typeof data.longitude !== "number" ||
      data.longitude < -180 ||
      data.longitude > 180)
  ) {
    throw new Error("Longitude must be a number between -180 and 180.");
  }
  if (data.driverName && typeof data.driverName !== "string") {
    throw new Error("Driver name must be a string.");
  }
  if (data.status && typeof data.status !== "string") {
    throw new Error("Vehicle status must be a string.");
  }
}

// POST /vehicles - Create or update a vehicle
app.post("/vehicles", (req, res) => {
  try {
    const data = req.body;
    validateVehicleData(data);
    const vehicleId = data.id;
    if (!vehicles[vehicleId]) {
      vehicles[vehicleId] = {};
    }
    vehicles[vehicleId].id = vehicleId;
    if (data.latitude) {
      vehicles[vehicleId].latitude = data.latitude;
    }
    if (data.longitude) {
      vehicles[vehicleId].longitude = data.longitude;
    }
    if (data.driverName) {
      vehicles[vehicleId].driverName = data.driverName;
    }
    if (data.status) {
      vehicles[vehicleId].status = data.status;
    }
    res.send(`Vehicle ${vehicleId} updated successfully.`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// GET /vehicles - List all vehicles with their latest location and status
app.get("/vehicles", (req, res) => {
  res.send(Object.values(vehicles));
});

// GET /vehicles/:id - Get a vehicle by ID
app.get("/vehicles/:id", (req, res) => {
  const vehicleId = req.params.id;
  if (vehicles[vehicleId]) {
    res.send(vehicles[vehicleId]);
  } else {
    res.status(404).send(`Vehicle ${vehicleId} not found.`);
  }
});

// DELETE /vehicles/:id - Delete a vehicle by ID
app.delete("/vehicles/:id", (req, res) => {
  const vehicleId = req.params.id;
  if (vehicles[vehicleId]) {
    delete vehicles[vehicleId];
    res.send(`Vehicle ${vehicleId} deleted successfully.`);
  } else {
    res.status(404).send(`Vehicle ${vehicleId} not found.`);
  }
});

// Start the server
const port = 3000;
http.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
