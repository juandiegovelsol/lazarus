let score = 0;
let clickedShape = null;
let shapes = [];
let gameContainer = document.getElementById("game-container");
let scoreContainer = document.getElementById("score-container");

// Function to create a random shape
function createShape() {
  let shapeType = getRandomShapeType();
  let shapeColor = getRandomShapeColor();
  let shapeScale = getRandomShapeScale();
  let shapeX = getRandomPosition(gameContainer.offsetWidth - 50);
  let shapeY = getRandomPosition(gameContainer.offsetHeight - 50);

  let shape = document.createElement("div");
  shape.classList.add("shape", shapeType);
  shape.style.background = shapeType === "triangle" ? "" : shapeColor;
  shape.style.borderBottomColor = shapeType === "triangle" ? shapeColor : "";
  shape.style.transform = `scale(${shapeScale}) translate(${shapeX}px, ${shapeY}px)`;
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

// Function to get random shape scale
function getRandomShapeScale() {
  return Math.random() * 2 + 0.5;
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