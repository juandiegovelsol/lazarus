const readline = require("readline");

// Safe ranges for each vital sign
const safeRanges = {
  heartRate: { min: 60, max: 100 },
  systolicBloodPressure: { min: 90, max: 120 },
  diastolicBloodPressure: { min: 60, max: 80 },
  bodyTemperature: { min: 36.1, max: 37.2 },
};

// Severity levels
const severityLevels = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
};

// Devices available for the monitoring session
const devices = ["Device 1", "Device 2", "Device 3"];

// Function to generate random vital sign data for each device
function generateRandomVitalSigns(deviceId) {
  return {
    deviceId,
    heartRate: Math.floor(Math.random() * 41) + 60, // 60-100 bpm
    systolicBloodPressure: Math.floor(Math.random() * 31) + 90, // 90-120 mmHg
    diastolicBloodPressure: Math.floor(Math.random() * 21) + 60, // 60-80 mmHg
    bodyTemperature: Math.random() * 1.1 + 36.1, // 36.1-37.2°C
  };
}

// Function to evaluate the severity level of a given vital sign based on its deviation
function evaluateSeverity(vitalSign, value) {
  const { min, max } = safeRanges[vitalSign];
  const deviation = Math.abs(value - (min + max) / 2);
  const maxDeviation = (max - min) / 2;

  if (deviation > maxDeviation * 0.8) return severityLevels.high;
  if (deviation > maxDeviation * 0.5) return severityLevels.medium;
  return severityLevels.low;
}

// AlertSystem class to manage the monitoring session
class AlertSystem {
  constructor(sessionDuration) {
    this.sessionDuration = sessionDuration;
    this.aggregatedData = [];
    this.recordedData = [];
  }

  // Method to aggregate data from multiple devices within an interval
  aggregateData(deviceData) {
    this.aggregatedData.push(deviceData);

    // Evaluate only if all devices have sent their readings for the interval
    if (this.aggregatedData.length === devices.length) {
      this.evaluateData();
      this.aggregatedData = []; // Reset for the next interval
    }
  }

  // Method to evaluate aggregated data and generate alerts
  evaluateData() {
    const aggregatedValues = this.aggregatedData.reduce((acc, current) => {
      Object.keys(current).forEach((key) => {
        if (key !== "deviceId") {
          acc[key] = (acc[key] || 0) + current[key];
        }
      });
      return acc;
    }, {});

    // Calculate the average value for each vital sign
    Object.keys(aggregatedValues).forEach((key) => {
      aggregatedValues[key] /= devices.length;
    });

    const alerts = [];
    let severityLevel = severityLevels.low;

    // Evaluate each vital sign and generate alerts by affected devices
    Object.keys(aggregatedValues).forEach((vitalSign) => {
      const averageValue = aggregatedValues[vitalSign];
      const { min, max } = safeRanges[vitalSign];

      if (averageValue < min || averageValue > max) {
        const severity = evaluateSeverity(vitalSign, averageValue);
        const affectedDevices = this.aggregatedData
          .filter((data) => data[vitalSign] < min || data[vitalSign] > max)
          .map((data) => ({
            deviceId: data.deviceId,
            value: data[vitalSign],
          }));

        alerts.push({
          severity,
          vitalSign,
          averageValue,
          affectedDevices,
        });
      }
    });

    // Escalate to high severity if more than two parameters are out of range
    if (alerts.length === 1 || alerts.length === 2) {
      severityLevel = severityLevels.medium;
    } else if (alerts.length > 2) {
      severityLevel = severityLevels.high;
    }

    // Store the batch data and alerts
    this.recordedData.push({
      aggregatedValues,
      alerts,
      severityLevel,
    });
  }

  // Method to print the recorded data and alerts at the end of the session
  printRecordedData() {
    this.recordedData.forEach((data, index) => {
      console.log(`\nBatch ${index + 1}:`);
      console.log(`Aggregated Values:`, data.aggregatedValues);
      console.log(`Alerts:`);

      data.alerts.forEach((alert) => {
        console.log(`  Severity: ${alert.severity}`);
        console.log(`  Vital Sign: ${alert.vitalSign}`);
        console.log(`  Average Value: ${alert.averageValue}`);
        console.log(`  Affected Devices:`);
        alert.affectedDevices.forEach((device) => {
          console.log(`    Device: ${device.deviceId}, Value: ${device.value}`);
        });
      });

      console.log(`Severity Level for Batch: ${data.severityLevel}`);
    });
  }
}

// Main function to configure and run the monitoring session
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the session duration in seconds: ", (sessionDuration) => {
    if (+sessionDuration > 0) {
      const alertSystem = new AlertSystem(parseInt(sessionDuration, 10));

      // Simulate data collection every 2 seconds
      const intervalId = setInterval(() => {
        devices.forEach((device) => {
          const vitalSigns = generateRandomVitalSigns(device);
          alertSystem.aggregateData(vitalSigns);
        });
      }, 2000);

      // Stop the session after the specified duration
      setTimeout(() => {
        clearInterval(intervalId);
        alertSystem.printRecordedData();
        rl.close();
      }, sessionDuration * 1000);
    } else {
      console.log("Please input a valid session duration");
    }
  });
}

// Start the monitoring session
main();
