// Sample network configuration script
const ports = [
  { port: 80, status: "open" },
  { port: 443, status: "closed" },
  { port: 22, status: "open" },
  { port: 65536, status: "open" }, // Invalid port number for testing
  { port: -1, status: "open" }, // Invalid port number for testing
  { port: 8080, status: "invalid" }, // Invalid status for testing
];

// Function to configure ports
function configurePorts(portConfigs) {
  console.log("Configuring ports...");
  let openPorts = [];

  portConfigs.forEach((portConfig) => {
    // Validate port number
    if (!isValidPort(portConfig.port)) {
      console.log(
        `Skipping port ${portConfig.port} due to invalid port number.`
      );
      return;
    }

    // Validate port status
    if (!isValidStatus(portConfig.status)) {
      console.log(
        `Skipping port ${portConfig.port} due to invalid status '${portConfig.status}'.`
      );
      closePort(portConfig.port); // Close port by default for security
      return;
    }

    if (portConfig.status === "open") {
      openPort(portConfig.port);
      openPorts.push(portConfig.port);
    } else {
      closePort(portConfig.port);
    }
  });

  // Security check to confirm no unintended ports are left open
  console.log("Performing security check...");
  portConfigs.forEach((portConfig) => {
    if (openPorts.includes(portConfig.port) && portConfig.status !== "open") {
      console.log(
        `Security risk detected: Port ${portConfig.port} is open but not explicitly configured as such.`
      );
      closePort(portConfig.port);
      openPorts = openPorts.filter((port) => port !== portConfig.port);
    }
  });

  // Log summary of open ports
  console.log("Configuration complete.");
  console.log(`Open ports: ${openPorts.join(", ")}`);
}

// Functions to simulate opening and closing ports
function openPort(port) {
  console.log(`Port ${port} is now open.`);
}

function closePort(port) {
  console.log(`Port ${port} is now closed.`);
}

// Helper functions for validation
function isValidPort(port) {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
}

function isValidStatus(status) {
  return ["open", "closed"].includes(status);
}

// Initial call to configure ports
configurePorts(ports);
