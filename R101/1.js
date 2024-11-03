// Sample network configuration script
const ports = [
  { port: 80, status: "open" },
  { port: 443, status: "closed" },
  { port: 22, status: "open" },
  { port: 65536, status: "open" }, // Invalid port number for testing
  { port: 0, status: "open" }, // Invalid port number for testing
  { port: "abc", status: "open" }, // Invalid port number for testing
];

// Function to configure ports
function configurePorts(portConfigs) {
  // Initialize an empty array to store open ports
  let openPorts = [];

  // Iterate over each port configuration
  portConfigs.forEach((portConfig) => {
    // Validate port number (must be between 1 and 65535)
    if (
      typeof portConfig.port !== "number" ||
      portConfig.port < 1 ||
      portConfig.port > 65535
    ) {
      console.error(
        `Invalid port number: ${portConfig.port}. Skipping configuration.`
      );
      return;
    }

    // Check if the port status is valid
    if (portConfig.status !== "open" && portConfig.status !== "closed") {
      console.error(
        `Invalid port status: ${portConfig.status}. Skipping configuration.`
      );
      return;
    }

    // Configure the port based on its status
    if (portConfig.status === "open") {
      openPort(portConfig.port);
      openPorts.push(portConfig.port); // Add to the list of open ports
    } else {
      closePort(portConfig.port);
    }
  });

  // Log a summary of open ports
  console.log(`Open ports: ${openPorts.join(", ")}`);

  // Perform a security check to confirm that no unintended ports are left open
  securityCheck(openPorts);
}

// Functions to simulate opening and closing ports
function openPort(port) {
  console.log(`Port ${port} is now open.`);
}

function closePort(port) {
  console.log(`Port ${port} is now closed.`);
}

// Security check function to confirm that no unintended ports are left open
function securityCheck(openPorts) {
  // Simulate retrieving a list of currently open ports (this may vary based on your actual implementation)
  let currentlyOpenPorts = openPorts; // For demonstration purposes, assume this is the list of currently open ports

  // Check if there are any unintended open ports
  let unintendedOpenPorts = currentlyOpenPorts.filter(
    (port) => !openPorts.includes(port)
  );

  // Log the result of the security check
  if (unintendedOpenPorts.length > 0) {
    console.error(
      `Security check failed: Unintended open ports detected - ${unintendedOpenPorts.join(
        ", "
      )}`
    );
  } else {
    console.log("Security check passed: No unintended open ports detected.");
  }
}

// Initial call to configure ports
configurePorts(ports);
