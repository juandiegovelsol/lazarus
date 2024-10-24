let score = 0;
let clickedShape = null;
let shapes = [];
let gameContainer = document.getElementById("game-container");
let scoreContainer = document.getElementById("score-container");

// Function to create a random shape
function createShape() {
  let shapeType = getRandomShapeType();
  let shapeSize = getRandomShapeSize();
  let shapeColor = getRandomShapeColor();
  let shapeX = getRandomPosition(gameContainer.offsetWidth - shapeSize);
  let shapeY = getRandomPosition(gameContainer.offsetHeight - shapeSize);

  let shape = document.createElement("div");
  shape.classList.add("shape", shapeType);

  if (shapeType === "triangle") {
    shape.style.width = "0";
    shape.style.height = "0";
    shape.style.borderLeft = shapeSize / 2 + "px solid transparent";
    shape.style.borderRight = shapeSize / 2 + "px solid transparent";
    shape.style.borderBottom = shapeSize + "px solid " + shapeColor;
  } else {
    shape.style.width = shapeSize + "px";
    shape.style.height = shapeSize + "px";
    shape.style.background = shapeColor;
  }

  shape.style.left = shapeX + "px";
  shape.style.top = shapeY + "px";

  shape.addEventListener("click", () => {
    shapeClicked(shape, shapeType);
  });

  gameContainer.appendChild(shape);
  shapes.push({ shape, type: shapeType });

  // Remove shape after a random time
  setTimeout(() => {
    removeShape(shape);
  }, getRandomDuration());
}

// Function to handle shape click
function shapeClicked(shape, shapeType) {
  if (clickedShape === null) {
    clickedShape = { shape, type: shapeType };
  } else {
    if (clickedShape.type === shapeType) {
      score++;
    } else {
      score--;
    }
    scoreContainer.children[0].innerText = "Score: " + score;
    clickedShape = null;
  }
}

// Function to remove shape
function removeShape(shape) {
  shape.remove();
  shapes = shapes.filter((s) => s.shape !== shape);
}

// Function to get random shape type
function getRandomShapeType() {
  let types = ["circle", "square", "triangle"];
  return types[Math.floor(Math.random() * types.length)];
}

// Function to get random shape size
function getRandomShapeSize() {
  return Math.floor(Math.random() * 50) + 20;
}

// Function to get random shape color
function getRandomShapeColor() {
  let colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to get random position
function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

// Function to get random duration
function getRandomDuration() {
  return Math.floor(Math.random() * 5000) + 1000;
}

// Create shapes at regular intervals
setInterval(() => {
  createShape();
}, 1000);
