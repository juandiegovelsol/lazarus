// Get the canvas element
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement; // The HTML canvas element
const ctx = canvas.getContext("2d"); // The 2D drawing context of the canvas

// Set the canvas dimensions
canvas.width = 400; // The width of the canvas in pixels
canvas.height = 400; // The height of the canvas in pixels

const snake: { x: number; y: number }[] = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

const food: { x: number; y: number } = {
  x: Math.floor(Math.random() * 40) * 10,
  y: Math.floor(Math.random() * 40) * 10,
}; // The initial food position

let score = 0;
let direction: "UP" | "DOWN" | "LEFT" | "RIGHT" = "RIGHT";

const difficulties = {
  // An object containing the difficulty modes and their corresponding snake speeds
  EASY: 100,
  MEDIUM: 50,
  HARD: 20,
};

let snakeSpeed = difficulties.EASY;
let gameRunning = true;

/**
 * Draws the game board by filling the canvas with a black color.
 */
function drawBoard() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draws the snake on the canvas by filling each segment with a green color.
 */
function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });
}

/**
 * Draws the food on the canvas by filling a rectangle with a red color.
 */
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
}

/**
 * Updates the snake's position based on the current direction and checks for collisions with the food, walls, and itself.
 */
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

/**
 * Handles key presses to change the direction of the snake.
 * @param event The keyboard event object.
 */
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

/**
 * Displays the difficulty modes and their corresponding buttons.
 */
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

/**
 * The main game loop that updates and draws the game state.
 */
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
