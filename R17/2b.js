/**
 * Simulation of balls falling and interacting with rotating barriers.
 */

// Get the canvas element
const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");

// Constants
const GRAVITY = 0.1;
const FRICTION = 0.99;
const RESTITUTION = 0.8;
const MAX_RADIUS = 10;
const MAX_BOUNCES = 5;
const WIND_SPEED = 3; // 3 m/s
const WIND_ANGLE = (315 * Math.PI) / 180; // 315 degrees in radians (NW direction)

// Calculate wind force
const WIND_FORCE_X = (WIND_SPEED * Math.cos(WIND_ANGLE)) / 60; // Divide by 60 to convert m/s to pixels per frame
const WIND_FORCE_Y = (-WIND_SPEED * Math.sin(WIND_ANGLE)) / 60; // Negative because canvas Y is inverted

// Arrays to hold balls and barriers
const balls = [];
const barriers = [];

/**
 * Represents a ball in the simulation.
 */
class Ball {
  /**
   * Creates a new ball.
   * @param {number} x - The x-coordinate of the ball.
   * @param {number} y - The y-coordinate of the ball.
   * @param {number} radius - The radius of the ball.
   * @param {string} color - The color of the ball.
   */
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = (Math.random() - 0.5) * 2;
    this.dy = 0;
    this.bounces = 0;
  }

  /**
   * Draws the ball on the canvas.
   */
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  /**
   * Updates the ball's position and velocity.
   */
  update() {
    this.dy += GRAVITY;
    this.dy *= FRICTION;
    this.dx *= FRICTION;

    // Apply wind force
    this.dx += WIND_FORCE_X;
    this.dy += WIND_FORCE_Y;

    this.x += this.dx;
    this.y += this.dy;

    // Check for collisions with the edge of the screen
    if (this.x + this.radius > canvas.width) {
      this.x = canvas.width - this.radius;
      this.dx = -this.dx * RESTITUTION;
      this.bounces++;
    }

    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.dx = -this.dx * RESTITUTION;
      this.bounces++;
    }

    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.dy = -this.dy * RESTITUTION;
    }

    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.dy = -this.dy * RESTITUTION;
      this.bounces++;
    }

    // Check for collisions with barriers
    barriers.forEach((barrier) => {
      const { normalX, normalY, isColliding, contactPoint } =
        barrier.checkCollision(this.x, this.y, this.radius);
      if (isColliding) {
        const dotProduct = this.dx * normalX + this.dy * normalY;
        this.dx -= 2 * dotProduct * normalX;
        this.dy -= 2 * dotProduct * normalY;
        this.dx *= RESTITUTION;
        this.dy *= RESTITUTION;

        const tangentX = -normalY;
        const tangentY = normalX;
        const tangentVel = this.dx * tangentX + this.dy * tangentY;
        this.dx -= tangentVel * tangentX * barrier.friction;
        this.dy -= tangentVel * tangentY * barrier.friction;

        const impactForce = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        barrier.applyTorque(impactForce, contactPoint);

        this.color = getRandomColor();
        this.bounces++;
      }
    });

    // Check for collisions with other balls
    balls.forEach((otherBall) => {
      if (otherBall !== this) {
        const distance = Math.sqrt(
          (this.x - otherBall.x) ** 2 + (this.y - otherBall.y) ** 2
        );
        if (distance < this.radius + otherBall.radius) {
          const normalX = (this.x - otherBall.x) / distance;
          const normalY = (this.y - otherBall.y) / distance;
          const dotProduct = this.dx * normalX + this.dy * normalY;
          this.dx -= 2 * dotProduct * normalX;
          this.dy -= 2 * dotProduct * normalY;
          this.dx *= RESTITUTION;
          this.dy *= RESTITUTION;
          this.color = getRandomColor();
          this.bounces++;
        }
      }
    });

    // Remove the ball if it has bounced too many times
    if (this.bounces >= MAX_BOUNCES) {
      balls.splice(balls.indexOf(this), 1);
    }

    this.draw();
  }
}

