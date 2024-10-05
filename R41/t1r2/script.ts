// Get the canvas element
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Define the snake and food objects
let snake: { x: number; y: number }[] = [
  { x: canvas.width / 2, y: canvas.height / 2 },
  { x: canvas.width / 2 - 10, y: canvas.height / 2 },
  { x: canvas.width / 2 - 20, y: canvas.height / 2 },
];

let food: { x: number; y: number } = {
  x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
  y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
};

// Define the score and direction variables
let score = 0;
let direction: "UP" | "DOWN" | "LEFT" | "RIGHT" = "RIGHT";

// Define the difficulty levels and speed
let speed = 100;
const difficultyLevels = [
  { label: "Easy", speed: 150 },
  { label: "Medium", speed: 100 },
  { label: "Hard", speed: 50 },
];

// Create the difficulty level buttons
const difficultyButtons = difficultyLevels.map((level) => {
  const button = document.createElement("button");
  button.textContent = level.label;
  button.onclick = () => {
    speed = level.speed;
    startGame();
  };
  document.body.appendChild(button);
  return button;
});

// Function to start the game
function startGame() {
  // Remove the difficulty level buttons
  difficultyButtons.forEach((button) => button.remove());

  // Set the interval to update the game state
  setInterval(updateGameState, speed);
}

// Function to update the game state
function updateGameState() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake and food
  snake.forEach((segment) => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);

  // Update the snake position
  const head = snake[0];
  let newHead: { x: number; y: number };
  switch (direction) {
    case "UP":
      newHead = { x: head.x, y: head.y - 10 };
      break;
    case "DOWN":
      newHead = { x: head.x, y: head.y + 10 };
      break;
    case "LEFT":
      newHead = { x: head.x - 10, y: head.y };
      break;
    case "RIGHT":
      newHead = { x: head.x + 10, y: head.y };
      break;
  }

  // Check for collision with the food
  if (newHead.x === food.x && newHead.y === food.y) {
    // Increase the score and generate new food
    score += 10;
    document.getElementById("score").textContent = score.toString();
    food = {
      x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
      y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
    };
  } else {
    // Remove the last segment of the snake
    snake.pop();
  }

  // Add the new head to the snake
  snake.unshift(newHead);

  // Check for collision with the wall or itself
  if (
    newHead.x < 0 ||
    newHead.x >= canvas.width ||
    newHead.y < 0 ||
    newHead.y >= canvas.height ||
    snake
      .slice(1)
      .some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    // Game over
    alert("Game Over!");
    window.location.reload();
  }

  // Check for win condition
  if (score >= 100) {
    // Display the win message
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
    setTimeout(() => window.location.reload(), 5000);
  }
}

// Add event listener for key presses
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "DOWN") direction = "UP";
      break;
    case "ArrowDown":
      if (direction !== "UP") direction = "DOWN";
      break;
    case "ArrowLeft":
      if (direction !== "RIGHT") direction = "LEFT";
      break;
    case "ArrowRight":
      if (direction !== "LEFT") direction = "RIGHT";
      break;
  }
});
