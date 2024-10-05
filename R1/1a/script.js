// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Game variables
let racketWidth = 100;
let racketHeight = 20;
let racketX = canvas.width / 2 - racketWidth / 2;
let racketY = canvas.height - racketHeight - 20;
let racketSpeed = 8;

let ballSize = 20;
let ball1X = Math.random() * (canvas.width - ballSize);
let ball1Y = -ballSize;
let ball2X = Math.random() * (canvas.width - ballSize);
let ball2Y = -ballSize;
let ballSpeedX = 4;
let ballSpeedY = 4;

let mineSize = 20;
let mineX = Math.random() * (canvas.width - mineSize);
let mineY = -mineSize;
let mineSpeed = 2;

let score = 0;
let hits = 0;
let timer = 60;
let gameOver = false;

// Draw the game elements
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the racket
  ctx.fillStyle = "#000";
  ctx.fillRect(racketX, racketY, racketWidth, racketHeight);

  // Draw the balls
  ctx.fillStyle = "#f00";
  ctx.fillRect(ball1X, ball1Y, ballSize, ballSize);
  ctx.fillRect(ball2X, ball2Y, ballSize, ballSize);

  // Draw the mine
  ctx.fillStyle = "#0f0";
  ctx.fillRect(mineX, mineY, mineSize, mineSize);

  // Draw the score and timer
  ctx.font = "24px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`Score: ${score}`, 10, 10);
  ctx.fillText(`Hits: ${hits}`, 10, 40);
  ctx.fillText(`Time: ${timer}`, 10, 70);

  // Draw the game over text
  if (gameOver) {
    ctx.font = "48px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  }
}

// Update the game state
function update() {
  // Update the racket position
  if (racketX < 0) {
    racketX = 0;
  } else if (racketX > canvas.width - racketWidth) {
    racketX = canvas.width - racketWidth;
  }

  // Update the ball positions
  ball1X += ballSpeedX;
  ball1Y += ballSpeedY;
  ball2X += ballSpeedX;
  ball2Y += ballSpeedY;

  // Bounce the balls off the walls
  if (ball1X < 0 || ball1X > canvas.width - ballSize) {
    ballSpeedX = -ballSpeedX;
  }
  if (ball1Y < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ball2X < 0 || ball2X > canvas.width - ballSize) {
    ballSpeedX = -ballSpeedX;
  }
  if (ball2Y < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Update the mine position
  mineY += mineSpeed;

  // Check for collisions
  if (
    checkCollision(
      racketX,
      racketY,
      racketWidth,
      racketHeight,
      ball1X,
      ball1Y,
      ballSize,
      ballSize
    )
  ) {
    ballSpeedY = -ballSpeedY;
    hits++;
    score++;
  }
  if (
    checkCollision(
      racketX,
      racketY,
      racketWidth,
      racketHeight,
      ball2X,
      ball2Y,
      ballSize,
      ballSize
    )
  ) {
    ballSpeedY = -ballSpeedY;
    hits++;
    score++;
  }
  if (
    checkCollision(
      racketX,
      racketY,
      racketWidth,
      racketHeight,
      mineX,
      mineY,
      mineSize,
      mineSize
    )
  ) {
    gameOver = true;
  }
  if (ball1Y > canvas.height - ballSize || ball2Y > canvas.height - ballSize) {
    gameOver = true;
  }

  // Update the timer
  timer -= 1 / 60;
  if (timer <= 0) {
    gameOver = true;
  }

  // Reset the game state
  if (gameOver) {
    racketX = canvas.width / 2 - racketWidth / 2;
    racketY = canvas.height - racketHeight - 20;
    ball1X = Math.random() * (canvas.width - ballSize);
    ball1Y = -ballSize;
    ball2X = Math.random() * (canvas.width - ballSize);
    ball2Y = -ballSize;
    mineX = Math.random() * (canvas.width - mineSize);
    mineY = -mineSize;
    score = 0;
    hits = 0;
    timer = 60;
    gameOver = false;
  }
}

// Check for collisions
function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2) {
    return true;
  }
  return false;
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  if (e.key === "d") {
    racketX -= racketSpeed;
  } else if (e.key === "a") {
    racketX += racketSpeed;
  }
});

// Main game loop
function main() {
  draw();
  update();
  requestAnimationFrame(main);
}

// Start the game
function startGame() {
  ctx.font = "48px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Start Game", canvas.width / 2, canvas.height / 2);
  setTimeout(() => {
    main();
  }, 2000);
}

startGame();
