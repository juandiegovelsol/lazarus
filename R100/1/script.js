const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Variables
let playerName = prompt("Enter your name:");
let player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  color: "red",
  dy: 0,
  gravity: 1.2,
  jumpPower: -18,
  isJumping: false,
};

let obstacles = [];
let gameSpeed = 5;
let spawnTimer = 0;
let gameActive = true;
let score = 0;

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !player.isJumping) {
    player.dy = player.jumpPower;
    player.isJumping = true;
  }
});

// Game Loop
function gameLoop() {
  if (!gameActive) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Game Over, " + playerName + "!", 100, 200);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePlayer();
  updateObstacles();
  checkCollision();
  drawScore();
  updateGameSpeed();
  requestAnimationFrame(gameLoop);
}

// Update Player Function
function updatePlayer() {
  player.y += player.dy;
  player.dy += player.gravity;

  if (player.y > canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.isJumping = false;
  }

  drawPlayer();
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Update Obstacles Function
function updateObstacles() {
  spawnTimer++;
  if (spawnTimer > 100) {
    obstacles.push({
      x: canvas.width,
      y: canvas.height - 30,
      width: 30,
      height: 30,
      color: "green",
      passed: false,
    });
    spawnTimer = 0;
  }

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= gameSpeed;
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      i--;
    } else if (obstacles[i].x < player.x && !obstacles[i].passed) {
      score += 10;
      obstacles[i].passed = true;
    } else {
      drawObstacle(obstacles[i]);
    }
  }
}

function drawObstacle(obstacle) {
  ctx.fillStyle = obstacle.color;
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Collision Check
function checkCollision() {
  for (let i = 0; i < obstacles.length; i++) {
    const obs = obstacles[i];
    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      gameActive = false;
    }
  }
}

// Draw Score Function
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "blue";
  ctx.fillText("Score: " + score, 10, 30);
}

function updateGameSpeed() {
  if (score % 50 === 0 && score > 0) {
    gameSpeed += 0.5;
  }
}

// Start the game loop
gameLoop();
