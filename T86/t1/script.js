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

  // Calculate boundaries considering the shape type and scale
  let effectiveWidth, effectiveHeight;

  if (shapeType === "triangle") {
    // For triangles, consider the border width
    effectiveWidth = 50 * shapeScale; // Total width of triangle (25px + 25px borders)
    effectiveHeight = 50 * shapeScale; // Height of triangle
  } else {
    effectiveWidth = scaledSize;
    effectiveHeight = scaledSize;
  }

  // Calculate safe boundaries
  const minX = effectiveWidth / 2;
  const minY = effectiveHeight / 2;
  const maxX = gameContainer.offsetWidth - effectiveWidth / 2;
  const maxY = gameContainer.offsetHeight - effectiveHeight / 2;

  // Ensure positions are within safe boundaries
  const x = Math.max(
    minX,
    Math.min(maxX - 2, minX + Math.random() * (maxX - minX) - 2)
  );
  const y = Math.max(
    minY,
    Math.min(maxY - 2, minY + Math.random() * (maxY - minY) - 2)
  );

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
    shape.style.opacity = "0.7";
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
      clickedShape.shape.style.opacity = "1";
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

// Function to get random scale (adjusted for better visibility and containment)
function getRandomScale() {
  return 0.5 + Math.random() * 0.3; // Modified scale range from 0.5 to 0.8
}

// Function to get random duration (adjusted for better gameplay)
function getRandomDuration() {
  return 3000 + Math.floor(Math.random() * 7000); // Between 3 and 10 seconds
}

setInterval(createShape, 1000);
