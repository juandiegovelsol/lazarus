const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const colorSelect = document.getElementById("color-select");
const gameOverMenu = document.getElementById("game-over-menu");
const gameOverText = document.getElementById("game-over-text");
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
const maxShots = 50;
let shotsTaken = 0;

const enemyWidth = 50;
const enemyHeight = 30;
let enemies = [];
const enemySpeed = 1;
const enemyRowCount = 3;
const enemyColumnCount = 5;

let score = 0;
let isGameOver = false;
let playerColor = colorSelect.value;

let timer = 20;
let lastTime = 0;
let fps = 0;

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
    ctx.fillStyle = playerColor;
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
    bullets = bullets.filter(bullet => bullet.y > 0);
    for (const bullet of bullets) {
        bullet.y -= 5;
    }
}

function updateEnemies() {
    for (const enemy of enemies) {
        enemy.y += enemySpeed;
        if (enemy.y + enemy.height > canvas.height) {
            isGameOver = true;
        }
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
                score += 5;
            }
        });
    });
}

function drawGameOver() {
    gameOverText.textContent = isGameOver ? "Game Over" : "You Win!";
    gameOverMenu.style.display = "flex";
}

function gameLoop(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isGameOver && score < 40 && timer > 0) {
        drawPlayer();
        drawBullets();
        drawEnemies();
        updateBullets();
        updateEnemies();
        checkCollisions();

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 20);
        ctx.fillText("Shots: " + shotsTaken + "/" + maxShots, 10, 40);
        ctx.fillText("Time: " + Math.floor(timer), 10, 60);
        ctx.fillText("FPS: " + fps, canvas.width - 100, 20);

        timer -= (time - lastTime) / 1000;
        lastTime = time;
        fps = 1000 / (time - lastTime);

        requestAnimationFrame(gameLoop);
    } else {
        if (score >= 40) {
            isGameOver = false;
        }
        drawGameOver();
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= playerSpeed;
    } else if (event.key === "ArrowRight" && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    } else if (event.key === " " && shotsTaken < maxShots) {
        bullets.push({
            x: playerX + playerWidth / 2 - bulletWidth / 2,
            y: playerY,
            width: bulletWidth,
            height: bulletHeight,
        });
        shotsTaken++;
    }
});

colorSelect.addEventListener("change", () => {
    playerColor = colorSelect.value;
});

restartButton.addEventListener("click", () => {
    location.reload();
});

exitButton.addEventListener("click", () => {
    window.close();
});

createEnemies();
gameLoop();