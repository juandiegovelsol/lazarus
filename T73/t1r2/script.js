let score = 0;
let selectedShape = null;
let shapes = ["circle", "square", "triangle"];
let colors = ["#007bff", "#dc3545", "#28a745"];
let sizes = [50, 75, 100];

function createShape() {
  let shape = document.createElement("div");
  shape.className =
    "shape " + shapes[Math.floor(Math.random() * shapes.length)];
  shape.style.width = sizes[Math.floor(Math.random() * sizes.length)] + "px";
  shape.style.height = sizes[Math.floor(Math.random() * sizes.length)] + "px";
  shape.style.background = colors[Math.floor(Math.random() * colors.length)];
  shape.style.top = Math.floor(Math.random() * 550) + "px";
  shape.style.left = Math.floor(Math.random() * 750) + "px";
  shape.onclick = selectShape;
  document.getElementById("game-container").appendChild(shape);
  setTimeout(() => {
    shape.remove();
  }, 2000);
}

function selectShape(e) {
  let shape = e.target;
  if (selectedShape === null) {
    selectedShape = shape;
  } else {
    if (selectedShape.className === shape.className) {
      score++;
    } else {
      score--;
    }
    selectedShape = null;
    document.getElementById("score").innerHTML = "Score: " + score;
  }
}

setInterval(createShape, 500);
