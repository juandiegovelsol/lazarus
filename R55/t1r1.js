// Police & Thief Game

// Get elements
const car = document.getElementById("car");
const startButton = document.getElementById("startButton");
const message = document.getElementById("message");

// Game settings
const speed = 2; // Speed of the car
const intervalDelay = 20; // Interval delay in milliseconds

// Game state
let intervalId = null;
let mouseX = 0;
let mouseY = 0;

// Logger
const logger = {
  log: (message) => console.log(`INFO: ${message}`),
  warn: (message) => console.warn(`WARNING: ${message}`),
  error: (message) => console.error(`ERROR: ${message}`),
};

// Move the car towards the mouse cursor
function moveCar() {
  try {
    const carRect = car.getBoundingClientRect();
    const carX = carRect.left + carRect.width / 2;
    const carY = carRect.top + carRect.height / 2;

    // Calculate the direction to the mouse cursor
    const deltaX = mouseX - carX;
    const deltaY = mouseY - carY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Move the car towards the mouse cursor if it is not at the target
    if (distance > speed) {
      const moveX = (deltaX / distance) * speed;
      const moveY = (deltaY / distance) * speed;

      // Update the car's position using transform
      car.style.transform = `translate(${carX + moveX - 50}px, ${
        carY + moveY - 10
      }px)`;
    }

    // Check for collision
    if (checkCollision(carRect)) {
      resetCar();
      displayCaughtMessage();
    }
  } catch (error) {
    logger.error(`Error moving car: ${error.message}`);
  }
  logger.log("Car moved");
}

// Check for collision with the mouse position
function checkCollision(carRect) {
  try {
    return (
      carRect.left < mouseX &&
      carRect.right > mouseX &&
      carRect.top < mouseY &&
      carRect.bottom > mouseY
    );
  } catch (error) {
    logger.error(`Error checking collision: ${error.message}`);
  }
  logger.log("Collision checked");
}

// Reset the car's position to the starting point
function resetCar() {
  try {
    car.style.transform = "translate(0, 0)";
  } catch (error) {
    logger.error(`Error resetting car: ${error.message}`);
  }
  logger.log("Car reset");
}

// Display the caught message
function displayCaughtMessage() {
  try {
    message.textContent = "YOU GOT CAUGHT!";
    message.style.display = "block";
    clearInterval(intervalId);
  } catch (error) {
    logger.error(`Error displaying caught message: ${error.message}`);
  }
  logger.log("Caught message displayed");
}

// Start the game
startButton.addEventListener("click", () => {
  try {
    resetCar();
    message.style.display = "none";
    intervalId = setInterval(moveCar, intervalDelay);
  } catch (error) {
    logger.error(`Error starting game: ${error.message}`);
  }
  logger.log("Game started");
});

// Update mouse position on mousemove
document.addEventListener("mousemove", (event) => {
  try {
    mouseX = event.clientX;
    mouseY = event.clientY;
  } catch (error) {
    logger.error(`Error updating mouse position: ${error.message}`);
  }
  logger.log("Mouse position updated");
});
