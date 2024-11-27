// Get all bars and the custom cursor
const bars = document.querySelectorAll(".bar");
const cursor = document.getElementById("cursor");

// Colors for the cursor
const colors = ["#ff9999", "#99ccff", "#99ff99", "#ffcc99", "#ccccff"];

// Function to generate a random color
function getRandomColor() {
  // Return a random color from the colors array
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to set the height of each bar based on its data-value
function setBarHeights() {
  // Calculate the total sum of all data-values using reduce
  const totalValue = Array.from(bars).reduce((sum, bar) => {
    const value = parseInt(bar.getAttribute("data-value"));
    if (value < 0) {
      alert("Negative values are not accepted");
      return sum;
    }
    return sum + value;
  }, 0);

  // Loop through each bar and set its height proportional to the total value
  bars.forEach((bar) => {
    const value = parseInt(bar.getAttribute("data-value"));
    // Calculate the height of the bar as a proportion of the total value
    const maxHeight = 280; // Subtract 20 from the chart height to leave some space at the top

    let height = 0;
    if (value > 0) {
      height = (value / totalValue) * maxHeight;
    }

    // Set the height of the bar
    bar.style.height = `${height}px`;
  });
}

// Set the height of each bar
setBarHeights();

// Update the cursor's position
document.addEventListener("mousemove", (event) => {
  // Set the left and top positions of the cursor to the mouse coordinates
  cursor.style.left = `${event.pageX}px`;
  cursor.style.top = `${event.pageY}px`;
});

// Hover effect for bars
bars.forEach((bar) => {
  // Add a mouseover event listener to each bar
  bar.addEventListener("mouseover", () => {
    // Get a random color
    const newColor = getRandomColor();

    // Set the background color of the cursor to the random color
    cursor.style.backgroundColor = newColor;

    // Scale up the cursor
    cursor.style.transform = "scale(1.5)";
  });

  // Add a mouseleave event listener to each bar
  bar.addEventListener("mouseleave", () => {
    // Reset the background color of the cursor
    cursor.style.backgroundColor = "#007bff";

    // Reset the scale of the cursor
    cursor.style.transform = "scale(1)";
  });
});
