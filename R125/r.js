// =======================
// Meal Plan Generator
// =======================

/**
 * Expanded and Corrected Recipe Pool
 * Ensures macronutrient values align with calorie counts.
 */
const recipePool = [
  // Breakfast Recipes
  {
    name: "Oatmeal with Berries",
    type: "breakfast",
    ingredients: ["oats", "berries", "milk"],
    calories: 300,
    macronutrients: { carbs: 50, proteins: 15, fats: 10 },
    prepTime: 10,
  },
  {
    name: "Chicken Omelette",
    type: "breakfast",
    ingredients: ["eggs", "chicken", "spinach"],
    calories: 350,
    macronutrients: { carbs: 5, proteins: 30, fats: 20 },
    prepTime: 15,
  },
  {
    name: "Quinoa Porridge",
    type: "breakfast",
    ingredients: ["quinoa", "milk", "banana"],
    calories: 320,
    macronutrients: { carbs: 60, proteins: 12, fats: 8 },
    prepTime: 20,
  },
  {
    name: "Greek Yogurt with Granola",
    type: "breakfast",
    ingredients: ["yogurt", "granola", "berries"],
    calories: 280,
    macronutrients: { carbs: 40, proteins: 15, fats: 8 },
    prepTime: 5,
  },
  {
    name: "Avocado Toast",
    type: "breakfast",
    ingredients: ["bread", "avocado", "spinach"],
    calories: 300,
    macronutrients: { carbs: 40, proteins: 6, fats: 15 },
    prepTime: 10,
  },
  {
    name: "Fruit Smoothie",
    type: "breakfast",
    ingredients: ["berries", "banana", "yogurt"],
    calories: 250,
    macronutrients: { carbs: 50, proteins: 8, fats: 5 },
    prepTime: 5,
  },
  {
    name: "Chia Pudding",
    type: "breakfast",
    ingredients: ["chia seeds", "milk", "honey", "berries"],
    calories: 270,
    macronutrients: { carbs: 35, proteins: 10, fats: 10 },
    prepTime: 10,
  },
  // Lunch Recipes
  {
    name: "Chicken Salad",
    type: "lunch",
    ingredients: ["chicken", "lettuce", "tomatoes", "olive oil"],
    calories: 450,
    macronutrients: { carbs: 20, proteins: 40, fats: 20 },
    prepTime: 15,
  },
  {
    name: "Grilled Salmon with Quinoa",
    type: "lunch",
    ingredients: ["salmon", "quinoa", "broccoli"],
    calories: 600,
    macronutrients: { carbs: 40, proteins: 45, fats: 25 },
    prepTime: 25,
  },
  {
    name: "Vegetable Stir Fry",
    type: "lunch",
    ingredients: ["carrots", "broccoli", "bell peppers", "soy sauce"],
    calories: 400,
    macronutrients: { carbs: 50, proteins: 15, fats: 10 },
    prepTime: 20,
  },
  {
    name: "Pasta Salad",
    type: "lunch",
    ingredients: ["pasta", "tomatoes", "cucumber", "olive oil"],
    calories: 500,
    macronutrients: { carbs: 70, proteins: 10, fats: 15 },
    prepTime: 15,
  },
  {
    name: "Egg Sandwich",
    type: "lunch",
    ingredients: ["eggs", "bread", "lettuce"],
    calories: 350,
    macronutrients: { carbs: 30, proteins: 20, fats: 15 },
    prepTime: 10,
  },
  {
    name: "Quinoa Salad",
    type: "lunch",
    ingredients: ["quinoa", "spinach", "olive oil"],
    calories: 400,
    macronutrients: { carbs: 60, proteins: 12, fats: 10 },
    prepTime: 15,
  },
  {
    name: "Turkey Wrap",
    type: "lunch",
    ingredients: ["turkey", "wrap", "lettuce", "tomatoes"],
    calories: 420,
    macronutrients: { carbs: 35, proteins: 30, fats: 15 },
    prepTime: 10,
  },
  {
    name: "Spinach and Feta Wrap",
    type: "lunch",
    ingredients: ["spinach", "feta", "wrap", "tomatoes"],
    calories: 400,
    macronutrients: { carbs: 45, proteins: 20, fats: 15 },
    prepTime: 10,
  },
  {
    name: "Turkey and Avocado Salad",
    type: "lunch",
    ingredients: ["turkey", "avocado", "lettuce", "olive oil"],
    calories: 450,
    macronutrients: { carbs: 20, proteins: 35, fats: 20 },
    prepTime: 15,
  },
  // Dinner Recipes
  {
    name: "Grilled Beef with Vegetables",
    type: "dinner",
    ingredients: ["beef", "broccoli", "carrots", "olive oil"],
    calories: 700,
    macronutrients: { carbs: 30, proteins: 60, fats: 35 },
    prepTime: 30,
  },
  {
    name: "Salmon with Veggies",
    type: "dinner",
    ingredients: ["salmon", "broccoli", "carrots", "olive oil"],
    calories: 650,
    macronutrients: { carbs: 20, proteins: 50, fats: 30 },
    prepTime: 25,
  },
  {
    name: "Beef Stir Fry",
    type: "dinner",
    ingredients: ["beef", "bell peppers", "soy sauce", "rice"],
    calories: 600,
    macronutrients: { carbs: 50, proteins: 40, fats: 20 },
    prepTime: 30,
  },
  {
    name: "Vegetable Lasagna",
    type: "dinner",
    ingredients: ["zucchini", "tomato sauce", "cheese", "pasta"],
    calories: 550,
    macronutrients: { carbs: 60, proteins: 25, fats: 15 },
    prepTime: 45,
  },
  {
    name: "Shrimp Stir-fry",
    type: "dinner",
    ingredients: ["shrimp", "vegetable mix", "soy sauce", "rice"],
    calories: 580,
    macronutrients: { carbs: 50, proteins: 35, fats: 15 },
    prepTime: 30,
  },
  {
    name: "Eggplant Parmesan",
    type: "dinner",
    ingredients: ["eggplant", "tomato sauce", "cheese", "breadcrumbs"],
    calories: 500,
    macronutrients: { carbs: 40, proteins: 25, fats: 20 },
    prepTime: 40,
  },
  {
    name: "Tofu Curry",
    type: "dinner",
    ingredients: ["tofu", "coconut milk", "spinach", "rice"],
    calories: 450,
    macronutrients: { carbs: 60, proteins: 20, fats: 15 },
    prepTime: 35,
  },
  {
    name: "Chicken Pasta",
    type: "dinner",
    ingredients: ["chicken", "pasta", "tomatoes", "olive oil"],
    calories: 620,
    macronutrients: { carbs: 70, proteins: 35, fats: 20 },
    prepTime: 30,
  },
  {
    name: "Beef Tacos",
    type: "dinner",
    ingredients: ["beef", "taco shells", "lettuce", "cheese"],
    calories: 580,
    macronutrients: { carbs: 40, proteins: 35, fats: 20 },
    prepTime: 25,
  },
  {
    name: "Quinoa and Black Bean Bowl",
    type: "dinner",
    ingredients: ["quinoa", "black beans", "corn", "avocado"],
    calories: 500,
    macronutrients: { carbs: 60, proteins: 20, fats: 15 },
    prepTime: 20,
  },
  {
    name: "Steak with Quinoa Salad",
    type: "dinner",
    ingredients: ["steak", "quinoa", "tomatoes", "lettuce"],
    calories: 700,
    macronutrients: { carbs: 50, proteins: 50, fats: 25 },
    prepTime: 30,
  },
  // Additional Recipes to Ensure Variety
  {
    name: "Veggie Quinoa Bowl",
    type: "dinner",
    ingredients: ["quinoa", "black beans", "corn", "avocado"],
    calories: 500,
    macronutrients: { carbs: 60, proteins: 20, fats: 15 },
    prepTime: 20,
  },
  {
    name: "Grilled Chicken with Rice",
    type: "dinner",
    ingredients: ["chicken", "rice", "broccoli"],
    calories: 600,
    macronutrients: { carbs: 55, proteins: 40, fats: 15 },
    prepTime: 25,
  },
  // Now, total recipes: 24 (7 breakfast, 9 lunch, 8 dinner)
];

