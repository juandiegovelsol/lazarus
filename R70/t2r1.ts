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
function calculateRequiredTimes(marathonGoalTime: number): {
  [distance: string]: number;
} {
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
  bestDistance: string | null;
  bestTime: number | null;
  marathonGoalTime: number | null;
}> {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let bestDistance: string | null = null;
  let bestTime: number | null = null;
  let marathonGoalTime: number | null = null;

  const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
      readline.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  let chooseMode: string;
  do {
    chooseMode = await askQuestion(
      "Do you want to enter your best time at a distance or a marathon goal time? (1 for best time, 2 for marathon goal): "
    );
  } while (chooseMode !== "1" && chooseMode !== "2");

  if (chooseMode === "1") {
    do {
      bestDistance = await askQuestion(
        "Enter your best distance (5 km, 10 km, half marathon, or marathon): "
      );
      if (
        !["5 km", "10 km", "half marathon", "marathon"].includes(bestDistance)
      ) {
        console.log("Invalid distance. Please try again.");
        bestDistance = null;
      }
    } while (bestDistance === null);

    do {
      const time = await askQuestion(
        "Enter your best time at that distance in minutes: "
      );
      const timeNumber = parseInt(time, 10);
      if (isNaN(timeNumber) || timeNumber <= 0) {
        console.log("Invalid time. Please try again.");
        bestTime = null;
      } else {
        bestTime = timeNumber;
      }
    } while (bestTime === null);
  } else if (chooseMode === "2") {
    do {
      const time = await askQuestion(
        "Enter your marathon goal time in minutes: "
      );
      const timeNumber = parseInt(time, 10);
      if (isNaN(timeNumber) || timeNumber <= 0) {
        console.log("Invalid time. Please try again.");
        marathonGoalTime = null;
      } else {
        marathonGoalTime = timeNumber;
      }
    } while (marathonGoalTime === null);
  }

  readline.close();
  return { bestDistance, bestTime, marathonGoalTime };
}

// Main function
async function main() {
  const { bestDistance, bestTime, marathonGoalTime } = await getUserInput();

  if (bestDistance && bestTime) {
    const estimatedTimes = calculateEstimatedTimes(bestDistance, bestTime);
    console.log("Estimated finish times:");
    for (const distance in estimatedTimes) {
      console.log(`${distance}: ${estimatedTimes[distance]} minutes`);
    }
  } else if (marathonGoalTime) {
    const requiredTimes = calculateRequiredTimes(marathonGoalTime);
    console.log("Required times to meet your marathon goal:");
    for (const distance in requiredTimes) {
      console.log(`${distance}: ${requiredTimes[distance]} minutes`);
    }
  }
}

main();


