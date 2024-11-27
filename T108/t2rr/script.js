// Get all bars, the chart, and the custom cursor
const bars = document.querySelectorAll(".bar");
const chart = document.querySelector(".chart");
const cursor = document.getElementById("cursor");

// Colors for the cursor
const colors = ["#ff9999", "#99ccff", "#99ff99", "#ffcc99", "#ccccff"];

// Function to generate a random color
function getRandomColor() {
  // Return a random color from the colors array
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to set the height and position of each bar based on its value
function setBarHeights() {
  // Calculate the maximum absolute value of all data-values using reduce
  const maxValue = Array.from(bars).reduce((max, bar) => {
    const value = Math.abs(parseInt(bar.getAttribute("data-value")));
    return Math.max(max, value);
  }, 0);

  // Loop through each bar and set its height and position
  bars.forEach((bar, index) => {
    const value = parseInt(bar.getAttribute("data-value"));
    // Calculate the height of the bar as a proportion of the maximum value
    const maxHeight = chart.offsetHeight - 40; // Subtract 40 from the chart height to leave some space at the top and bottom
    const height = ((Math.abs(value) / maxValue) * maxHeight) / 2;

    // Set the height and position of the bar
    bar.style.height = `${height}px`;
    if (value < 0) {
      bar.style.top = `${chart.offsetHeight / 2}px`;
      bar.style.background = `#ff0000`;
    } else {
      bar.style.bottom = `${chart.offsetHeight / 2}px`;
      bar.style.background = `#007bff`;
    }

    // Set the left position of the bar
    bar.style.left = `${(index / bars.length) * chart.offsetWidth + 10}px`;
  });
}

// Set the height and position of each bar
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
