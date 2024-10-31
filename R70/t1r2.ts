// Define a function to calculate estimated race times
function calculateEstimatedTimes(bestDistance: string, bestTime: number): { [distance: string]: number } {
  // Define pace adjustment factors for each distance
  const paceAdjustments: { [distance: string]: number } = {
    '5 km': 1,
    '10 km': 1.05,
    'half marathon': 1.1,
    'marathon': 1.2,
  };

  // Calculate the runner's pace per km at their best distance
  const bestPace = bestTime / getDistanceInKm(bestDistance);

  // Calculate estimated times for each distance
  const estimatedTimes: { [distance: string]: number } = {};
  for (const distance in paceAdjustments) {
    estimatedTimes[distance] = Math.round(getDistanceInKm(distance) * bestPace * paceAdjustments[distance]);
  }

  return estimatedTimes;
}

// Define a function to get the distance in km
function getDistanceInKm(distance: string): number {
  switch (distance) {
    case '5 km':
      return 5;
    case '10 km':
      return 10;
    case 'half marathon':
      return 21.0975;
    case 'marathon':
      return 42.195;
    default:
      throw new Error(`Invalid distance: ${distance}`);
  }
}

// Define a function to get user input
function getInput(prompt: string): string {
  return readlineSync.question(prompt);
}

// Define a function to validate user input
function validateInput(distance: string, time: string): boolean {
  if (!['5 km', '10 km', 'half marathon', 'marathon'].includes(distance)) {
    console.error('Invalid distance. Please enter one of the following: 5 km, 10 km, half marathon, marathon');
    return false;
  }

  const timeNumber = Number(time);
  if (isNaN(timeNumber) || timeNumber <= 0) {
    console.error('Invalid time. Please enter a positive number');
    return false;
  }

  return true;
}

// Main program
import readlineSync from 'readline-sync';

console.log('Estimated Race Time Calculator');

const bestDistance = getInput('Enter your best distance (5 km, 10 km, half marathon, marathon): ');
const bestTime = getInput('Enter your best time at that distance (in minutes): ');

if (validateInput(bestDistance, bestTime)) {
  const estimatedTimes = calculateEstimatedTimes(bestDistance, Number(bestTime));
  console.log('Estimated finish times:');
  for (const distance in estimatedTimes) {
    console.log(`${distance}: ${estimatedTimes[distance]} minutes`);
  }
}