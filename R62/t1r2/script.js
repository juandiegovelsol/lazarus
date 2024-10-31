// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Get the restart button
const restartButton = document.getElementById('restart-button');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Set the player properties
const player = {
    x: 50,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    health: 100,
    points: 0,
    jump: false,
    jumpHeight: 100,
    velocity: 0,
    gravity: 0.5
};

// Set the obstacle properties
const obstacles = [];
const obstacleTypes = ['triangle', 'square', 'circle'];

// Set the star properties
const stars = [];

// Set the game properties
const game = {
    speed: 2,
    obstacleInterval: 1000,
    starInterval: 5000,
    running: true,
    winCondition: 1000
};

// Draw the player
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw the obstacles
function drawObstacles() {
    obstacles.forEach((obstacle) => {
        ctx.fillStyle = 'red';
        if (obstacle.type === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(obstacle.x, obstacle.y);
            ctx.lineTo(obstacle.x + obstacle.width, obstacle.y);
            ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height);
            ctx.fill();
        } else if (obstacle.type === 'square') {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        } else if (obstacle.type === 'circle') {
            ctx.beginPath();
            ctx.arc(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2, obstacle.width / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

// Draw the stars
function drawStars() {
    stars.forEach((star) => {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(star.x + star.width / 2, star.y + star.height / 2, star.width / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Update the player position
function updatePlayer() {
    if (player.jump) {
        player.velocity += player.gravity;
        player.y += player.velocity;
        if (player.y > canvas.height - player.height) {
            player.y = canvas.height - player.height;
            player.jump = false;
            player.velocity = 0;
        }
    }
}

// Update the obstacle positions
function updateObstacles() {
    obstacles.forEach((obstacle) => {
        obstacle.x -= game.speed;
        if (obstacle.x < 0) {
            obstacles.splice(obstacles.indexOf(obstacle), 1);
        }
    });
}

// Update the star positions
function updateStars() {
    stars.forEach((star) => {
        star.x -= game.speed;
        if (star.x < 0) {
            stars.splice(stars.indexOf(star), 1);
        }
    });
}

// Check for collisions with obstacles
function checkCollisions() {
    obstacles.forEach((obstacle) => {
        if (player.x + player.width > obstacle.x && player.x < obstacle.x + obstacle.width && player.y + player.height > obstacle.y && player.y < obstacle.y + obstacle.height) {
            if (obstacle.type === 'triangle') {
                player.health -= 5;
            } else if (obstacle.type === 'square') {
                player.health -= 10;
            } else if (obstacle.type === 'circle') {
                player.health -= 15;
            }
        }
    });
}

// Check for star collection
function checkStarCollection() {
    stars.forEach((star) => {
        if (player.x + player.width > star.x && player.x < star.x + star.width && player.y + player.height > star.y && player.y < star.y + star.height) {
            player.points += 100;
            stars.splice(stars.indexOf(star), 1);
        }
    });
}

// Draw the game
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    drawStars();
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Health: ${player.health}`, 10, 10);
    ctx.fillText(`Points: ${player.points}`, 10, 40);
}

// Update the game
function updateGame() {
    updatePlayer();
    updateObstacles();
    updateStars();
    checkCollisions();
    checkStarCollection();
    if (player.health <= 0) {
        game.running = false;
        ctx.font = '48px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        restartButton.style.display = 'block';
    } else if (player.points >= game.winCondition) {
        game.running = false;
        ctx.font = '48px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('You Win!', canvas.width / 2, canvas.height / 2);
        restartButton.style.display = 'block';
    }
}

// Main game loop
function gameLoop() {
    if (game.running) {
        drawGame();
        updateGame();
        requestAnimationFrame(gameLoop);
    }
}

// Add event listener for jump
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && !player.jump) {
        player.jump = true;
        player.velocity = -10;
    }
});

// Add event listener for restart button
restartButton.addEventListener('click', () => {
    player.health = 100;
    player.points = 0;
    obstacles.length = 0;
    stars.length = 0;
    game.running = true;
    restartButton.style.display = 'none';
    gameLoop();
});

// Start the game loop
gameLoop();

// Add obstacles at regular intervals
setInterval(() => {
    if (game.running) {
        const obstacle = {
            x: canvas.width,
            y: Math.random() * (canvas.height - 50),
            width: 50,
            height: 50,
            type: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)]
        };
        obstacles.push(obstacle);
    }
}, game.obstacleInterval);

// Add stars at regular intervals
setInterval(() => {
    if (game.running) {
        const star = {
            x: canvas.width,
            y: Math.random() * (canvas.height - 50),
            width: 20,
            height: 20
        };
        stars.push(star);
    }
}, game.starInterval);