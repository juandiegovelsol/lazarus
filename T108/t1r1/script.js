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
  // Move the cursor to the current mouse position
  cursor.style.left = `${event.pageX}px`;
  cursor.style.top = `${event.pageY}px`;
});

// Set the initial height of each bar based on its data-value attribute
bars.forEach((bar) => {
  const height = bar.getAttribute("data-value");
  bar.style.height = `${height}px`;
});

// Hover effect for bars
bars.forEach((bar) => {
  bar.addEventListener("mouseover", () => {
    // Change the cursor's color to a random color
    const newColor = getRandomColor();
    cursor.style.backgroundColor = newColor;
    // Scale up the cursor
    cursor.style.transform = "scale(1.5)";
  });

  bar.addEventListener("mouseleave", () => {
    // Reset the cursor's color to its default color
    cursor.style.backgroundColor = "#007bff";
    // Reset the cursor's scale
    cursor.style.transform = "scale(1)";
  });
});
