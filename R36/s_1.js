"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var langchain_1 = require("langchain");
// Define a cache to store generated workout plans
var workoutPlanCache = {};
// Define a function to validate user input
function validateUserInput(preferences) {
    // Check if goals and equipment are valid
    if (!preferences.goals.every(function (goal) { return ['weight loss', 'muscle gain', 'endurance'].includes(goal); })) {
        return false;
    }
    if (!preferences.equipment.every(function (equipment) { return ['dumbbells', 'barbell', 'kettlebell'].includes(equipment); })) {
        return false;
    }
    // Check if duration is within a valid range
    if (preferences.duration < 10 || preferences.duration > 120) {
        return false;
    }
    return true;
}
// Define a function to generate a specific prompt for each goal and equipment combination
function generatePrompt(preferences) {
    var goalPrompts = {
        'weight loss': 'Create a weight loss workout plan',
        'muscle gain': 'Create a muscle gain workout plan',
        'endurance': 'Create an endurance workout plan',
    };
    var equipmentPrompts = {
        dumbbells: 'using dumbbells',
        barbell: 'using a barbell',
        kettlebell: 'using a kettlebell',
    };
    var goalPrompt = preferences.goals.map(function (goal) { return goalPrompts[goal]; }).join(', ');
    var equipmentPrompt = preferences.equipment.map(function (equipment) { return equipmentPrompts[equipment]; }).join(', ');
    return "".concat(goalPrompt, " ").concat(equipmentPrompt, " within ").concat(preferences.duration, " minutes.");
}
// Define a function to post-process the generated workout plan
function postProcessWorkoutPlan(plan, preferences) {
    // Filter out unsupported exercises
    var supportedExercises = {
        squats: true,
        deadlifts: true,
        benchPress: true,
    };
    var exercises = plan.split(', ');
    var filteredExercises = exercises.filter(function (exercise) { return supportedExercises[exercise]; });
    return filteredExercises.join(', ');
}
function generateWorkoutPlan(preferences) {
    // Validate user input
    if (!validateUserInput(preferences)) {
        throw new Error('Invalid user input');
    }
    // Check if a cached workout plan exists
    var cacheKey = JSON.stringify(preferences);
    if (workoutPlanCache[cacheKey]) {
        return workoutPlanCache[cacheKey];
    }
    // Generate a specific prompt for the user's input
    var prompt = generatePrompt(preferences);
    // Generate the workout plan using LangChain
    var langChain = new langchain_1.LangChain();
    var response = langChain.generate(prompt);
    // Post-process the generated workout plan
    var postProcessedPlan = postProcessWorkoutPlan(response.text, preferences);
    // Cache the generated workout plan
    workoutPlanCache[cacheKey] = postProcessedPlan;
    return postProcessedPlan;
    function generateWorkoutPlan(preferences) {
        var prompt = "\n      Create a workout plan that strictly adheres to the following requirements:\n      - Goals: ".concat(preferences.goals.join(', '), "\n      - Available equipment: ").concat(preferences.equipment.join(', '), "\n      - Duration: ").concat(preferences.duration, " minutes\n      - Exercise type: Please provide a mix of cardio and strength training exercises\n      - Intensity level: Moderate to high intensity\n    ");
        var langChain = new langchain_1.LangChain();
        var response = langChain.generate(prompt);
        return response.text;
    }
    function validateWorkoutPlan(plan, preferences) {
        var exercises = parseExercisesFromPlan(plan);
        for (var _i = 0, exercises_1 = exercises; _i < exercises_1.length; _i++) {
            var exercise = exercises_1[_i];
            if (!preferences.equipment.includes(exercise.equipment)) {
                return false;
            }
        }
        return true;
    }
    function generateWorkoutPlan(preferences) {
        var prompt = ; // ... refined prompt ...
        var langChain = new langchain_1.LangChain();
        var response = langChain.generate(prompt);
        var plan = response.text;
        if (!validateWorkoutPlan(plan, preferences)) {
            // Handle invalid plan, e.g., regenerate or return an error
        }
        return plan;
    }
    var workoutPlanCache = new Map();
    function generateWorkoutPlan(preferences) {
        var cacheKey = JSON.stringify(preferences);
        if (workoutPlanCache.has(cacheKey)) {
            return workoutPlanCache.get(cacheKey);
        }
        var prompt = ; // ... refined prompt ...
        var langChain = new langchain_1.LangChain();
        var response = langChain.generate(prompt);
        var plan = response.text;
        workoutPlanCache.set(cacheKey, plan);
        return plan;
    }
    import { Worker } from 'worker_threads';
    var worker = new worker_threads_1.Worker('./workout-plan-generator-worker.js');
    function generateWorkoutPlan(preferences) {
        return new Promise(function (resolve, reject) {
            worker.postMessage(preferences);
            worker.on('message', function (plan) { return resolve(plan); });
            worker.on('error', function (error) { return reject(error); });
        });
    }
    var userPreferences = {
        goals: ['weight loss', 'muscle gain'],
        equipment: ['dumbbells', 'treadmill'],
        duration: 45,
    };
    var workoutPlan = yield generateWorkoutPlan(userPreferences);
    console.log(workoutPlan);
}
