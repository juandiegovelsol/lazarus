"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define a function to calculate estimated race times
function calculateEstimatedTimes(bestDistance, bestTime) {
    // Define pace adjustment factors for each distance
    var paceAdjustments = {
        '5 km': 1,
        '10 km': 1.05,
        'half marathon': 1.1,
        'marathon': 1.2,
    };
    // Calculate the runner's pace per km at their best distance
    var bestPace = bestTime / getDistanceInKm(bestDistance);
    // Calculate estimated times for each distance
    var estimatedTimes = {};
    for (var distance in paceAdjustments) {
        estimatedTimes[distance] = Math.round(getDistanceInKm(distance) * bestPace * paceAdjustments[distance]);
    }
    return estimatedTimes;
}
// Define a function to get the distance in km
function getDistanceInKm(distance) {
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
            throw new Error("Invalid distance: ".concat(distance));
    }
}
// Define a function to get user input
function getInput(prompt) {
    return readline_sync_1.default.question(prompt);
}
// Define a function to validate user input
function validateInput(distance, time) {
    if (!['5 km', '10 km', 'half marathon', 'marathon'].includes(distance)) {
        console.error('Invalid distance. Please enter one of the following: 5 km, 10 km, half marathon, marathon');
        return false;
    }
    var timeNumber = Number(time);
    if (isNaN(timeNumber) || timeNumber <= 0) {
        console.error('Invalid time. Please enter a positive number');
        return false;
    }
    return true;
}
// Main program
var readline_sync_1 = require("readline-sync");
console.log('Estimated Race Time Calculator');
var bestDistance = getInput('Enter your best distance (5 km, 10 km, half marathon, marathon): ');
var bestTime = getInput('Enter your best time at that distance (in minutes): ');
if (validateInput(bestDistance, bestTime)) {
    var estimatedTimes = calculateEstimatedTimes(bestDistance, Number(bestTime));
    console.log('Estimated finish times:');
    for (var distance in estimatedTimes) {
        console.log("".concat(distance, ": ").concat(estimatedTimes[distance], " minutes"));
    }
}
