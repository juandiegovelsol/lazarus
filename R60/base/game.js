const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerWidth = 50;
const playerHeight = 30;
let playerX = canvas.width / 2 - playerWidth / 2;
const playerY = canvas.height - playerHeight - 10;
const playerSpeed = 7;

const bulletWidth = 5;
const bulletHeight = 15;
let bullets = [];

const enemyWidth = 50;
const enemyHeight = 30;
let enemies = [];
const enemySpeed = 1;
const enemyRowCount = 3;
const enemyColumnCount = 5;
let enemyMoveDirection = 1;

let score = 0;
let isGameOver = false;

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

function drawPlayer() {
  ctx.fillStyle = "white";
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

function drawBullets() {
  ctx.fillStyle = "red";
  for (const bullet of bullets) {
    ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
  }
}

function drawEnemies() {
  ctx.fillStyle = "green";
  for (const enemy of enemies) {
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }
}

function updateBullets() {
  bullets = bullets.filter((bullet) => bullet.y > 0);
  for (const bullet of bullets) {
    bullet.y -= 5;
  }
}

function updateEnemies() {
  let reachedBottom = false;
  for (const enemy of enemies) {
    enemy.x += enemyMoveDirection;
    if (enemy.x + enemy.width > canvas.width || enemy.x < 0) {
      enemyMoveDirection *= -1;
      enemy.y += 10;
      if (enemy.y + enemy.height > playerY) {
        reachedBottom = true;
      }
    }
  }
  if (reachedBottom) {
    isGameOver = true;
  }
}

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
        score += 10;
      }
    });
  });
}

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

    requestAnimationFrame(gameLoop);
  } else {
    drawGameOver();
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && playerX > 0) {
    playerX -= playerSpeed;
  } else if (
    event.key === "ArrowRight" &&
    playerX < canvas.width - playerWidth
  ) {
    playerX += playerSpeed;
  } else if (event.key === " ") {
    bullets.push({
      x: playerX + playerWidth / 2 - bulletWidth / 2,
      y: playerY,
      width: bulletWidth,
      height: bulletHeight,
    });
  }
});

createEnemies();
gameLoop();
