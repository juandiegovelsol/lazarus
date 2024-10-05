// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playButton = document.getElementById('playButton');

const MAX_DUCKS = 25;
const DUCK_ESCAPE_LIMIT = 5;
const DUCK_WIDTH = 40;
const DUCK_HEIGHT = 30;
const BULLET_RADIUS = 5;
let ducks = [];
let bullets = [];
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
  }

  move() {
    this.x += this.speedX;
    this.y -= this.speedY;
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
  }

  move() {
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

playButton.addEventListener('click', startGame);

function startGame() {
  playButton.style.display = 'none';
  gameActive = true;
  ducks = [];
  bullets = [];
  score = 0;
  ducksEscaped = 0;
  createDucks();
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
        // Remove ducks that go off-screen horizontally
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

  checkHits();
  displayScore();

  if (ducksEscaped >= DUCK_ESCAPE_LIMIT) {
    endGame();
  } else {
    requestAnimationFrame(gameLoop);
  }
}

function checkHits() {
  bullets.forEach((bullet, bIndex) => {
    ducks.forEach((duck, dIndex) => {
      if (!duck.hit && bullet.x > duck.x && bullet.x < duck.x + DUCK_WIDTH && bullet.y > duck.y && bullet.y < duck.y + DUCK_HEIGHT) {
        ducks.splice(dIndex, 1);
        score += Math.floor(Math.random() * 10) + 1; // Increase score on hit
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

function endGame() {
  gameActive = false;
  playButton.style.display = 'block';
  ctx.fillStyle = 'red';
  ctx.font = '30px Arial';
  ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2);
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