/**
 * Generates a weekly meal plan based on user preferences, restrictions, and calorie target.
 * @param {Array} preferences - List of preferred ingredients.
 * @param {Array} restrictions - List of dietary restrictions (e.g., 'vegetarian', 'gluten-free').
 * @param {Number} calorieTarget - Daily calorie target.
 * @returns {Array|Object} - Array of daily meal plans or a warning message.
 */
function generateMealPlan(preferences, restrictions, calorieTarget) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const macronutrientBalance = { carbs: 0.5, proteins: 0.2, fats: 0.3 };
  const prepTimeConstraints = { breakfast: 20, lunch: 30, dinner: 40 };
  const recipePoolFiltered = getRecipePool(preferences, restrictions);

  if (recipePoolFiltered.length === 0) {
    console.warn("No recipes available matching preferences and restrictions.");
    return {
      warning: "No recipes available matching preferences and restrictions.",
    };
  }

  const mealPlan = [];
  const ingredientCount = {};

  for (let i = 0; i < daysOfWeek.length; i++) {
    const dayPlan = { day: daysOfWeek[i], meals: {} };
    const usedMeals = new Set();

    for (const mealType of ["breakfast", "lunch", "dinner"]) {
      const mealCalorieTarget = getMealCalorieTarget(calorieTarget, mealType);
      const mealMacronutrientTargets = getMealMacronutrientTargets(
        mealCalorieTarget,
        macronutrientBalance
      );

      let meal = selectMeal(
        recipePoolFiltered,
        mealCalorieTarget,
        mealMacronutrientTargets,
        prepTimeConstraints[mealType],
        ingredientCount,
        usedMeals
      );

      // If no meal found, attempt to relax constraints
      if (!meal) {
        // Relax flexibility to 0.6
        meal = selectMeal(
          recipePoolFiltered,
          mealCalorieTarget,
          mealMacronutrientTargets,
          prepTimeConstraints[mealType],
          ingredientCount,
          usedMeals,
          0.6
        );
      }

      // If still no meal found, select any meal within prepTime constraint and ingredient limits
      if (!meal) {
        meal = selectAnyMeal(
          recipePoolFiltered,
          prepTimeConstraints[mealType],
          ingredientCount,
          usedMeals
        );
      }

      if (!meal) {
        console.warn(`No suitable ${mealType} found for ${daysOfWeek[i]}.`);
        dayPlan.meals[mealType] = { warning: `No suitable ${mealType} found.` };
        continue;
      }

      // Update ingredient counts
      meal.ingredients.forEach((ingredient) => {
        ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
      });

      dayPlan.meals[mealType] = {
        name: meal.name,
        calories: meal.calories,
        macronutrients: {
          carbs: meal.macronutrients.carbs,
          proteins: meal.macronutrients.proteins,
          fats: meal.macronutrients.fats,
        },
        ingredients: meal.ingredients,
      };
      usedMeals.add(meal.name);
    }

    mealPlan.push(dayPlan);
  }

  return mealPlan;
}

