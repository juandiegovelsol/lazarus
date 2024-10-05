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
    switch (direction) {
      case "up":
        this.y -= this.speed;
        break;
      case "down":
        this.y += this.speed;
        break;
      case "left":
        this.x -= this.speed;
        break;
      case "right":
        this.x += this.speed;
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
      this.speedX *= -1; // Change direction on boundary
    }
    if (this.y <= 0 || this.y >= canvas.height - this.size) {
      this.speedY *= -1; // Change direction on boundary
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
      this.speedX *= -1; // Change direction on boundary
    }
    if (this.y <= 0 || this.y >= canvas.height - this.size) {
      this.speedY *= -1; // Change direction on boundary
    }
  }
}

const player = new Player(50, 50, 30);
const star = new Star(
  Math.random() * (canvas.width - 30),
  Math.random() * (canvas.height - 30),
  20
);
const obstacles = [];

function addObstacle() {
  obstacles.push(
    new Obstacle(
      Math.random() * (canvas.width - 30),
      Math.random() * (canvas.height - 30),
      30
    )
  );
}

addObstacle();
addObstacle();

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();

  star.move();
  star.draw();

  obstacles.forEach((obstacle) => {
    obstacle.move();
    obstacle.draw();
  });

  // Collision detection with the star
  if (
    player.x < star.x + star.size &&
    player.x + player.size > star.x &&
    player.y < star.y + star.size &&
    player.y + player.size > star.y
  ) {
    player.score++;
    document.getElementById("score").innerText = `Score: ${player.score}`;
    star.reset();

    // Increase player speed
    player.speed = Math.min(10, player.speed + 0.5);

    // Increase obstacle speed
    obstacles.forEach((obstacle) => {
      obstacle.speedX *= 1.1;
      obstacle.speedY *= 1.1;
    });

    // Add a new obstacle
    if (player.score % 5 === 0) {
      addObstacle();
    }
  }

  // Collision detection with obstacles
  obstacles.forEach((obstacle) => {
    if (
      player.x < obstacle.x + obstacle.size &&
      player.x + player.size > obstacle.x &&
      player.y < obstacle.y + obstacle.size &&
      player.y + player.size > obstacle.y
    ) {
      // Game Over
      const gameOverDiv = document.createElement("div");
      gameOverDiv.style.position = "absolute";
      gameOverDiv.style.top = "50%";
      gameOverDiv.style.left = "50%";
      gameOverDiv.style.transform = "translate(-50%, -50%)";
      gameOverDiv.style.textAlign = "center";
      gameOverDiv.innerHTML = `
                <h2>Game Over!</h2>
                <p>Your score was: ${player.score}</p>
                <button id="restart-button">Restart</button>
            `;
      document.body.appendChild(gameOverDiv);

      document
        .getElementById("restart-button")
        .addEventListener("click", () => {
          document.location.reload();
        });

      // Stop the game loop
      return;
    }
  });

  requestAnimationFrame(update);
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      player.move("up");
      break;
    case "s":
      player.move("down");
      break;
    case "a":
      player.move("left");
      break;
    case "d":
      player.move("right");
      break;
  }
});

update();
