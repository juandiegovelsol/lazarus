const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const racketWidth = 100;
const racketHeight = 10;
let racketX = (canvas.width - racketWidth) / 2;
const racketY = canvas.height - racketHeight - 10;
const racketSpeed = 7;
let moveLeft = false;
let moveRight = false;

let balls = [];
let mines = [];
let score = 0;
let hits = 0;
let gameOver = false;
let gameStarted = false;
let timer = 60;

// Racket controls
document.addEventListener("keydown", (e) => {
  if (e.key === "d" || e.key === "D") moveLeft = true;
  if (e.key === "a" || e.key === "A") moveRight = true;
  console.log(`Key pressed: ${e.key}`);
});

document.addEventListener("keyup", (e) => {
  if (e.key === "d" || e.key === "D") moveLeft = false;
  if (e.key === "a" || e.key === "A") moveRight = false;
});

// Start Game Event
document.getElementById("start-game").addEventListener("click", () => {
  console.log("Game started");
  document.getElementById("start-game").style.display = "none";
  document.getElementById("info").style.display = "block";
  gameStarted = true;
  spawnBalls(); // Start with one ball
  spawnMines(); // Start mines immediately
  startTimer();
  updateGame();
});

// Ball Class (moves vertically only)
class Ball {
  constructor(x, y, dy) {
    this.x = x;
    this.y = y;
    this.dy = dy; // Only vertical movement
    this.radius = 10;
    console.log(`New ball created at (${this.x}, ${this.y})`);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.y += this.dy;

    // Check for collision with racket
    if (
      this.y + this.dy > racketY - this.radius &&
      this.x > racketX &&
      this.x < racketX + racketWidth
    ) {
      this.dy = -this.dy; // Reverse ball when it hits racket
      hits++;
      score++;
      document.getElementById("hits").innerText = `Hits: ${hits}`;
      document.getElementById("score").innerText = `Score: ${score}`;
      console.log(`Ball hit! Hits: ${hits}, Score: ${score}`);
    }

    // If ball touches the bottom, game over
    if (this.y + this.radius > canvas.height) {
      console.log("Ball missed. Game Over!");
      endGame("Game Over");
    }
  }
}

// Mine Class
class Mine {
  constructor(x, y, dy) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.size = 20;
    console.log(`New mine created at (${this.x}, ${this.y})`);
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.y += this.dy;

    // If mine hits racket, game over
    if (
      this.y + this.size > racketY &&
      this.x > racketX &&
      this.x < racketX + racketWidth
    ) {
      console.log("Mine hit the racket. Game Over!");
      endGame("Game Over");
    }

    // Reset mine position if it falls out of the screen
    if (this.y > canvas.height) {
      this.y = -this.size;
      this.x = Math.random() * (canvas.width - this.size);
      console.log("Mine repositioned.");
    }
  }
}

// Spawns the balls (falling from above)
function spawnBalls() {
  setInterval(() => {
    balls.push(new Ball(Math.random() * canvas.width, 0, 2)); // Ball falls down with a vertical speed
    balls.push(new Ball(Math.random() * canvas.width, 0, 3)); // Another ball after 5 seconds
  }, 5000);
}

// Spawns mines
function spawnMines() {
  setInterval(() => {
    mines.push(new Mine(Math.random() * (canvas.width - 20), -20, 4));
  }, 3000); // Mines appear every 3 seconds
  console.log("Mines are spawning every 3 seconds");
}

// Racket movement function
function moveRacket() {
  if (moveLeft && racketX > 0) {
    racketX -= racketSpeed;
    console.log(`Racket moved left to ${racketX}`);
  }
  if (moveRight && racketX < canvas.width - racketWidth) {
    racketX += racketSpeed;
    console.log(`Racket moved right to ${racketX}`);
  }
}

// Draw the racket on the canvas
function drawRacket() {
  ctx.fillStyle = "black";
  ctx.fillRect(racketX, racketY, racketWidth, racketHeight);
}

// Main game update function
function updateGame() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveRacket();
  drawRacket();

  balls.forEach((ball) => {
    ball.move();
    ball.draw();
  });

  mines.forEach((mine) => {
    mine.move();
    mine.draw();
  });

  // Win condition
  if (score >= 4) {
    endGame("You Win!");
  }

  requestAnimationFrame(updateGame);
}

// Start the countdown timer
function startTimer() {
  const interval = setInterval(() => {
    if (timer <= 0 || gameOver) {
      clearInterval(interval);
      if (!gameOver) endGame("Time Over");
    } else {
      timer--;
      document.getElementById("timer").innerText = `Time: ${timer}`;
      console.log(`Timer: ${timer}`);
    }
  }, 1000);
}

// End the game and show message
function endGame(message) {
  gameOver = true;
  document.getElementById("game-over").innerText = message;
  document.getElementById("game-over").style.display = "block";
  console.log(message);
}
