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
 * @returns {Object[]} List of recommended workout exercises with durations.
 */
function generateWorkoutPlan(
  userProfile,
  availableEquipment,
  preferredWorkoutLength
) {
  // Initialize an empty workout plan
  const workoutPlan = [];

  // Define a list of exercises with their durations and equipment requirements
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
    {
      name: "Resistance Band Chest Press",
      duration: 30,
      equipment: "resistance bands",
      type: "strength",
    },
    { name: "Push-ups", duration: 30, equipment: "none", type: "strength" },
    // Flexibility exercises
    {
      name: "Downward-facing Dog",
      duration: 30,
      equipment: "none",
      type: "flexibility",
    },
    {
      name: "Warrior Pose",
      duration: 30,
      equipment: "none",
      type: "flexibility",
    },
    {
      name: "Seated Forward Fold",
      duration: 30,
      equipment: "none",
      type: "flexibility",
    },
    // Yoga exercises
    { name: "Mountain Pose", duration: 30, equipment: "none", type: "yoga" },
    { name: "Tree Pose", duration: 30, equipment: "none", type: "yoga" },
    { name: "Child's Pose", duration: 30, equipment: "none", type: "yoga" },
    // Weightlifting exercises
    {
      name: "Dumbbell Deadlifts",
      duration: 30,
      equipment: "dumbbells",
      type: "weightlifting",
    },
    {
      name: "Resistance Band Rows",
      duration: 30,
      equipment: "resistance bands",
      type: "weightlifting",
    },
    {
      name: "Bicep Curls",
      duration: 30,
      equipment: "dumbbells",
      type: "weightlifting",
    },
  ];

  // Filter exercises based on user's preferences and available equipment
  const filteredExercises = exercises.filter((exercise) => {
    // Check if the exercise type matches the user's preferences
    const typeMatch = userProfile.preferences.includes(exercise.type);
    // Check if the exercise equipment is available
    const equipmentMatch =
      availableEquipment.includes(exercise.equipment) ||
      exercise.equipment === "none";
    return typeMatch && equipmentMatch;
  });

  // Prioritize exercises based on user's primary goal
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
  let totalDuration = 0;
  while (
    totalDuration < preferredWorkoutLength &&
    filteredExercises.length > 0
  ) {
    const exercise = filteredExercises.shift();
    workoutPlan.push(exercise);
    totalDuration += exercise.duration;
  }

  return workoutPlan;
}

// Example usage:
const userProfile = {
  fitnessLevel: "intermediate",
  primaryGoal: "weight loss",
  preferences: ["cardio", "strength"],
};

const availableEquipment = ["dumbbells", "none"];

const preferredWorkoutLength = 30;

const workoutPlan = generateWorkoutPlan(
  userProfile,
  availableEquipment,
  preferredWorkoutLength
);
console.log(workoutPlan);
