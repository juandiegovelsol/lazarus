/**
 * Generates a personalized workout plan based on the user's profile, available equipment, and preferred workout length.
 *
 * @param {Object} userProfile - User's profile information.
 * @param {string} userProfile.fitnessLevel - User's fitness level (beginner, intermediate, advanced).
 * @param {string} userProfile.primaryGoal - User's primary fitness goal (strength, weight loss, flexibility).
 * @param {string[]} userProfile.preferences - User's specific workout preferences (cardio, yoga, weightlifting).
 * @param {string[]} availableEquipment - List of equipment the user has access to.
 * @param {number} preferredWorkoutLength - Preferred workout length in minutes.
 *
 * @returns {Object[]} A list of recommended workout exercises with durations.
 */
function generateWorkoutPlan(
  userProfile,
  availableEquipment,
  preferredWorkoutLength
) {
  // Initialize an empty workout plan
  let workoutPlan = [];

  // Define a list of exercises with their durations and required equipment
  const exercises = [
    // Cardio exercises
    { name: "Jumping Jacks", duration: 30, equipment: "none", type: "cardio" },
    {
      name: "Running in place",
      duration: 30,
      equipment: "none",
      type: "cardio",
    },
    { name: "Burpees", duration: 30, equipment: "none", type: "cardio" },
    // Strength exercises
    {
      name: "Dumbbell Squats",
      duration: 30,
      equipment: "dumbbells",
      type: "strength",
    },
    { name: "Push-ups", duration: 30, equipment: "none", type: "strength" },
    { name: "Lunges", duration: 30, equipment: "none", type: "strength" },
    // Flexibility exercises
    {
      name: "Downward-facing dog",
      duration: 30,
      equipment: "none",
      type: "flexibility",
    },
    {
      name: "Warrior pose",
      duration: 30,
      equipment: "none",
      type: "flexibility",
    },
    {
      name: "Seated forward bend",
      duration: 30,
      equipment: "none",
      type: "flexibility",
    },
    // Yoga exercises
    { name: "Plank pose", duration: 30, equipment: "none", type: "yoga" },
    { name: "Tree pose", duration: 30, equipment: "none", type: "yoga" },
    { name: "Seated twist", duration: 30, equipment: "none", type: "yoga" },
    // Weightlifting exercises
    {
      name: "Dumbbell deadlifts",
      duration: 30,
      equipment: "dumbbells",
      type: "weightlifting",
    },
    {
      name: "Bicep curls",
      duration: 30,
      equipment: "dumbbells",
      type: "weightlifting",
    },
    {
      name: "Tricep dips",
      duration: 30,
      equipment: "none",
      type: "weightlifting",
    },
  ];

  // Filter exercises based on the user's preferences and available equipment
  let filteredExercises = exercises.filter((exercise) => {
    // Check if the exercise type matches the user's preferences
    if (userProfile.preferences.includes(exercise.type)) {
      // Check if the exercise requires equipment that the user has access to
      if (
        exercise.equipment === "none" ||
        availableEquipment.includes(exercise.equipment)
      ) {
        return true;
      }
    }
    return false;
  });

  // Prioritize exercises based on the user's primary goal
  if (userProfile.primaryGoal === "weight loss") {
    // Prioritize cardio exercises for weight loss
    filteredExercises.sort((a, b) => (a.type === "cardio" ? -1 : 1));
  } else if (userProfile.primaryGoal === "strength") {
    // Prioritize strength exercises for strength gain
    filteredExercises.sort((a, b) => (a.type === "strength" ? -1 : 1));
  } else if (userProfile.primaryGoal === "flexibility") {
    // Prioritize flexibility exercises for flexibility gain
    filteredExercises.sort((a, b) => (a.type === "flexibility" ? -1 : 1));
  }

  // Add exercises to the workout plan until the preferred workout length is reached
  let totalTime = 0;
  for (let exercise of filteredExercises) {
    if (totalTime + exercise.duration <= preferredWorkoutLength) {
      workoutPlan.push(exercise);
      totalTime += exercise.duration;
    } else {
      break;
    }
  }

  return workoutPlan;
}

// Example usage:
let userProfile = {
  fitnessLevel: "intermediate",
  primaryGoal: "weight loss",
  preferences: ["cardio", "strength"],
};
let availableEquipment = ["dumbbells"];
let preferredWorkoutLength = 30;

let workoutPlan = generateWorkoutPlan(
  userProfile,
  availableEquipment,
  preferredWorkoutLength
);
console.log(workoutPlan);