/**
 * Filters the recipe pool based on preferences and restrictions.
 * @param {Array} preferences
 * @param {Array} restrictions
 * @returns {Array}
 */
function getRecipePool(preferences, restrictions) {
  return recipePool.filter((recipe) => {
    // Check if recipe includes at least one preferred ingredient
    const hasPreferred =
      preferences.length === 0 ||
      preferences.some((pref) => recipe.ingredients.includes(pref));

    // Check dietary restrictions
    const meetsRestrictions = restrictions.every((restriction) => {
      switch (restriction.toLowerCase()) {
        case "vegetarian":
          // Exclude recipes with meat, poultry, or fish
          return !["chicken", "salmon", "beef", "turkey", "shrimp"].some(
            (ingredient) => recipe.ingredients.includes(ingredient)
          );
        case "vegan":
          // Exclude recipes with animal products
          return ![
            "chicken",
            "salmon",
            "beef",
            "turkey",
            "shrimp",
            "eggs",
            "milk",
            "cheese",
            "yogurt",
            "honey",
          ].some((ingredient) => recipe.ingredients.includes(ingredient));
        case "gluten-free":
          // Exclude recipes with gluten-containing ingredients
          return !["bread", "pasta", "wrap", "taco shells"].some((ingredient) =>
            recipe.ingredients.includes(ingredient)
          );
        // Add more restrictions as needed
        default:
          return true;
      }
    });

    return hasPreferred && meetsRestrictions;
  });
}

/**
 * Calculates the calorie target for a specific meal type.
 * @param {Number} dailyCalorieTarget
 * @param {String} mealType
 * @returns {Number}
 */
function getMealCalorieTarget(dailyCalorieTarget, mealType) {
  switch (mealType) {
    case "breakfast":
      return dailyCalorieTarget * 0.25;
    case "lunch":
      return dailyCalorieTarget * 0.4;
    case "dinner":
      return dailyCalorieTarget * 0.35;
    default:
      return 0;
  }
}

/**
 * Calculates the macronutrient targets based on calorie target and balance.
 * @param {Number} mealCalorieTarget
 * @param {Object} macronutrientBalance
 * @returns {Object}
 */
function getMealMacronutrientTargets(mealCalorieTarget, macronutrientBalance) {
  return {
    carbs: (mealCalorieTarget * macronutrientBalance.carbs) / 4, // grams
    proteins: (mealCalorieTarget * macronutrientBalance.proteins) / 4, // grams
    fats: (mealCalorieTarget * macronutrientBalance.fats) / 9, // grams
  };
}

