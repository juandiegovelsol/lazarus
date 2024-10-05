const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playButton = document.getElementById('playButton');
const numDucksInput = document.getElementById('num-ducks');
const minEscapeInput = document.getElementById('min-escape');

let MAX_DUCKS = parseInt(numDucksInput.value);
let DUCK_ESCAPE_LIMIT = parseInt(minEscapeInput.value);
const DUCK_WIDTH = 40;
const DUCK_HEIGHT = 30;
const BULLET_RADIUS = 5;
const OBSTACLE_WIDTH = 60;
const OBSTACLE_HEIGHT = 20;
const OBSTACLE_COUNT = 3;
let ducks = [];
let bullets = [];
let obstacles = [];
let score = 0;
let ducksEscaped = 0;
let gameActive = false;

class Duck {
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.hit = false;
    this.zigzagOffset = Math.random() * 100;
    this.directionChangeCounter = 0;
  }

  move() {
    this.x += this.speedX + Math.sin((this.y + this.zigzagOffset) / 20) * 2;
    this.directionChangeCounter++;
    if (this.directionChangeCounter > 100) {
      this.changeDirection();
      this.directionChangeCounter = 0;
    }
    this.y -= this.speedY;
  }

  changeDirection() {
    this.speedX = Math.random() * 2 - 1;
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, DUCK_WIDTH, DUCK_HEIGHT);
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.windForce = Math.random() * 1.5 - 0.75;
  }

  move() {
    this.x += this.windForce;
    this.y -= 5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, BULLET_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }
}

class Obstacle {
  constructor(x, y, speedX) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
  }

  move() {
    this.x += this.speedX;
    if (this.x < 0 || this.x + OBSTACLE_WIDTH > canvas.width) {
      this.speedX = -this.speedX;
    }
  }

  draw() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(this.x, this.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
  }
}

playButton.addEventListener('click', startGame);

function startGame() {
  MAX_DUCKS = parseInt(numDucksInput.value);
  DUCK_ESCAPE_LIMIT = Math.min(parseInt(minEscapeInput.value), MAX_DUCKS);
  
  playButton.style.display = 'none';
  numDucksInput.disabled = true;
  minEscapeInput.disabled = true;
  gameActive = true;
  ducks = [];
  bullets = [];
  obstacles = [];
  score = 0;
  ducksEscaped = 0;
  createDucks();
  createObstacles();
  gameLoop();
}

function createDucks() {
  for (let i = 0; i < MAX_DUCKS; i++) {
    let x = Math.random() * (canvas.width - DUCK_WIDTH);
    let y = canvas.height - DUCK_HEIGHT;
    let speedX = Math.random() * 2 - 1;
    let speedY = 2 + Math.random() * 3;
    ducks.push(new Duck(x, y, speedX, speedY));
  }
}

function createObstacles() {
  for (let i = 0; i < OBSTACLE_COUNT; i++) {
    let x = Math.random() * (canvas.width - OBSTACLE_WIDTH);
    let y = Math.random() * (canvas.height - OBSTACLE_HEIGHT);
    let speedX = Math.random() * 2 - 1;
    obstacles.push(new Obstacle(x, y, speedX));
  }
}

function gameLoop() {
  if (!gameActive) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ducks.forEach((duck, index) => {
    if (!duck.hit) {
      duck.move();
      duck.draw();
      if (duck.y + DUCK_HEIGHT < 0) {
        ducksEscaped++;
        ducks.splice(index, 1);
      } else if (duck.x + DUCK_WIDTH < 0 || duck.x > canvas.width) {
        ducks.splice(index, 1);
      }
    }
  });

  bullets.forEach((bullet, index) => {
    bullet.move();
    bullet.draw();
    if (bullet.y < 0) {
      bullets.splice(index, 1);
    }
  });

  obstacles.forEach((obstacle) => {
    obstacle.move();
    obstacle.draw();
  });

  checkHits();
  displayScore();

  if (ducksEscaped >= DUCK_ESCAPE_LIMIT) {
    endGame(false);
  } else if (ducks.length === 0 && ducksEscaped < DUCK_ESCAPE_LIMIT) {
    endGame(true);
  } else {
    requestAnimationFrame(gameLoop);
  }
}

function checkHits() {
  bullets.forEach((bullet, bIndex) => {
    ducks.forEach((duck, dIndex) => {
      if (!duck.hit && bullet.x > duck.x && bullet.x < duck.x + DUCK_WIDTH && bullet.y > duck.y && bullet.y < duck.y + DUCK_HEIGHT) {
        ducks.splice(dIndex, 1);
        score += Math.floor(Math.random() * 10) + 1;
        bullets.splice(bIndex, 1);
      }
    });
    obstacles.forEach((obstacle) => {
      if (bullet.x > obstacle.x && bullet.x < obstacle.x + OBSTACLE_WIDTH && bullet.y > obstacle.y && bullet.y < obstacle.y + OBSTACLE_HEIGHT) {
        bullets.splice(bIndex, 1);
      }
    });
  });
}

function displayScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Ducks Escaped: ${ducksEscaped}/${DUCK_ESCAPE_LIMIT}`, 10, 40);
}

function endGame(win) {
  gameActive = false;
  playButton.style.display = 'block';
  numDucksInput.disabled = false;
  minEscapeInput.disabled = false;
  ctx.fillStyle = win ? 'green' : 'red';
  ctx.font = '30px Arial';
  ctx.fillText(win ? "You Win!" : "Game Over!", canvas.width / 2 - 80, canvas.height / 2);
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 80, canvas.height / 2 + 40);
}

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  if (gameActive) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    bullets.push(new Bullet(x, y));
  }
});