// Place JavaScript code here

const car = document.getElementById("car");
const startButton = document.getElementById("startButton");
const message = document.getElementById("message");
let interval;
let mouseX = 0;
let mouseY = 0;
let speed = 2; // Speed of the car

function moveCar() {
  const carRect = car.getBoundingClientRect();
  const carX = carRect.left + carRect.width / 2;
  const carY = carRect.top + carRect.height / 2;

  // Calculate the direction to the mouse cursor
  const deltaX = mouseX - carX;
  const deltaY = mouseY - carY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Move the car towards the mouse cursor if it is not at the target
  if (distance > speed) {
    const moveX = (deltaX / distance) * speed;
    const moveY = (deltaY / distance) * speed;

    // Update the car's position using transform
    car.style.transform = `translate(${carX + moveX - 50}px, ${
      carY + moveY - 10
    }px)`; // Adjust position to center the car
  }

  // Check for collision
  if (checkCollision(carRect)) {
    resetCar();
    displayCaughtMessage();
  }
}

// Check for collision with the mouse position
function checkCollision(carRect) {
  return (
    carRect.left < mouseX &&
    carRect.right > mouseX &&
    carRect.top < mouseY &&
    carRect.bottom > mouseY
  );
}

function resetCar() {
  car.style.transform = "translate(0, 0)"; // Reset position to the starting point
}

function displayCaughtMessage() {
  message.textContent = "YOU GOT CAUGHT!";
  message.style.display = "block";
  clearInterval(interval);
}

startButton.addEventListener("click", () => {
  resetCar();
  message.style.display = "none"; // Hide the message when starting again
  interval = setInterval(moveCar, 20); // Start moving the car
});

// Update mouse position on mousemove
document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});
