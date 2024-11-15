const readline = require("readline");

/**
 * Checks if the user has all required ingredients and prompts for substitutions if necessary.
 *
 * @param {string[]} recipeIngredients The ingredients required by the recipe.
 * @param {string[]} availableIngredients The ingredients the user has.
 * @param {Object} substitutions An object where the keys are ingredients and the values are their substitutions.
 */
function checkIngredients(
  recipeIngredients,
  availableIngredients,
  substitutions
) {
  // Check if recipeIngredients is not an array
  if (!Array.isArray(recipeIngredients)) {
    console.error("Recipe ingredients must be an array.");
    return;
  }

  // Check if availableIngredients is not an array
  if (!Array.isArray(availableIngredients)) {
    console.error("Available ingredients must be an array.");
    return;
  }

  // Check if substitutions is not an object
  if (typeof substitutions !== "object" || substitutions === null) {
    console.error("Substitutions must be an object.");
    return;
  }

  // Remove duplicates from the recipe ingredients and available ingredients
  const uniqueRecipeIngredients = [...new Set(recipeIngredients)];
  const uniqueAvailableIngredients = [...new Set(availableIngredients)];

  // If the recipe list is empty, print success
  if (uniqueRecipeIngredients.length === 0) {
    console.log("Yes, you can go ahead with the recipe.");
    return;
  }

  // Find the missing ingredients
  const missingIngredients = uniqueRecipeIngredients.filter(
    (ingredient) => !uniqueAvailableIngredients.includes(ingredient)
  );

  // If there are no missing ingredients, print success
  if (missingIngredients.length === 0) {
    console.log("Yes, you can go ahead with the recipe.");
    return;
  }

  // Create a readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Function to ask the user if they'd like to use a substitute
  function askForSubstitution(ingredient, callback) {
    // Check if the ingredient has a substitution
    if (!substitutions[ingredient]) {
      console.log(`No substitution available for ${ingredient}.`);
      callback(false);
      return;
    }

    // Ask the user if they'd like to use the substitution
    rl.question(
      `You are missing ${ingredient}. Would you like to use ${substitutions[ingredient]} as a substitute? (Y/N): `,
      (answer) => {
        // Check if the user's answer is valid
        if (answer.toUpperCase() !== "Y" && answer.toUpperCase() !== "N") {
          console.log("Invalid input. Please enter Y or N.");
          askForSubstitution(ingredient, callback);
          return;
        }

        // Call the callback with the user's answer
        callback(answer.toUpperCase() === "Y");
      }
    );
  }

  // Ask the user about each missing ingredient
  let index = 0;
  function askAboutNextIngredient() {
    if (index >= missingIngredients.length) {
      // If all missing ingredients have been asked about, close the readline interface and print the result
      rl.close();
      if (
        missingIngredients.every(
          (ingredient) => substitutions[ingredient] !== undefined
        )
      ) {
        console.log("Yes, you can go ahead with the recipe.");
      } else {
        console.log("Please get all ingredients before starting.");
      }
      return;
    }

    askForSubstitution(missingIngredients[index], (useSubstitution) => {
      if (!useSubstitution) {
        // If the user doesn't want to use a substitution, print a message and stop asking about ingredients
        console.log("Please get all ingredients before starting.");
        rl.close();
        return;
      }

      // Ask about the next ingredient
      index++;
      askAboutNextIngredient();
    });
  }

  askAboutNextIngredient();
}

// Example usage:
const recipeIngredients = ["flour", "eggs", "sugar", "flour"];
const availableIngredients = ["flour", "eggs"];
const substitutions = {
  sugar: "honey",
};

checkIngredients(recipeIngredients, availableIngredients, substitutions);
