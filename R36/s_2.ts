import { LangChain } from "langchain";

interface UserPreferences {
  goals: string[];
  equipment: string[];
  duration: number; // in minutes
}

// Define a cache to store generated workout plans
const workoutPlanCache: { [key: string]: string } = {};

// Define a function to validate user input
function validateUserInput(preferences: UserPreferences): boolean {
  // Check if goals and equipment are valid
  if (
    !preferences.goals.every((goal) =>
      ["weight loss", "muscle gain", "endurance"].includes(goal)
    )
  ) {
    return false;
  }

  if (
    !preferences.equipment.every((equipment) =>
      ["dumbbells", "barbell", "kettlebell"].includes(equipment)
    )
  ) {
    return false;
  }

  // Check if duration is within a valid range
  if (preferences.duration < 10 || preferences.duration > 120) {
    return false;
  }

  return true;
}

// Define a function to generate a specific prompt for each goal and equipment combination
function generatePrompt(preferences: UserPreferences): string {
  const goalPrompts: { [key: string]: string } = {
    "weight loss": "Create a weight loss workout plan",
    "muscle gain": "Create a muscle gain workout plan",
    endurance: "Create an endurance workout plan",
  };

  const equipmentPrompts: { [key: string]: string } = {
    dumbbells: "using dumbbells",
    barbell: "using a barbell",
    kettlebell: "using a kettlebell",
  };

  const goalPrompt = preferences.goals
    .map((goal) => goalPrompts[goal])
    .join(", ");
  const equipmentPrompt = preferences.equipment
    .map((equipment) => equipmentPrompts[equipment])
    .join(", ");

  return `${goalPrompt} ${equipmentPrompt} within ${preferences.duration} minutes.`;
}

// Define a function to post-process the generated workout plan
function postProcessWorkoutPlan(
  plan: string,
  preferences: UserPreferences
): string {
  // Filter out unsupported exercises
  const supportedExercises: { [key: string]: boolean } = {
    squats: true,
    deadlifts: true,
    benchPress: true,
  };

  const exercises = plan.split(", ");
  const filteredExercises = exercises.filter(
    (exercise) => supportedExercises[exercise]
  );

  return filteredExercises.join(", ");
}

function generateWorkoutPlan(preferences: UserPreferences): string {
  // Validate user input
  if (!validateUserInput(preferences)) {
    throw new Error("Invalid user input");
  }

  // Check if a cached workout plan exists
  const cacheKey = JSON.stringify(preferences);
  if (workoutPlanCache[cacheKey]) {
    return workoutPlanCache[cacheKey];
  }

  // Generate a specific prompt for the user's input
  const prompt = generatePrompt(preferences);

  // Generate the workout plan using LangChain
  const langChain = new LangChain();
  const response = langChain.generate(prompt);

  // Post-process the generated workout plan
  const postProcessedPlan = postProcessWorkoutPlan(response.text, preferences);

  // Cache the generated workout plan
  workoutPlanCache[cacheKey] = postProcessedPlan;

  return postProcessedPlan;
}
