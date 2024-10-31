const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("color-picker");
const restartButton = document.getElementById("restart-button");
const exitButton = document.getElementById("exit-button");

const playerWidth = 50;
const playerHeight = 30;
let playerX = canvas.width / 2 - playerWidth / 2;
const playerY = canvas.height - playerHeight - 10;
const playerSpeed = 7;

const bulletWidth = 5;
const bulletHeight = 15;
let bullets = [];
let bulletCount = 50;

const enemyWidth = 50;
const enemyHeight = 30;
let enemies = [];
const enemySpeed = 0.2;
const enemyRowCount = 3;
const enemyColumnCount = 5;

let score = 0;
let isGameOver = false;
let timer = 20;
let playerColor = colorPicker.value;
let lastFrameTime = performance.now();
let fps = 0;
let showWinMessage = false;

// Create enemies
function createEnemies() {
  for (let row = 0; row < enemyRowCount; row++) {
    for (let col = 0; col < enemyColumnCount; col++) {
      enemies.push({
        x: col * (enemyWidth + 10) + 50,
        y: row * (enemyHeight + 10) + 30,
        width: enemyWidth,
        height: enemyHeight,
      });
    }
  }
}

// Draw player
function drawPlayer() {
  ctx.fillStyle = playerColor;
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

// Draw bullets
function drawBullets() {
  ctx.fillStyle = "red";
  for (const bullet of bullets) {
    ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
  }
}

// Draw enemies
function drawEnemies() {
  ctx.fillStyle = "green";
  for (const enemy of enemies) {
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }
}

// Update bullets position
function updateBullets() {
  bullets = bullets.filter((bullet) => bullet.y > 0);
  for (const bullet of bullets) {
    bullet.y -= 5;
  }
}

// Update enemies position
function updateEnemies() {
  let reachedBottom = false;
  for (const enemy of enemies) {
    enemy.y += enemySpeed;
    if (enemy.y + enemy.height > canvas.height) {
      reachedBottom = true;
    }
  }
  if (reachedBottom) {
    isGameOver = true;
  }
}

// Check for collisions between bullets and enemies
function checkCollisions() {
  bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bulletWidth > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bulletHeight > enemy.y
      ) {
        enemies.splice(enemyIndex, 1);
        bullets.splice(bulletIndex, 1);
        score += 5;
      }
    });
  });
}

// Draw game over message
function drawGameOver() {
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
  ctx.fillText(
    "Score: " + score,
    canvas.width / 2 - 50,
    canvas.height / 2 + 40
  );
}

// Draw game win message
function drawGameWin() {
  ctx.fillStyle = "green";
  ctx.font = "30px Arial";
  ctx.fillText("You win!", canvas.width / 2 - 50, canvas.height / 2);
  ctx.fillText(
    "Score: " + score,
    canvas.width / 2 - 50,
    canvas.height / 2 + 40
  );
  showWinMessage = true;
}

// Calculate FPS
function calculateFPS() {
  const now = performance.now();
  const deltaTime = now - lastFrameTime;
  fps = Math.round(1000 / deltaTime);
  lastFrameTime = now;
}

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!isGameOver) {
    drawPlayer();
    drawBullets();
    drawEnemies();
    updateBullets();
    updateEnemies();
    checkCollisions();

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
    ctx.fillText("Timer: " + Math.floor(timer), 10, 50);
    ctx.fillText("Bullets: " + bulletCount, 10, 80);

    calculateFPS();
    ctx.fillText("FPS: " + fps, canvas.width - 100, 20);

    if (score >= 40) {
      drawGameWin();
      isGameOver = true;
    }

    if (timer <= 0) {
      isGameOver = true;
    }

    timer -= 1 / 60; // Decrease timer

    requestAnimationFrame(gameLoop);
  } else {
    if (score < 40) {
      drawGameOver();
    } else {
      drawGameWin();
    }
    restartButton.style.display = "block";
    exitButton.style.display = "block";
  }
}

colorPicker.addEventListener("input", (event) => {
  playerColor = event.target.value;
});

// Handle keyboard events for player movement and shooting
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && playerX > 0) {
    playerX -= playerSpeed;
  } else if (
    event.key === "ArrowRight" &&
    playerX < canvas.width - playerWidth
  ) {
    playerX += playerSpeed;
  } else if (event.key === " " && bulletCount > 0) {
    bullets.push({
      x: playerX + playerWidth / 2 - bulletWidth / 2,
      y: playerY,
      width: bulletWidth,
      height: bulletHeight,
    });
    bulletCount--;
  }
});

// Restart the game
function restartGame() {
  isGameOver = false;
  score = 0;
  timer = 20;
  bulletCount = 50;
  enemies = [];
  bullets = [];
  createEnemies();
  restartButton.style.display = "none";
  exitButton.style.display = "none";
  showWinMessage = false;
  gameLoop();
}

// Exit the game
function exitGame() {
  window.close();
}

createEnemies();
gameLoop();
