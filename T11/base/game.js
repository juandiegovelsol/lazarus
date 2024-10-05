const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

class Player {
  constructor(x, y, size) {
    this.x = x;

    this.y = y;

    this.size = size;

    this.score = 0;
  }

  draw() {
    ctx.fillStyle = "blue";

    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move(direction) {
    const speed = 5;

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
  }

  draw() {
    ctx.fillStyle = "yellow";

    ctx.fillRect(this.x, this.y, this.size, this.size);
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

    this.direction = Math.random() < 0.5 ? 1 : -1;
  }

  draw() {
    ctx.fillStyle = "red";

    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x += this.direction * 2;

    if (this.x <= 0 || this.x >= canvas.width - this.size) {
      this.direction *= -1; // Change direction on boundary
    }
  }
}

const player = new Player(50, 50, 30);

const star = new Star(
  Math.random() * (canvas.width - 30),
  Math.random() * (canvas.height - 30),
  20
);

const obstacles = [new Obstacle(200, 100, 30), new Obstacle(400, 300, 30)];

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();

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
  }

  // Collision detection with obstacles

  obstacles.forEach((obstacle) => {
    if (
      player.x < obstacle.x + obstacle.size &&
      player.x + player.size > obstacle.x &&
      player.y < obstacle.y + obstacle.size &&
      player.y + player.size > obstacle.y
    ) {
      alert("Game Over! Your score was: " + player.score);

      document.location.reload(); // Reload the game
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
