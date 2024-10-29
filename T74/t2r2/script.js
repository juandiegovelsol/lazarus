let score = 0;
let clickedShape = null;
let shapes = [];
let gameContainer = document.getElementById("game-container");
let scoreContainer = document.getElementById("score-container");

// Function to create a random shape
function createShape() {
  const shapeType = getRandomShapeType();
  const shapeColor = getRandomShapeColor();
  const shapeScale = getRandomScale();
  const baseSize = 50;
  const scaledSize = baseSize * shapeScale;
  const halfScaledSize = scaledSize / 2;

  const minPos = halfScaledSize;
  const maxX = gameContainer.offsetWidth - halfScaledSize;
  const maxY = gameContainer.offsetHeight - halfScaledSize;

  const x = minPos + Math.random() * (maxX - minPos);
  const y = minPos + Math.random() * (maxY - minPos);

  const shape = document.createElement("div");
  shape.classList.add("shape", shapeType);

  if (shapeType === "triangle") {
    shape.style.borderBottomColor = shapeColor;
  } else {
    shape.style.backgroundColor = shapeColor;
  }

  shape.style.left = `${x}px`;
  shape.style.top = `${y}px`;
  shape.style.transform = `translate(-50%, -50%) scale(${shapeScale})`;

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
    shape.classList.add("clicked");
  } else {
    if (clickedShape.type === shapeType) {
      score++;
      clickedShape.shape.remove();
      shape.remove();
      shapes = shapes.filter(
        (s) => s.shape !== clickedShape.shape && s.shape !== shape
      );
    } else {
      score--;
      clickedShape.shape.classList.remove("clicked");
    }
    scoreContainer.children[0].innerText = "Score: " + score;
    clickedShape = null;
  }
}

// Function to remove shape
function removeShape(shape) {
  if (shape.parentNode === gameContainer) {
    shape.remove();
    shapes = shapes.filter((s) => s.shape !== shape);
  }
}

// Function to get random shape type
function getRandomShapeType() {
  const types = ["circle", "square", "triangle"];
  return types[Math.floor(Math.random() * types.length)];
}

// Function to get random shape color
function getRandomShapeColor() {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to get random scale
function getRandomScale() {
  return 0.5 + Math.random() * 0.5;
}

// Function to get random duration
function getRandomDuration() {
  return 2000 + Math.floor(Math.random() * 3000);
}

// Create shapes at regular intervals
setInterval(createShape, 1000);