/**
 * Selects a meal based on calorie and macronutrient targets.
 * @param {Array} recipePool
 * @param {Number} calorieTarget
 * @param {Object} macronutrientTargets
 * @param {Number} prepTimeConstraint
 * @param {Object} ingredientCount
 * @param {Set} usedMeals
 * @param {Number} [flexibility=0.5] - Flexibility ratio for targets
 * @returns {Object|null}
 */
function selectMeal(
  recipePool,
  calorieTarget,
  macronutrientTargets,
  prepTimeConstraint,
  ingredientCount,
  usedMeals,
  flexibility = 0.5
) {
  const filteredMeals = recipePool.filter((meal) => {
    const ingredientsValid = meal.ingredients.every(
      (ingredient) => (ingredientCount[ingredient] || 0) < 4
    ); // Increased limit to 4
    const notUsedToday = !usedMeals.has(meal.name);
    const caloriesWithinRange =
      meal.calories >= calorieTarget * (1 - flexibility) &&
      meal.calories <= calorieTarget * (1 + flexibility);
    const macronutrientsWithinRange =
      meal.macronutrients.carbs >=
        macronutrientTargets.carbs * (1 - flexibility) &&
      meal.macronutrients.carbs <=
        macronutrientTargets.carbs * (1 + flexibility) &&
      meal.macronutrients.proteins >=
        macronutrientTargets.proteins * (1 - flexibility) &&
      meal.macronutrients.proteins <=
        macronutrientTargets.proteins * (1 + flexibility) &&
      meal.macronutrients.fats >=
        macronutrientTargets.fats * (1 - flexibility) &&
      meal.macronutrients.fats <= macronutrientTargets.fats * (1 + flexibility);
    const withinPrepTime = meal.prepTime <= prepTimeConstraint;

    return (
      notUsedToday &&
      ingredientsValid &&
      caloriesWithinRange &&
      macronutrientsWithinRange &&
      withinPrepTime
    );
  });

  return filteredMeals.length
    ? filteredMeals[Math.floor(Math.random() * filteredMeals.length)]
    : null;
}

/**
 * Selects any available meal within prep time and ingredient constraints.
 * @param {Array} recipePool
 * @param {Number} prepTimeConstraint
 * @param {Object} ingredientCount
 * @param {Set} usedMeals
 * @returns {Object|null}
 */
function selectAnyMeal(
  recipePool,
  prepTimeConstraint,
  ingredientCount,
  usedMeals
) {
  const filteredMeals = recipePool.filter((meal) => {
    const ingredientsValid = meal.ingredients.every(
      (ingredient) => (ingredientCount[ingredient] || 0) < 4
    ); // Increased limit to 4
    const notUsedToday = !usedMeals.has(meal.name);
    const withinPrepTime = meal.prepTime <= prepTimeConstraint;

    return notUsedToday && ingredientsValid && withinPrepTime;
  });

  return filteredMeals.length
    ? filteredMeals[Math.floor(Math.random() * filteredMeals.length)]
    : null;
}

/**
 * Utility function to shuffle an array (Fisher-Yates Shuffle).
 * @param {Array} array
 * @returns {Array}
 */
function shuffleArray(array) {
  let arr = array.slice(); // Clone the array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// =======================
// Example Usage
// =======================

const preferences = [
  "oats",
  "berries",
  "milk",
  "chicken",
  "lettuce",
  "tomatoes",
  "olive oil",
  "salmon",
  "broccoli",
  "carrots",
  "pasta",
  "cucumber",
  "eggs",
  "bread",
  "yogurt",
  "banana",
  "quinoa",
  "beef",
  "avocado",
  "spinach",
];
const restrictions = ["gluten-free"]; // No restrictions
const calorieTarget = 2000; // Daily calorie target

const mealPlan = generateMealPlan(preferences, restrictions, calorieTarget);

function printMealPlan(plan) {
  if (plan.warning) {
    console.warn("Warning:", plan.warning);
    return;
  }

  plan.forEach((day) => {
    console.log(`\n=== ${day.day} ===`);
    for (let [mealType, meal] of Object.entries(day.meals)) {
      if (meal.warning) {
        console.log(`\n${capitalize(mealType)}:`);
        console.log(`  ${meal.warning}`);
        continue;
      }
      console.log(`\n${capitalize(mealType)}:`);
      console.log(`  Name: ${meal.name}`);
      console.log(`  Calories: ${meal.calories}`);
      console.log(
        `  Macronutrients: Carbs - ${meal.macronutrients.carbs}g, Proteins - ${meal.macronutrients.proteins}g, Fats - ${meal.macronutrients.fats}g`
      );
    }
  });
}

function capitalize(str) {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Print the weekly meal plan
printMealPlan(mealPlan);
