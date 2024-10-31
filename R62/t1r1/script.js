// Get the canvas and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Define game constants
const PLAYER_SIZE = 50;
const PLAYER_JUMP_VELOCITY = -15;
const GRAVITY = 0.5;
const OBSTACLE_SPEED = 5;
const OBSTACLE_SPAWN_RATE = 1000; // milliseconds
const STAR_SPAWN_RATE = 5000; // milliseconds
const HEALTH_DECREMENT = {
  triangle: 5,
  square: 10,
  circle: 15,
};
const WIN_CONDITION = 2; // points

// Define game variables
let playerX = 100;
let playerY = canvas.height - PLAYER_SIZE - 20;
let playerVelocity = 0;
let playerHealth = 100;
let points = 0;
let obstacles = [];
let stars = [];
let lastObstacleSpawn = Date.now();
let lastStarSpawn = Date.now();
let gameOver = false;

// Draw the player
function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(playerX, playerY, PLAYER_SIZE, PLAYER_SIZE);
}

// Update player position
function updatePlayer() {
  playerVelocity += GRAVITY;
  playerY += playerVelocity;

  // Collision with ground
  if (playerY + PLAYER_SIZE > canvas.height - 20) {
    playerY = canvas.height - PLAYER_SIZE - 20;
    playerVelocity = 0;
  }
}

// Jump function
function jump() {
  if (playerVelocity === 0) {
    playerVelocity = PLAYER_JUMP_VELOCITY;
  }
}

// Draw obstacles
function drawObstacles() {
  obstacles.forEach((obstacle) => {
    ctx.fillStyle = obstacle.color;
    ctx.beginPath();
    if (obstacle.type === "triangle") {
      ctx.moveTo(obstacle.x, obstacle.y);
      ctx.lineTo(obstacle.x + obstacle.width, obstacle.y);
      ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height);
      ctx.closePath();
    } else if (obstacle.type === "square") {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    } else if (obstacle.type === "circle") {
      ctx.arc(
        obstacle.x + obstacle.width / 2,
        obstacle.y + obstacle.height / 2,
        obstacle.width / 2,
        0,
        Math.PI * 2
      );
    }
    ctx.fill();
  });
}

// Update obstacles
function updateObstacles() {
  obstacles.forEach((obstacle, index) => {
    obstacle.x -= OBSTACLE_SPEED;

    // Collision with player
    if (
      obstacle.x < playerX + PLAYER_SIZE &&
      obstacle.x + obstacle.width > playerX &&
      obstacle.y < playerY + PLAYER_SIZE &&
      obstacle.y + obstacle.height > playerY
    ) {
      playerHealth -= HEALTH_DECREMENT[obstacle.type];
      obstacles.splice(index, 1);
    }

    // Remove off-screen obstacles
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(index, 1);
    }
  });
}

// Draw stars
function drawStars() {
  stars.forEach((star) => {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(
      star.x + star.width / 2,
      star.y + star.height / 2,
      star.width / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });
}

// Update stars
function updateStars() {
  stars.forEach((star, index) => {
    star.x -= OBSTACLE_SPEED;

    // Collision with player
    if (
      star.x < playerX + PLAYER_SIZE &&
      star.x + star.width > playerX &&
      star.y < playerY + PLAYER_SIZE &&
      star.y + star.height > playerY
    ) {
      points++;
      stars.splice(index, 1);
    }

    // Remove off-screen stars
    if (star.x + star.width < 0) {
      stars.splice(index, 1);
    }
  });
}

// Spawn obstacles and stars
function spawnObstaclesAndStars() {
  if (Date.now() - lastObstacleSpawn > OBSTACLE_SPAWN_RATE) {
    const obstacleType =
      Math.random() < 0.33
        ? "triangle"
        : Math.random() < 0.67
        ? "square"
        : "circle";
    obstacles.push({
      type: obstacleType,
      x: canvas.width,
      y: Math.random() * (canvas.height - 100),
      width: 50,
      height: 50,
      color:
        obstacleType === "triangle"
          ? "red"
          : obstacleType === "square"
          ? "green"
          : "purple",
    });
    lastObstacleSpawn = Date.now();
  }

  if (Date.now() - lastStarSpawn > STAR_SPAWN_RATE) {
    stars.push({
      x: canvas.width,
      y: Math.random() * (canvas.height - 100),
      width: 20,
      height: 20,
    });
    lastStarSpawn = Date.now();
  }
}

// Draw health and points
function drawHealthAndPoints() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`Health: ${playerHealth}%`, 10, 10);
  ctx.textAlign = "right";
  ctx.fillText(`Points: ${points}`, canvas.width - 10, 10);
}

// Game loop
function gameLoop() {
  if (!gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayer();
    updateObstacles();
    updateStars();
    spawnObstaclesAndStars();

    drawPlayer();
    drawObstacles();
    drawStars();
    drawHealthAndPoints();

    if (playerHealth <= 0) {
      gameOver = true;
      ctx.font = "48px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
      document.getElementById("restartButton").style.display = "block";
    } else if (points >= WIN_CONDITION) {
      gameOver = true;
      ctx.font = "48px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("You Win!", canvas.width / 2, canvas.height / 2);
      document.getElementById("restartButton").style.display = "block";
    }

    requestAnimationFrame(gameLoop);
  }
}

// Event listeners
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    jump();
  }
});

document.getElementById("restartButton").addEventListener("click", () => {
  gameOver = false;
  playerX = 100;
  playerY = canvas.height - PLAYER_SIZE - 20;
  playerVelocity = 0;
  playerHealth = 100;
  points = 0;
  obstacles = [];
  stars = [];
  lastObstacleSpawn = Date.now();
  lastStarSpawn = Date.now();
  document.getElementById("restartButton").style.display = "none";
  gameLoop();
});

// Start the game loop
gameLoop();
