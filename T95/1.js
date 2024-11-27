// Import required libraries
const readline = require("readline");

// Define the safe ranges for vital signs
const safeRanges = {
  heartRate: [60, 100],
  systolicBloodPressure: [90, 120],
  diastolicBloodPressure: [60, 80],
  bodyTemperature: [36.1, 37.2],
};

// Define the severity levels
const severityLevels = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
};

// Define a function to generate random vital signs data within realistic ranges
function generateRandomVitalSigns(deviceId) {
  return {
    heartRate: Math.floor(Math.random() * 50) + 50,
    systolicBloodPressure: Math.floor(Math.random() * 40) + 80,
    diastolicBloodPressure: Math.floor(Math.random() * 30) + 50,
    bodyTemperature: Math.random() * 1.5 + 35.5,
    deviceId,
  };
}

// Define a function to evaluate the severity of a vital sign
function evaluateSeverity(vitalSign, value) {
  const [min, max] = safeRanges[vitalSign];
  const deviation = Math.abs(value - (min + max) / 2);

  if (deviation < (max - min) / 4) {
    return severityLevels.low;
  } else if (deviation < (max - min) / 2) {
    return severityLevels.medium;
  } else {
    return severityLevels.high;
  }
}

// Define the AlertSystem class
class AlertSystem {
  constructor(sessionDuration) {
    this.sessionDuration = sessionDuration;
    this.aggregatedData = [];
    this.recordedData = [];
  }

  // Method to aggregate data from multiple devices
  aggregateData(deviceData) {
    this.aggregatedData.push(deviceData);

    // Only evaluate data if all sources have sent their readings for the interval
    if (this.aggregatedData.length === 3) {
      this.evaluateData();
      this.aggregatedData = [];
    }
  }

  // Method to evaluate the aggregated data
  evaluateData() {
    const aggregatedValues = this.aggregatedData.reduce((acc, current) => {
      Object.keys(current).forEach((key) => {
        if (key !== "deviceId") {
          acc[key] = (acc[key] || 0) + current[key];
        }
      });
      return acc;
    }, {});

    Object.keys(aggregatedValues).forEach((key) => {
      aggregatedValues[key] /= 3;
    });

    const alerts = [];
    let severityLevel = severityLevels.low;

    Object.keys(aggregatedValues).forEach((vitalSign) => {
      const value = aggregatedValues[vitalSign];
      const [min, max] = safeRanges[vitalSign];

      if (value < min || value > max) {
        const severity = evaluateSeverity(vitalSign, value);
        const deviceIds = this.aggregatedData
          .filter((data) => data[vitalSign] < min || data[vitalSign] > max)
          .map((data) => data.deviceId);

        alerts.push({
          severity,
          vitalSign,
          value,
          deviceIds,
        });

        if (severity === severityLevels.high) {
          severityLevel = severityLevels.high;
        } else if (
          severity === severityLevels.medium &&
          severityLevel !== severityLevels.high
        ) {
          severityLevel = severityLevels.medium;
        }
      }
    });

    // Escalate severity level if more than two parameters are out of range simultaneously
    if (alerts.length > 2) {
      severityLevel = severityLevels.high;
    }

    // Store the recorded data
    this.recordedData.push({
      aggregatedValues,
      alerts,
      severityLevel,
    });
  }

  // Method to print the recorded data
  printRecordedData() {
    this.recordedData.forEach((data, index) => {
      console.log(`Batch ${index + 1}:`);
      console.log(`Aggregated Values:`);
      console.log(data.aggregatedValues);
      console.log(`Alerts:`);
      data.alerts.forEach((alert) => {
        console.log(`Severity: ${alert.severity}`);
        console.log(`Vital Sign: ${alert.vitalSign}`);
        console.log(`Value: ${alert.value}`);
        console.log(`Device IDs: ${alert.deviceIds.join(", ")}`);
      });
      console.log(`Severity Level: ${data.severityLevel}`);
      console.log("");
    });
  }
}

// Create an instance of the AlertSystem class
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the session duration in seconds: ", (sessionDuration) => {
    const alertSystem = new AlertSystem(parseInt(sessionDuration));

    // Simulate the data from multiple devices
    let intervalId = setInterval(() => {
      for (let i = 1; i <= 3; i++) {
        const vitalSigns = generateRandomVitalSigns(`Device ${i}`);
        alertSystem.aggregateData(vitalSigns);
      }
    }, 2000);

    // Stop the simulation after the session duration
    setTimeout(() => {
      clearInterval(intervalId);
      alertSystem.printRecordedData();
    }, parseInt(sessionDuration) * 1000);
  });
}

main();
