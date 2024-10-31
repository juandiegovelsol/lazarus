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

// Define a function to calculate required times for a marathon goal
function calculateRequiredTimes(
  marathonGoalTime: number
): { [distance: string]: number } {
  // Define pace adjustment factors for each distance
  const paceAdjustmentFactors: { [distance: string]: number } = {
    "5 km": 1 / 1.2,
    "10 km": 1.05 / 1.2,
    "half marathon": 1.1 / 1.2,
    marathon: 1,
  };

  // Calculate the required pace per km for the marathon goal
  const requiredPacePerKm = marathonGoalTime / getDistanceInKm("marathon");

  // Initialize an object to store required times
  const requiredTimes: { [distance: string]: number } = {};

  // Calculate required times for each distance
  for (const distance in paceAdjustmentFactors) {
    const paceAdjustmentFactor = paceAdjustmentFactors[distance];
    const distanceInKm = getDistanceInKm(distance);
    requiredTimes[distance] = Math.round(
      requiredPacePerKm * paceAdjustmentFactor * distanceInKm
    );
  }

  return requiredTimes;
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
async function getUserInput(): Promise<{
  mode: "bestTime" | "marathonGoal";
  bestDistance?: string;
  bestTime?: number;
  marathonGoalTime?: number;
}> {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const mode = await new Promise((resolve) => {
    readline.question(
      "Do you want to enter your best time or your marathon goal time? (bestTime/marathonGoal): ",
      (mode) => {
        if (mode === "bestTime" || mode === "marathonGoal") {
          resolve(mode);
        } else {
          console.log("Invalid mode. Please enter 'bestTime' or 'marathonGoal'.");
          resolve(getUserInput());
        }
      }
    );
  });

  if (mode === "bestTime") {
    const bestDistance = await new Promise((resolve) => {
      readline.question(
        "Enter your best distance (5 km, 10 km, half marathon, or marathon): ",
        (bestDistance) => {
          if (
            bestDistance === "5 km" ||
            bestDistance === "10 km" ||
            bestDistance === "half marathon" ||
            bestDistance === "marathon"
          ) {
            resolve(bestDistance);
          } else {
            console.log(
              "Invalid distance. Please enter '5 km', '10 km', 'half marathon', or 'marathon'."
            );
            resolve(getUserInput());
          }
        }
      );
    });

    const bestTime = await new Promise((resolve) => {
      readline.question(
        "Enter your best time at that distance in minutes: ",
        (bestTime) => {
          const bestTimeNumber = parseInt(bestTime, 10);
          if (isNaN(bestTimeNumber) || bestTimeNumber <= 0) {
            console.log(
              "Invalid time. Please enter a positive number."
            );
            resolve(getUserInput());
          } else {
            resolve(bestTimeNumber);
          }
        }
      );
    });

    return { mode, bestDistance, bestTime };
  } else {
    const marathonGoalTime = await new Promise((resolve) => {
      readline.question(
        "Enter your marathon goal time in minutes: ",
        (marathonGoalTime) => {
          const marathonGoalTimeNumber = parseInt(marathonGoalTime, 10);
          if (isNaN(marathonGoalTimeNumber) || marathonGoalTimeNumber <= 0) {
            console.log(
              "Invalid time. Please enter a positive number."
            );
            resolve(getUserInput());
          } else {
            resolve(marathonGoalTimeNumber);
          }
        }
      );
    });

    return { mode, marathonGoalTime };
  }
}

// Main function
async function main() {
  const userInput = await getUserInput();

  if (userInput.mode === "bestTime") {
    const estimatedTimes = calculateEstimatedTimes(
      userInput.bestDistance!,
      userInput.bestTime!
    );
    console.log("Estimated finish times:");
    for (const distance in estimatedTimes) {
      console.log(`${distance}: ${estimatedTimes[distance]} minutes`);
    }
  } else {
    const requiredTimes = calculateRequiredTimes(userInput.marathonGoalTime!);
    console.log("Required times to meet your marathon goal:");
    for (const distance in requiredTimes) {
      console.log(`${distance}: ${requiredTimes[distance]} minutes`);
    }
  }
}

main();