// Get all bars and the custom cursor
const bars = document.querySelectorAll(".bar");
const cursor = document.getElementById("cursor");

// Colors for the cursor
const colors = ["#ff9999", "#99ccff", "#99ff99", "#ffcc99", "#ccccff"];

// Function to generate a random color
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Update the cursor's position
document.addEventListener("mousemove", (event) => {
  cursor.style.left = `${event.pageX}px`;
  cursor.style.top = `${event.pageY}px`;
});

// Hover effect for bars
bars.forEach((bar) => {
  bar.addEventListener("mouseover", () => {
    const newColor = getRandomColor();
    cursor.style.backgroundColor = newColor;
    cursor.style.transform = "scale(1.5)";
  });

  bar.addEventListener("mouseleave", () => {
    cursor.style.backgroundColor = "#007bff";
    cursor.style.transform = "scale(1)";
  });
});
