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
  // Check if recipeIngredients is null or undefined
  if (!recipeIngredients) {
    throw new Error("Recipe ingredients list is null or undefined.");
  }

  // Check if availableIngredients is null or undefined
  if (!availableIngredients) {
    throw new Error("Available ingredients list is null or undefined.");
  }

  // Check if substitutions is null or undefined
  if (!substitutions) {
    throw new Error("Substitutions object is null or undefined.");
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
          // Check if the answer is valid
          if (answer.toUpperCase() !== "Y" && answer.toUpperCase() !== "N") {
            console.log("Invalid input. Please enter Y or N.");
            resolve(askForSubstitution(ingredient));
          } else {
            resolve(answer.toUpperCase());
          }
        }
      );
    });
  };

  // Check if the user has all required ingredients
  const missingIngredients = uniqueRecipeIngredients.filter(
    (ingredient) => !uniqueAvailableIngredients.includes(ingredient)
  );

  if (missingIngredients.length === 0) {
    console.log("Yes, you can go ahead with the recipe.");
    rl.close();
    return;
  }

  // Ask the user for substitutions for each missing ingredient
  for (const ingredient of missingIngredients) {
    const substitution = substitutions[ingredient];
    if (!substitution) {
      console.log(`No substitution available for ${ingredient}.`);
      console.log("Please get all ingredients before starting.");
      rl.close();
      return;
    }

    const answer = await askForSubstitution(ingredient);
    if (answer === "Y") {
      console.log(`Using ${substitution} as a substitute for ${ingredient}.`);
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
const recipeIngredients = ["flour", "sugar", "eggs", "milk"];
const availableIngredients = ["flour", "sugar"];
const substitutions = {};

checkIngredients(recipeIngredients, availableIngredients, substitutions).catch(
  (error) => {
    console.error(error);
  }
);
