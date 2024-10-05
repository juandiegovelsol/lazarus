// Get the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Game variables
let racketWidth = 100;
let racketHeight = 20;
let racketX = (canvas.width - racketWidth) / 2;
let racketY = canvas.height - racketHeight - 20;
let racketSpeed = 5;

let ballSize = 20;
let ball1X = Math.random() * (canvas.width - ballSize);
let ball1Y = -ballSize;
let ball2X = Math.random() * (canvas.width - ballSize);
let ball2Y = -ballSize;
let ballSpeedX = 3;
let ballSpeedY = 3;

let mineSize = 20;
let mineX = Math.random() * (canvas.width - mineSize);
let mineY = -mineSize;
let mineSpeed = 2;

let score = 0;
let hits = 0;
let timer = 60;
let gameOver = false;
let gameStarted = false;

// Draw the start game text
ctx.font = "36px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "black";
ctx.fillText("Start Game", canvas.width / 2, canvas.height / 2);

// Event listeners
document.addEventListener("keydown", (e) => {
  if (e.key === "a" || e.key === "A") {
    racketX -= racketSpeed;
  } else if (e.key === "d" || e.key === "D") {
    racketX += racketSpeed;
  }
});

document.addEventListener("keyup", () => {
  if (gameStarted === false) {
    gameStarted = true;
    startGame();
  }
});

let ballDelay = 5; // seconds
let ballDelayTimer = 0;

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRacket();
  drawMine();
  drawScore();
  drawTimer();

  // Update the game state
  updateGameState();

  // Animate the game
  if (!gameOver) {
    requestAnimationFrame(startGame);
  }

  // Delay the appearance of the balls
  ballDelayTimer += 1 / 60;
  if (ballDelayTimer >= ballDelay) {
    drawBall1();
    drawBall2();
  }
}

// Update the game state
function updateGameState() {
  // Update the racket position
  if (racketX < 0) {
    racketX = 0;
  } else if (racketX > canvas.width - racketWidth) {
    racketX = canvas.width - racketWidth;
  }

  // Update the ball position
  ball1X += ballSpeedX;
  ball1Y += ballSpeedY;
  ball2X += ballSpeedX;
  ball2Y += ballSpeedY;

  // Check for ball collision with the racket
  if (
    ball1Y + ballSize > racketY &&
    ball1Y < racketY + racketHeight &&
    ball1X > racketX &&
    ball1X < racketX + racketWidth
  ) {
    ballSpeedY = -ballSpeedY;
    hits++;
    score++;
  }

  if (
    ball2Y + ballSize > racketY &&
    ball2Y < racketY + racketHeight &&
    ball2X > racketX &&
    ball2X < racketX + racketWidth
  ) {
    ballSpeedY = -ballSpeedY;
    hits++;
    score++;
  }

  // Check for ball collision with the canvas edges
  if (ball1X < 0 || ball1X > canvas.width - ballSize) {
    ballSpeedX = -ballSpeedX;
  }

  if (ball2X < 0 || ball2X > canvas.width - ballSize) {
    ballSpeedX = -ballSpeedX;
  }

  // Check for ball collision with the top edge
  if (ball1Y < 0) {
    ball1Y = 0;
    ballSpeedY = -ballSpeedY;
  }

  if (ball2Y < 0) {
    ball2Y = 0;
    ballSpeedY = -ballSpeedY;
  }

  // Check for ball collision with the bottom edge
  if (ball1Y > canvas.height - ballSize || ball2Y > canvas.height - ballSize) {
    gameOver = true;
  }

  // Update the mine position
  mineY += mineSpeed;

  // Check for mine collision with the racket
  if (
    mineY + mineSize > racketY &&
    mineY < racketY + racketHeight &&
    mineX > racketX &&
    mineX < racketX + racketWidth
  ) {
    gameOver = true;
  }

  // Check for mine collision with the canvas edges
  if (mineY > canvas.height - mineSize) {
    mineY = -mineSize;
    mineX = Math.random() * (canvas.width - mineSize);
  }

  // Update the timer
  timer -= 1 / 60;

  if (timer <= 0) {
    gameOver = true;
  }

  // Check for game win
  if (score >= 4) {
    gameOver = true;
  }
}

// Draw the racket
function drawRacket() {
  ctx.fillStyle = "black";
  ctx.fillRect(racketX, racketY, racketWidth, racketHeight);
}

// Draw the ball
function drawBall1() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(ball1X, ball1Y, ballSize / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawBall2() {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(ball2X, ball2Y, ballSize / 2, 0, Math.PI * 2);
  ctx.fill();
}

// Draw the mine
function drawMine() {
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(mineX, mineY, mineSize / 2, 0, Math.PI * 2);
  ctx.fill();
}

// Draw the score
function drawScore() {
  ctx.font = "24px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 10, 10);
  ctx.fillText(`Hits: ${hits}`, 10, 40);
}

// Draw the timer
function drawTimer() {
  ctx.font = "24px Arial";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillStyle = "black";
  ctx.fillText(`Time: ${Math.floor(timer)}`, canvas.width - 10, 10);
}

// Game over screen
function drawGameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "36px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "black";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  ctx.font = "24px Arial";
  ctx.fillText(
    `Final Score: ${score}`,
    canvas.width / 2,
    canvas.height / 2 + 40
  );
}

// Check for game over
if (gameOver) {
  drawGameOver();
}
