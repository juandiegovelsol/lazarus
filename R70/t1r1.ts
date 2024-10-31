// Define a function to calculate estimated race times
function calculateEstimatedTimes(
  bestDistance: string,
  bestTime: number
): { [distance: string]: number } {
  // Define pace adjustment factors for each distance
  const paceAdjustmentFactors: { [distance: string]: number } = {
    "5 km": 1,
    "10 km": 1.05,
    "half marathon": 1.1,
    marathon: 1.2,
  };

  // Calculate the runner's pace per km at their best distance
  const bestPacePerKm = bestTime / getDistanceInKm(bestDistance);

  // Initialize an object to store estimated times
  const estimatedTimes: { [distance: string]: number } = {};

  // Calculate estimated times for each distance
  for (const distance in paceAdjustmentFactors) {
    const paceAdjustmentFactor = paceAdjustmentFactors[distance];
    const distanceInKm = getDistanceInKm(distance);
    estimatedTimes[distance] = Math.round(
      bestPacePerKm * paceAdjustmentFactor * distanceInKm
    );
  }

  return estimatedTimes;
}

// Define a function to get the distance in km
function getDistanceInKm(distance: string): number {
  switch (distance) {
    case "5 km":
      return 5;
    case "10 km":
      return 10;
    case "half marathon":
      return 21.0975;
    case "marathon":
      return 42.195;
    default:
      throw new Error(`Invalid distance: ${distance}`);
  }
}

// Define a function to get user input
function getUserInput(): Promise<{ bestDistance: string; bestTime: number }> {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question(
      "Enter your best distance (5 km, 10 km, half marathon, or marathon): ",
      (bestDistance) => {
        readline.question(
          "Enter your best time at that distance in minutes: ",
          (bestTime) => {
            const bestTimeNumber = parseInt(bestTime, 10);
            if (isNaN(bestTimeNumber) || bestTimeNumber <= 0) {
              console.error("Invalid time. Please enter a positive number.");
              process.exit(1);
            }
            resolve({ bestDistance, bestTime: bestTimeNumber });
            readline.close();
          }
        );
      }
    );
  });
}

// Main function
async function main() {
  try {
    const { bestDistance, bestTime } = await getUserInput();
    const estimatedTimes = calculateEstimatedTimes(bestDistance, bestTime);
    console.log("Estimated finish times:");
    for (const distance in estimatedTimes) {
      console.log(`${distance}: ${estimatedTimes[distance]} minutes`);
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
