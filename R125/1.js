// Define a class to represent a Meal
class Meal {
  constructor(name, calories, carbs, proteins, fats, ingredients, prepTime) {
    this.name = name;
    this.calories = calories;
    this.carbs = carbs;
    this.proteins = proteins;
    this.fats = fats;
    this.ingredients = ingredients;
    this.prepTime = prepTime;
  }
}

// Define a function to generate a meal plan
function generateMealPlan(preferences, restrictions, calorieTarget) {
  // Define a pool of recipes
  const recipes = [
    new Meal("Omelette", 250, 20, 15, 10, ["eggs", "milk", "salt"], 15),
    new Meal(
      "Avocado Toast",
      350,
      30,
      10,
      20,
      ["avocado", "bread", "salt"],
      10
    ),
    new Meal(
      "Grilled Chicken",
      400,
      10,
      35,
      20,
      ["chicken", "salt", "pepper"],
      20
    ),
    new Meal("Salad", 150, 10, 10, 10, ["lettuce", "tomato", "cucumber"], 15),
    new Meal(
      "Quinoa Bowl",
      500,
      40,
      20,
      20,
      ["quinoa", "vegetables", "salt"],
      25
    ),
    new Meal("Smoothie", 200, 30, 15, 10, ["fruits", "milk", "honey"], 10),
    new Meal("Grilled Fish", 300, 10, 30, 15, ["fish", "salt", "pepper"], 20),
    new Meal(
      "Tofu Stir Fry",
      350,
      20,
      25,
      15,
      ["tofu", "vegetables", "oil"],
      20
    ),
    new Meal(
      "Breakfast Burrito",
      400,
      30,
      20,
      20,
      ["eggs", "tortilla", "cheese"],
      15
    ),
    new Meal(
      "Lentil Soup",
      450,
      40,
      25,
      20,
      ["lentils", "vegetables", "broth"],
      30
    ),
    // Add more recipes to the pool...
  ];

  // Filter recipes based on preferences and restrictions
  const filteredRecipes = recipes.filter((recipe) => {
    // Check if the recipe contains any preferred ingredients
    const hasPreferredIngredient = preferences.some((preference) =>
      recipe.ingredients.includes(preference)
    );
    // Check if the recipe meets the dietary restrictions
    const meetsRestrictions = restrictions.every(
      (restriction) => !recipe.ingredients.includes(restriction)
    );
    return hasPreferredIngredient && meetsRestrictions;
  });

  // Initialize the meal plan
  const mealPlan = {
    Monday: { breakfast: null, lunch: null, dinner: null },
    Tuesday: { breakfast: null, lunch: null, dinner: null },
    Wednesday: { breakfast: null, lunch: null, dinner: null },
    Thursday: { breakfast: null, lunch: null, dinner: null },
    Friday: { breakfast: null, lunch: null, dinner: null },
    Saturday: { breakfast: null, lunch: null, dinner: null },
    Sunday: { breakfast: null, lunch: null, dinner: null },
  };

  // Function to check if a meal can be added to the plan
  function canAddMeal(meal, day) {
    // Check if the meal has already been added to the day
    if (
      mealPlan[day].breakfast === meal ||
      mealPlan[day].lunch === meal ||
      mealPlan[day].dinner === meal
    ) {
      return false;
    }
    // Check if any ingredient appears in more than two meals throughout the week
    const ingredientCount = {};
    Object.values(mealPlan).forEach((dayMeals) => {
      Object.values(dayMeals).forEach((dayMeal) => {
        if (dayMeal) {
          dayMeal.ingredients.forEach((ingredient) => {
            ingredientCount[ingredient] =
              (ingredientCount[ingredient] || 0) + 1;
          });
        }
      });
    });
    return !meal.ingredients.some(
      (ingredient) => ingredientCount[ingredient] >= 2
    );
  }

  // Function to add a meal to the plan
  function addMeal(meal, day, mealType) {
    mealPlan[day][mealType] = meal;
  }

  // Generate the meal plan
  Object.keys(mealPlan).forEach((day) => {
    const dailyCalorieTarget = calorieTarget;
    const breakfastCalorieTarget = dailyCalorieTarget * 0.25;
    const lunchCalorieTarget = dailyCalorieTarget * 0.4;
    const dinnerCalorieTarget = dailyCalorieTarget * 0.35;

    // Select breakfast meal
    const breakfastOptions = filteredRecipes.filter(
      (recipe) =>
        recipe.calories <= breakfastCalorieTarget && recipe.prepTime <= 20
    );
    const breakfastMeal =
      breakfastOptions[Math.floor(Math.random() * breakfastOptions.length)];
    if (canAddMeal(breakfastMeal, day)) {
      addMeal(breakfastMeal, day, "breakfast");
    }

    // Select lunch meal
    const lunchOptions = filteredRecipes.filter(
      (recipe) => recipe.calories <= lunchCalorieTarget && recipe.prepTime <= 30
    );
    const lunchMeal =
      lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
    if (canAddMeal(lunchMeal, day)) {
      addMeal(lunchMeal, day, "lunch");
    }

    // Select dinner meal
    const dinnerOptions = filteredRecipes.filter(
      (recipe) =>
        recipe.calories <= dinnerCalorieTarget && recipe.prepTime <= 40
    );
    const dinnerMeal =
      dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
    if (canAddMeal(dinnerMeal, day)) {
      addMeal(dinnerMeal, day, "dinner");
    }
  });

  // Check if the meal plan meets all requirements
  const meetsRequirements = Object.values(mealPlan).every((dayMeals) => {
    return Object.values(dayMeals).every((meal) => meal !== null);
  });

  if (!meetsRequirements) {
    console.warn("No combination of meals meets all requirements.");
  }

  // Display the meal plan
  console.log("Meal Plan:");
  Object.keys(mealPlan).forEach((day) => {
    console.log(`**${day}**`);
    Object.keys(mealPlan[day]).forEach((mealType) => {
      const meal = mealPlan[day][mealType];
      if (meal) {
        console.log(
          `${mealType}: ${meal.name} - ${meal.calories} calories, ${meal.carbs}g carbs, ${meal.proteins}g proteins, ${meal.fats}g fats`
        );
      } else {
        console.log(`${mealType}: No meal assigned`);
      }
    });
  });
}

// Example usage
const preferences = ["eggs", "avocado", "chicken"];
const restrictions = ["gluten", "fish"];
const calorieTarget = 2000;
generateMealPlan(preferences, restrictions, calorieTarget);
