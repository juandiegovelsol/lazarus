// Get the canvas element
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Define the snake and food objects
let snake: { x: number; y: number }[] = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

let food: { x: number; y: number } = {
  x: Math.floor(Math.random() * 40) * 10,
  y: Math.floor(Math.random() * 40) * 10,
};

// Define the score and direction variables
let score = 0;
let direction: "UP" | "DOWN" | "LEFT" | "RIGHT" = "RIGHT";

// Define the difficulty modes and their corresponding snake speeds
const difficulties = {
  EASY: 100,
  MEDIUM: 50,
  HARD: 20,
};

let snakeSpeed = difficulties.EASY;
let gameRunning = true;

// Function to draw the game board
function drawBoard() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to draw the snake
function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });
}

// Function to draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
}

// Function to update the snake's position
function updateSnake() {
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

  snake.unshift(newHead);

  if (snake[0].x === food.x && snake[0].y === food.y) {
    score += 10;
    document.getElementById("score")!.innerText = score.toString();
    food = {
      x: Math.floor(Math.random() * 40) * 10,
      y: Math.floor(Math.random() * 40) * 10,
    };
  } else {
    snake.pop();
  }

  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height ||
    snake.some(
      (segment, index) =>
        index !== 0 && segment.x === snake[0].x && segment.y === snake[0].y
    )
  ) {
    alert("Game Over!");
    window.location.reload();
  }

  if (score >= 100) {
    ctx.fillStyle = "white";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
    gameRunning = false;
    setTimeout(() => {
      window.location.reload();
    }, 5000);
    return;
  }
}

// Function to handle key presses
function handleKeyPress(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "DOWN") {
        direction = "UP";
      }
      break;
    case "ArrowDown":
      if (direction !== "UP") {
        direction = "DOWN";
      }
      break;
    case "ArrowLeft":
      if (direction !== "RIGHT") {
        direction = "LEFT";
      }
      break;
    case "ArrowRight":
      if (direction !== "LEFT") {
        direction = "RIGHT";
      }
      break;
  }
}

// Function to display difficulty modes
function displayDifficulties() {
  const difficultyContainer = document.createElement("div");
  difficultyContainer.style.textAlign = "center";
  difficultyContainer.style.marginBottom = "20px";

  const easyButton = document.createElement("button");
  easyButton.textContent = "Easy";
  easyButton.onclick = () => {
    snakeSpeed = difficulties.EASY;
    difficultyContainer.remove();
    gameLoop();
  };

  const mediumButton = document.createElement("button");
  mediumButton.textContent = "Medium";
  mediumButton.onclick = () => {
    snakeSpeed = difficulties.MEDIUM;
    difficultyContainer.remove();
    gameLoop();
  };

  const hardButton = document.createElement("button");
  hardButton.textContent = "Hard";
  hardButton.onclick = () => {
    snakeSpeed = difficulties.HARD;
    difficultyContainer.remove();
    gameLoop();
  };

  difficultyContainer.appendChild(easyButton);
  difficultyContainer.appendChild(mediumButton);
  difficultyContainer.appendChild(hardButton);

  document.body.appendChild(difficultyContainer);
}

// Main game loop
function gameLoop() {
  if (!gameRunning) return;

  drawBoard();
  drawSnake();
  drawFood();
  updateSnake();

  setTimeout(gameLoop, snakeSpeed);
}

// Initialize the game
displayDifficulties();

// Add event listener for key presses
document.addEventListener("keydown", handleKeyPress);