/**
 * Represents a barrier in the simulation.
 */
class Barrier {
  /**
   * Creates a new barrier.
   * @param {number} x - The x-coordinate of the barrier.
   * @param {number} y - The y-coordinate of the barrier.
   * @param {number} width - The width of the barrier.
   * @param {number} height - The height of the barrier.
   * @param {number} angle - The angle of the barrier.
   * @param {string} color - The color of the barrier.
   */
  constructor(x, y, width, height, angle, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.color = color;
    this.angularVelocity = 0;
    this.friction = 0.1;
    this.momentOfInertia = (width * width + height * height) / 12;
  }

  /**
   * Draws the barrier on the canvas.
   */
  draw() {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  /**
   * Checks if a ball is colliding with the barrier.
   * @param {number} bx - The x-coordinate of the ball.
   * @param {number} by - The y-coordinate of the ball.
   * @param {number} br - The radius of the ball.
   * @return {object} An object containing the normal vector, collision status, and contact point.
   */
  checkCollision(bx, by, br) {
    const cos = Math.cos((-this.angle * Math.PI) / 180);
    const sin = Math.sin((-this.angle * Math.PI) / 180);
    const dx = bx - (this.x + this.width / 2);
    const dy = by - (this.y + this.height / 2);
    const localX = cos * dx - sin * dy + this.width / 2;
    const localY = sin * dx + cos * dy + this.height / 2;

    const closestX = Math.max(0, Math.min(this.width, localX));
    const closestY = Math.max(0, Math.min(this.height, localY));

    const distanceX = localX - closestX;
    const distanceY = localY - closestY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const isColliding = distance < br;
    const normalX =
      distance !== 0
        ? (cos * distanceX) / distance + (sin * distanceY) / distance
        : 0;
    const normalY =
      distance !== 0
        ? (-sin * distanceX) / distance + (cos * distanceY) / distance
        : 0;

    const contactX = cos * closestX - sin * closestY + this.x;
    const contactY = sin * closestX + cos * closestY + this.y;

    return {
      normalX,
      normalY,
      isColliding,
      contactPoint: { x: contactX, y: contactY },
    };
  }

  /**
   * Applies torque to the barrier.
   * @param {number} force - The force applied to the barrier.
   * @param {object} contactPoint - The point where the force is applied.
   */
  applyTorque(force, contactPoint) {
    const dx = contactPoint.x - (this.x + this.width / 2);
    const dy = contactPoint.y - (this.y + this.height / 2);
    const torque =
      force *
      (dx * Math.sin((this.angle * Math.PI) / 180) -
        dy * Math.cos((this.angle * Math.PI) / 180));
    this.angularVelocity += torque / this.momentOfInertia;
  }

  /**
   * Updates the barrier's angle and angular velocity.
   */
  update() {
    this.angle += this.angularVelocity;
    this.angularVelocity *= 0.98;
  }
}

/**
 * Generates a random color.
 * @return {string} A random color in hexadecimal format.
 */
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Create balls and barriers
for (let i = 0; i < 100; i++) {
  const radius = MAX_RADIUS;
  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * 100 + radius;
  const color = "blue";
  balls.push(new Ball(x, y, radius, color));
}

barriers.push(new Barrier(100, 500, 150, 20, -20, "black"));
barriers.push(new Barrier(600, 400, 150, 20, -20, "black"));
barriers.push(new Barrier(200, 200, 100, 20, 45, "black"));
barriers.push(new Barrier(400, 150, 120, 20, -45, "black"));
barriers.push(new Barrier(500, 500, 200, 20, 15, "black"));
barriers.push(new Barrier(800, 300, 150, 20, -15, "black"));

// Animate the simulation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => ball.update());
  barriers.forEach((barrier) => {
    barrier.update();
    barrier.draw();
  });
  requestAnimationFrame(animate);
}

animate();
