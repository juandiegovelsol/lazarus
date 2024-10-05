const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

const balls = [];
const barriers = [];

const gravity = 0.1; 
const friction = 0.99;
const restitution = 0.8;
const windSpeed = 3; // m/s
const maxBounces = 5;

const MAX_RADIUS = 10;

class Ball {
    constructor(x, y, radius, color) {
        Object.assign(this, { x, y, radius, color });
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = 0;
        this.bounces = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.dx += (Math.random() - 0.5) * 0.01 - windSpeed / 100; // Simulate wind
        this.dy += gravity; 

        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            this.dx = -this.dx * restitution;
            this.bounces++;
        }

        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.dx = -this.dx * restitution;
            this.bounces++;
        }

        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.dy = -this.dy * restitution;
            this.bounces++;
        }

        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.dy = -this.dy * restitution;
            this.bounces++;
        }

        if (this.bounces > maxBounces) {
            const index = balls.indexOf(this);
            if (index !== -1) {
                balls.splice(index, 1);
            }
        }

        barriers.forEach(barrier => {
            const { normalX, normalY, isColliding, contactPoint } = barrier.checkCollision(this.x, this.y, this.radius);
            if (isColliding) {
                const dotProduct = this.dx * normalX + this.dy * normalY;
                this.dx -= 2 * dotProduct * normalX;
                this.dy -= 2 * dotProduct * normalY;
                this.dx *= restitution;
                this.dy *= restitution;

                // Apply friction
                const tangentX = -normalY;
                const tangentY = normalX;
                const tangentVel = this.dx * tangentX + this.dy * tangentY;
                this.dx -= tangentVel * tangentX * barrier.friction;
                this.dy -= tangentVel * tangentY * barrier.friction;

                // Rotate barrier
                const impactForce = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
                barrier.applyTorque(impactForce, contactPoint);

                this.color = getRandomColor();
            }
        });

        balls.forEach(otherBall => {
            if (otherBall !== this) {
                const distance = Math.sqrt((this.x - otherBall.x) ** 2 + (this.y - otherBall.y) ** 2);
                if (distance < this.radius + otherBall.radius) {
                    const normalX = (this.x - otherBall.x) / distance;
                    const normalY = (this.y - otherBall.y) / distance;
                    const dotProduct = this.dx * normalX + this.dy * normalY;
                    this.dx -= 2 * dotProduct * normalX;
                    this.dy -= 2 * dotProduct * normalY;
                    this.dx *= restitution;
                    this.dy *= restitution;
                }
            }
        });

        this.draw();
    }
}

class Barrier {
    constructor(x, y, width, height, angle, color) {
        Object.assign(this, { x, y, width, height, angle, color });
        this.angularVelocity = 0;
        this.friction = 0.1;
        this.momentOfInertia = (width * width + height * height) / 12;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    checkCollision(bx, by, br) {
        const cos = Math.cos(-this.angle * Math.PI / 180);
        const sin = Math.sin(-this.angle * Math.PI / 180);
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
        const normalX = distance !== 0 ? (cos * distanceX / distance + sin * distanceY / distance) : 0;
        const normalY = distance !== 0 ? (-sin * distanceX / distance + cos * distanceY / distance) : 0;

        const contactX = cos * closestX - sin * closestY + this.x;
        const contactY = sin * closestX + cos * closestY + this.y;

        return { normalX, normalY, isColliding, contactPoint: { x: contactX, y: contactY } };
    }

    applyTorque(force, contactPoint) {
        const dx = contactPoint.x - (this.x + this.width / 2);
        const dy = contactPoint.y - (this.y + this.height / 2);
        const torque = force * (dx * Math.sin(this.angle * Math.PI / 180) - dy * Math.cos(this.angle * Math.PI / 180));
        this.angularVelocity += torque / this.momentOfInertia;
    }

    update() {
        this.angle += this.angularVelocity;
        this.angularVelocity *= 0.98;
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

for (let i = 0; i < 10; i++) {
    const radius = MAX_RADIUS;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = radius;
    const color = 'blue';
    balls.push(new Ball(x, y, radius, color));
}

barriers.push(new Barrier(100, 500, 150, 20, -20, 'black'));
barriers.push(new Barrier(600, 400, 150, 20, -20, 'black'));
barriers.push(new Barrier(200, 200, 100, 20, 45, 'black'));
barriers.push(new Barrier(400, 150, 120, 20, -45, 'black'));
barriers.push(new Barrier(500, 500, 200, 20, 15, 'black'));
barriers.push(new Barrier(800, 300, 150, 20, -15, 'black'));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.update());
    barriers.forEach(barrier => {
        barrier.update();
        barrier.draw();
    });
    requestAnimationFrame(animate);
}

animate();