// Define the safe ranges for each vital sign
const safeRanges = {
  heartRate: { min: 60, max: 100 },
  systolicBloodPressure: { min: 90, max: 120 },
  diastolicBloodPressure: { min: 60, max: 80 },
  bodyTemperature: { min: 36.1, max: 37.2 },
};

// Define the severity levels
const severityLevels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

// Define the devices
const devices = ["Device 1", "Device 2", "Device 3"];

// Define the vital signs
const vitalSigns = [
  "heartRate",
  "systolicBloodPressure",
  "diastolicBloodPressure",
  "bodyTemperature",
];

// Function to generate random data within realistic ranges for each device
function generateRandomData(device) {
  return {
    heartRate: Math.floor(Math.random() * 50) + 50,
    systolicBloodPressure: Math.floor(Math.random() * 50) + 80,
    diastolicBloodPressure: Math.floor(Math.random() * 40) + 50,
    bodyTemperature: Math.random() * 2 + 35,
    device,
  };
}

// Function to evaluate the severity level of a vital sign
function evaluateSeverity(vitalSign, value) {
  const range = safeRanges[vitalSign];
  const deviation = Math.abs(value - (range.min + range.max) / 2);
  const maxDeviation = (range.max - range.min) / 2;

  if (deviation > maxDeviation * 0.8) {
    return severityLevels.high;
  } else if (deviation > maxDeviation * 0.5) {
    return severityLevels.medium;
  } else {
    return severityLevels.low;
  }
}

// Function to aggregate data from all devices
function aggregateData(data) {
  const aggregatedData = {};

  vitalSigns.forEach((vitalSign) => {
    aggregatedData[vitalSign] =
      data.reduce((sum, current) => sum + current[vitalSign], 0) / data.length;
  });

  return aggregatedData;
}

// Function to evaluate the alerts
function evaluateAlerts(aggregatedData, data) {
  const alerts = [];

  vitalSigns.forEach((vitalSign) => {
    const value = aggregatedData[vitalSign];
    const range = safeRanges[vitalSign];

    if (value < range.min || value > range.max) {
      const severity = evaluateSeverity(vitalSign, value);
      const affectedDevices = data
        .filter(
          (item) => item[vitalSign] < range.min || item[vitalSign] > range.max
        )
        .map((item) => item.device);

      alerts.push({
        severity,
        vitalSign,
        value,
        affectedDevices,
      });
    }
  });

  // Escalate the severity level if more than two parameters are out of range simultaneously
  if (alerts.length > 2) {
    alerts.forEach((alert) => {
      alert.severity = severityLevels.high;
    });
  }

  return alerts;
}

// Main function to start the monitoring session
function startMonitoringSession(duration) {
  const recordedData = [];
  let intervalId;

  // Function to collect and aggregate data from all devices
  function collectData() {
    const data = devices.map((device) => generateRandomData(device));
    const aggregatedData = aggregateData(data);
    const alerts = evaluateAlerts(aggregatedData, data);

    recordedData.push({
      aggregatedData,
      alerts,
    });

    console.log("Collected data:");
    console.log(aggregatedData);
    console.log("Alerts:");
    console.log(alerts);
  }

  // Start the monitoring session
  intervalId = setInterval(collectData, 2000);

  // Stop the monitoring session after the specified duration
  setTimeout(() => {
    clearInterval(intervalId);
    console.log("Monitoring session ended.");
    console.log("Recorded data:");
    console.log(recordedData);
  }, duration * 1000);
}

// Start the monitoring session with a duration of 10 seconds
startMonitoringSession(10);
