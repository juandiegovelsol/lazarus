// script.js

// Get the loading element and percentage display
const loadingElement = document.querySelector(".loading-element");
const percentageDisplay = document.querySelector(".percentage-display");

// Initialize the loading percentage to 0
let percentage = 0;

// Create an interval to simulate the loading process
const interval = setInterval(() => {
  // Increment the loading percentage by 1
  percentage += 1;

  // Update the CSS variable (--percentage) with the new percentage value
  loadingElement.style.setProperty("--percentage", percentage);

  // Update the percentage display
  percentageDisplay.textContent = `${percentage}%`;

  // If the loading percentage reaches 100, clear the interval
  if (percentage >= 100) {
    clearInterval(interval);
  }
}, 50);
