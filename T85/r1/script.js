const gameContainer = document.getElementById("game-container");
const snake = document.getElementById("snake");
const food = document.getElementById("food");
const scoreSpan = document.getElementById("score");
const difficultyLevelSelect = document.getElementById("difficulty-level");

let x = Math.floor(Math.random() * 19) * 20;
let y = Math.floor(Math.random() * 19) * 20;
let dx = 20; // Horizontal move step
let dy = 0; // Vertical move step
let score = 0;
let difficultyLevel = 1;
let snakeBody = [{ x, y }];
let gameIntervalId;
let isGameRunning = true;
let lastTurnTime = performance.now(); // Track the last time the snake turned
let turnDelay = 100; // Delay in milliseconds before allowing another turn
let isSelectModified = false; // Flag to track whether the select has been modified

// Set snake initial random position
snake.style.left = `${x}px`;
snake.style.top = `${y}px`;

// Function to generate random food position
function randomFoodPosition() {
  const foodX = Math.floor(Math.random() * 20) * 20;
  const foodY = Math.floor(Math.random() * 20) * 20;
  food.style.left = `${foodX}px`;
  food.style.top = `${foodY}px`;
}

// Check if the snake eats the food
function checkFoodCollision() {
  if (x === parseInt(food.style.left) && y === parseInt(food.style.top)) {
    score += 10 + difficultyLevel;
    scoreSpan.textContent = `Score: ${score}`;
    snakeBody.push({ x, y });
    randomFoodPosition(); // Generate new food position
    if (score >= 100) {
      alert("You won!");
      isGameRunning = false;
      clearInterval(gameIntervalId);
    }
  }
}

// Function to move the snake
function moveSnake() {
  if (!isGameRunning) return;

  x += dx;
  y += dy;

  // Keep snake within bounds
  if (x >= 400) x = 0;
  if (x < 0) x = 380;
  if (y >= 400) y = 0;
  if (y < 0) y = 380;

  // Check for collision with itself
  for (let i = 0; i < snakeBody.length - 1; i++) {
    if (x === snakeBody[i].x && y === snakeBody[i].y) {
      alert("You lost!");
      isGameRunning = false;
      clearInterval(gameIntervalId);
      return;
    }
  }

  snakeBody.push({ x, y });
  if (snakeBody.length > score / (10 + difficultyLevel) + 1) {
    snakeBody.shift();
  }

  // Apply new position
  let snakeHtml = "";
  snakeBody.forEach((bodyPart, index) => {
    snakeHtml += `<div style="position: absolute; width: 20px; height: 20px; background-color: #76c7c0; border-radius: 3px; left: ${bodyPart.x}px; top: ${bodyPart.y}px;"></div>`;
  });
  gameContainer.innerHTML =
    snakeHtml +
    `<div id="food" style="position: absolute; width: 20px; height: 20px; background-color: #f05454; border-radius: 50%; left: ${food.style.left}; top: ${food.style.top};"></div>`;

  // Check for collision with food
  checkFoodCollision();
}

// Listen to keyboard for snake movement
window.addEventListener("keydown", (event) => {
  // If the select has been modified, prevent arrow keys from modifying it
  if (isSelectModified && event.key.startsWith("Arrow")) {
    event.preventDefault();
  }

  if (!isGameRunning || performance.now() - lastTurnTime < turnDelay) return;
  lastTurnTime = performance.now();

  // Prevent changing direction 180 degrees
  const currentDirection = { dx, dy };
  const newDirection = {
    ArrowUp: { dx: 0, dy: -20 },
    ArrowDown: { dx: 0, dy: 20 },
    ArrowLeft: { dx: -20, dy: 0 },
    ArrowRight: { dx: 20, dy: 0 },
  }[event.key];

  if (
    newDirection &&
    !(
      currentDirection.dx === -newDirection.dx &&
      currentDirection.dy === -newDirection.dy
    )
  ) {
    dx = newDirection.dx;
    dy = newDirection.dy;
  }
});

// Difficulty level change
difficultyLevelSelect.addEventListener("change", (event) => {
  isSelectModified = true; // Set flag to prevent arrow keys from modifying the select
  difficultyLevel = parseInt(event.target.value);
  clearInterval(gameIntervalId);
  gameIntervalId = setInterval(moveSnake, 100 - (difficultyLevel - 1) * 10);
  turnDelay = 100 - (difficultyLevel - 1) * 10;
});

// Initialize food at a random position
randomFoodPosition();

// Update snake movement every calculated milliseconds
gameIntervalId = setInterval(moveSnake, 100 - (difficultyLevel - 1) * 10);
