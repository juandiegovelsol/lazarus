const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

class Player {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.score = 0;
    this.speed = 5;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move(direction) {
    const speed = this.speed;
    switch (direction) {
      case "up":
        this.y -= speed;
        break;
      case "down":
        this.y += speed;
        break;
      case "left":
        this.x -= speed;
        break;
      case "right":
        this.x += speed;
        break;
      case "up-left":
        this.y -= speed;
        this.x -= speed;
        break;
      case "up-right":
        this.y -= speed;
        this.x += speed;
        break;
      case "down-left":
        this.y += speed;
        this.x -= speed;
        break;
      case "down-right":
        this.y += speed;
        this.x += speed;
        break;
    }

    this.y = Math.max(0, Math.min(canvas.height - this.size, this.y));
    this.x = Math.max(0, Math.min(canvas.width - this.size, this.x));
  }
}

class Star {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = Math.random() < 0.5 ? 1 : -1;
    this.speedY = Math.random() < 0.5 ? 1 : -1;
  }

  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x += this.speedX * 2;
    this.y += this.speedY * 2;

    if (this.x <= 0 || this.x >= canvas.width - this.size) {
      this.speedX *= -1;
    }
    if (this.y <= 0 || this.y >= canvas.height - this.size) {
      this.speedY *= -1;
    }
  }

  reset() {
    this.x = Math.random() * (canvas.width - this.size);
    this.y = Math.random() * (canvas.height - this.size);
  }
}

class Obstacle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = Math.random() < 0.5 ? 1 : -1;
    this.speedY = Math.random() < 0.5 ? 1 : -1;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x += this.speedX * 2;
    this.y += this.speedY * 2;

    if (this.x <= 0 || this.x >= canvas.width - this.size) {
      this.speedX *= -1;
    }
    if (this.y <= 0 || this.y >= canvas.height - this.size) {
      this.speedY *= -1;
    }
  }
}

let player = new Player(50, 50, 30);
let star = new Star(
  Math.random() * (canvas.width - 30),
  Math.random() * (canvas.height - 30),
  20
);
let obstacles = [];

function addObstacle() {
  obstacles.push(
    new Obstacle(
      Math.random() * (canvas.width - 30),
      Math.random() * (canvas.height - 30),
      30
    )
  );
}

function initGame() {
  player = new Player(50, 50, 30);
  star = new Star(
    Math.random() * (canvas.width - 30),
    Math.random() * (canvas.height - 30),
    20
  );
  obstacles = [];
  addObstacle();
  addObstacle();
  document.getElementById("score").innerText = "Score: 0";
}

initGame();

function showGameOver() {
  const gameOverDiv = document.createElement("div");
  gameOverDiv.id = "game-over";
  gameOverDiv.style.position = "absolute";
  gameOverDiv.style.top = "50%";
  gameOverDiv.style.left = "50%";
  gameOverDiv.style.transform = "translate(-50%, -50%)";
  gameOverDiv.style.textAlign = "center";
  gameOverDiv.innerHTML = `
    <h2>Game Over! Score ${player.score}</h2>
    <button id="restart-button">Restart</button>
  `;
  document.body.appendChild(gameOverDiv);

  document.getElementById("restart-button").addEventListener("click", () => {
    document.body.removeChild(gameOverDiv);
    initGame();
    update();
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();

  star.move();
  star.draw();

  obstacles.forEach((obstacle) => {
    obstacle.move();
    obstacle.draw();
  });

  if (
    player.x < star.x + star.size &&
    player.x + player.size > star.x &&
    player.y < star.y + star.size &&
    player.y + player.size > star.y
  ) {
    player.score++;
    document.getElementById("score").innerText = `Score: ${player.score}`;
    star.reset();

    player.speed = Math.min(10, player.speed + 0.5);

    obstacles.forEach((obstacle) => {
      obstacle.speedX *= 1.1;
      obstacle.speedY *= 1.1;
    });

    if (player.score % 5 === 0) {
      addObstacle();
    }
  }

  for (let obstacle of obstacles) {
    if (
      player.x < obstacle.x + obstacle.size &&
      player.x + player.size > obstacle.x &&
      player.y < obstacle.y + obstacle.size &&
      player.y + player.size > obstacle.y
    ) {
      showGameOver();
      return;
    }
  }

  requestAnimationFrame(update);
}

let keysPressed = {};

window.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;
  updatePlayerMovement();
});

window.addEventListener("keyup", (event) => {
  keysPressed[event.key] = false;
  updatePlayerMovement();
});

function updatePlayerMovement() {
  const directions = [];
  if (keysPressed["w"]) directions.push("up");
  if (keysPressed["s"]) directions.push("down");
  if (keysPressed["a"]) directions.push("left");
  if (keysPressed["d"]) directions.push("right");

  if (directions.includes("up") && directions.includes("left")) {
    player.move("up-left");
  } else if (directions.includes("up") && directions.includes("right")) {
    player.move("up-right");
  } else if (directions.includes("down") && directions.includes("left")) {
    player.move("down-left");
  } else if (directions.includes("down") && directions.includes("right")) {
    player.move("down-right");
  } else if (directions.length > 0) {
    player.move(directions[0]);
  }
}

update();
