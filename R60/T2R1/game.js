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
const enemySpeed = 0.5;
const enemyRowCount = 3;
const enemyColumnCount = 5;

const goldenItemWidth = 20;
const goldenItemHeight = 20;
let goldenItemX = Math.random() * (canvas.width - goldenItemWidth);
let goldenItemY = -goldenItemHeight;
const goldenItemSpeed = 1;

const purpleItemWidth = 20;
const purpleItemHeight = 20;
let purpleItemX = Math.random() * (canvas.width - purpleItemWidth);
let purpleItemY = -purpleItemHeight;
const purpleItemSpeed = 1;

const armoredEnemyWidth = 50;
const armoredEnemyHeight = 50;
let armoredEnemyX = Math.random() * (canvas.width - armoredEnemyWidth);
let armoredEnemyY = -armoredEnemyHeight;
const armoredEnemySpeed = 1;
let armoredEnemyHealth = 2;

let score = 0;
let isGameOver = false;
let timer = 20;
let playerColor = colorPicker.value;
let lastFrameTime = performance.now();
let fps = 0;
let showWinMessage = false;
let isDoubleShot = false;
let isEnemiesFrozen = false;
let freezeTime = 0;

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

function drawGoldenItem() {
    ctx.fillStyle = "gold";
    ctx.fillRect(goldenItemX, goldenItemY, goldenItemWidth, goldenItemHeight);
}

function drawPurpleItem() {
    ctx.fillStyle = "purple";
    ctx.fillRect(purpleItemX, purpleItemY, purpleItemWidth, purpleItemHeight);
}

function drawArmoredEnemy() {
    ctx.fillStyle = "red";
    ctx.fillRect(armoredEnemyX, armoredEnemyY, armoredEnemyWidth, armoredEnemyHeight);
}

function updateBullets() {
    bullets = bullets.filter(bullet => bullet.y > 0);
    for (const bullet of bullets) {
        bullet.y -= 5;
    }
}

function updateEnemies() {
    if (!isEnemiesFrozen) {
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
}

function updateGoldenItem() {
    goldenItemY += goldenItemSpeed;
    if (goldenItemY + goldenItemHeight > canvas.height) {
        goldenItemX = Math.random() * (canvas.width - goldenItemWidth);
        goldenItemY = -goldenItemHeight;
    }
}

function updatePurpleItem() {
    purpleItemY += purpleItemSpeed;
    if (purpleItemY + purpleItemHeight > canvas.height) {
        purpleItemX = Math.random() * (canvas.width - purpleItemWidth);
        purpleItemY = -purpleItemHeight;
    }
}

function updateArmoredEnemy() {
    armoredEnemyY += armoredEnemySpeed;
    if (armoredEnemyY + armoredEnemyHeight > canvas.height) {
        isGameOver = true;
    }
    armoredEnemyX += Math.random() * 2 - 1;
    if (armoredEnemyX < 0) {
        armoredEnemyX = 0;
    } else if (armoredEnemyX + armoredEnemyWidth > canvas.width) {
        armoredEnemyX = canvas.width - armoredEnemyWidth;
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
        if (
            bullet.x < armoredEnemyX + armoredEnemyWidth &&
            bullet.x + bulletWidth > armoredEnemyX &&
            bullet.y < armoredEnemyY + armoredEnemyHeight &&
            bullet.y + bulletHeight > armoredEnemyY
        ) {
            armoredEnemyHealth--;
            bullets.splice(bulletIndex, 1);
            if (armoredEnemyHealth === 0) {
                score += 10;
                armoredEnemyX = Math.random() * (canvas.width - armoredEnemyWidth);
                armoredEnemyY = -armoredEnemyHeight;
                armoredEnemyHealth = 2;
            }
        }
    });
    if (
        playerX < goldenItemX + goldenItemWidth &&
        playerX + playerWidth > goldenItemX &&
        playerY < goldenItemY + goldenItemHeight &&
        playerY + playerHeight > goldenItemY
    ) {
        isDoubleShot = true;
        goldenItemX = Math.random() * (canvas.width - goldenItemWidth);
        goldenItemY = -goldenItemHeight;
    }
    if (
        playerX < purpleItemX + purpleItemWidth &&
        playerX + playerWidth > purpleItemX &&
        playerY < purpleItemY + purpleItemHeight &&
        playerY + playerHeight > purpleItemY
    ) {
        isEnemiesFrozen = true;
        freezeTime = 5;
        purpleItemX = Math.random() * (canvas.width - purpleItemWidth);
        purpleItemY = -purpleItemHeight;
    }
}

function drawGameOver() {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
    ctx.fillText("Score: " + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
}

function drawGameWin() {
    ctx.fillStyle = "green";
    ctx.font = "30px Arial";
    ctx.fillText("You win!", canvas.width / 2 - 50, canvas.height / 2);
    ctx.fillText("Score: " + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
    showWinMessage = true;
}

function calculateFPS() {
    const now = performance.now();
    const deltaTime = now - lastFrameTime;
    fps = Math.round(1000 / deltaTime);
    lastFrameTime = now;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isGameOver) {
        drawPlayer();
        drawBullets();
        drawEnemies();
        drawGoldenItem();
        drawPurpleItem();
        drawArmoredEnemy();
        updateBullets();
        updateEnemies();
        updateGoldenItem();
        updatePurpleItem();
        updateArmoredEnemy();
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

        if (isEnemiesFrozen) {
            freezeTime -= 1 / 60;
            if (freezeTime <= 0) {
                isEnemiesFrozen = false;
            }
        }

        timer -= 1 / 60;

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

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= playerSpeed;
    } else if (event.key === "ArrowRight" && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    } else if (event.key === " " && bulletCount > 0) {
        if (isDoubleShot) {
            bullets.push({
                x: playerX + playerWidth / 2 - bulletWidth / 2 - 10,
                y: playerY,
                width: bulletWidth,
                height: bulletHeight,
            });
            bullets.push({
                x: playerX + playerWidth / 2 - bulletWidth / 2 + 10,
                y: playerY,
                width: bulletWidth,
                height: bulletHeight,
            });
            bulletCount -= 2;
        } else {
            bullets.push({
                x: playerX + playerWidth / 2 - bulletWidth / 2,
                y: playerY,
                width: bulletWidth,
                height: bulletHeight,
            });
            bulletCount--;
        }
    }
});

function restartGame() {
    isGameOver = false;
    score = 0;
    timer = 20;
    bulletCount = 50;
    enemies = [];
    bullets = [];
    createEnemies();
    goldenItemX = Math.random() * (canvas.width - goldenItemWidth);
    goldenItemY = -goldenItemHeight;
    purpleItemX = Math.random() * (canvas.width - purpleItemWidth);
    purpleItemY = -purpleItemHeight;
    armoredEnemyX = Math.random() * (canvas.width - armoredEnemyWidth);
    armoredEnemyY = -armoredEnemyHeight;
    armoredEnemyHealth = 2;
    isDoubleShot = false;
    isEnemiesFrozen = false;
    freezeTime = 0;
    restartButton.style.display = "none";
    exitButton.style.display = "none";
    showWinMessage = false;
    gameLoop();
}

function exitGame() {
    window.close();
}

createEnemies();
gameLoop();