const readline = require("readline");

/**
 * Checks if the user has all required ingredients and prompts for substitutions if necessary.
 *
 * @param {string[]} recipeIngredients The ingredients required by the recipe.
 * @param {string[]} availableIngredients The ingredients available to the user.
 * @param {Object} substitutions An object containing ingredient substitutions.
 * @returns {Promise<void>}
 */
async function checkIngredients(
  recipeIngredients,
  availableIngredients,
  substitutions
) {
  // Check if recipeIngredients is an array and contains only strings
  if (
    !Array.isArray(recipeIngredients) ||
    !recipeIngredients.every((item) => typeof item === "string")
  ) {
    throw new Error(
      "Invalid input: recipeIngredients must be an array of strings."
    );
  }

  // Check if availableIngredients is an array and contains only strings
  if (
    !Array.isArray(availableIngredients) ||
    !availableIngredients.every((item) => typeof item === "string")
  ) {
    throw new Error(
      "Invalid input: availableIngredients must be an array of strings."
    );
  }

  // Check if substitutions is a valid object
  if (typeof substitutions !== "object" || substitutions === null) {
    throw new Error("Invalid input: substitutions must be an object.");
  }

  // Remove duplicates from recipeIngredients and availableIngredients
  const uniqueRecipeIngredients = [...new Set(recipeIngredients)];
  const uniqueAvailableIngredients = [...new Set(availableIngredients)];

  // Create a readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Function to ask the user for substitution
  const askForSubstitution = async (ingredient) => {
    return new Promise((resolve) => {
      rl.question(
        `You are missing ${ingredient}. Would you like to use a substitute? (Y/N): `,
        (answer) => {
          // Validate the answer (Y/N)
          const validAnswers = ["Y", "N"];
          if (!validAnswers.includes(answer.toUpperCase())) {
            console.log('Invalid input. Please enter "Y" or "N".');
            resolve(askForSubstitution(ingredient)); // Ask again
          } else {
            resolve(answer.toUpperCase());
          }
        }
      );
    });
  };

  // Handle case when recipeIngredients is empty (Success scenario)
  if (uniqueRecipeIngredients.length === 0) {
    console.log("No ingredients required. You can go ahead with the recipe!");
    rl.close();
    return;
  }

  // Handle case when availableIngredients is empty (Error scenario)
  if (uniqueAvailableIngredients.length === 0) {
    console.log(
      "Your available ingredients list is empty. Please get all ingredients before starting."
    );
    rl.close();
    return;
  }

  // Normalize ingredient names (case insensitive)
  const normalizedAvailableIngredients = uniqueAvailableIngredients.map(
    (ingredient) => ingredient.toLowerCase()
  );
  const normalizedRecipeIngredients = uniqueRecipeIngredients.map(
    (ingredient) => ingredient.toLowerCase()
  );

  // Check for missing ingredients
  const missingIngredients = uniqueRecipeIngredients.filter(
    (ingredient) =>
      !normalizedAvailableIngredients.includes(ingredient.toLowerCase())
  );

  // If no ingredients are missing, proceed
  if (missingIngredients.length === 0) {
    console.log("You have all the ingredients! Go ahead with the recipe.");
    rl.close();
    return;
  }

  // Ask the user for substitutions for each missing ingredient
  for (const ingredient of missingIngredients) {
    const originalIngredient =
      recipeIngredients[uniqueRecipeIngredients.indexOf(ingredient)];

    // Check if substitution is available
    const substitution = substitutions[ingredient.toLowerCase()];
    if (!substitution) {
      console.log(
        `No substitution available for ${originalIngredient}. Please get all ingredients before starting.`
      );
      rl.close();
      return;
    }

    // Prompt user for substitution
    const answer = await askForSubstitution(originalIngredient);
    if (answer === "Y") {
      console.log(
        `Yes, you can go ahead with the recipe using ${substitution} as a substitute for ${originalIngredient}.`
      );
    } else {
      console.log("Please get all ingredients before starting.");
      rl.close();
      return;
    }
  }

  console.log("Yes, you can go ahead with the recipe.");
  rl.close();
}

// Example usage:
const recipeIngredients = ["flour", "sugar", "eggs", "milk", "eggs"];
const availableIngredients = [];
const substitutions = {
  eggs: "egg substitute",
  milk: "almond milk",
};

// Run the function
checkIngredients(recipeIngredients, availableIngredients, substitutions).catch(
  (error) => {
    console.error("Error occurred:", error.message);
  }
);
