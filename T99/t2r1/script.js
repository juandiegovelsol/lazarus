// script.js

// Get the loading element and the loading percentage display
const loadingElement = document.querySelector(".loading-element");
const loadingPercentageDisplay = document.getElementById("loading-percentage");

// Initialize the loading percentage to 0
let loadingPercentage = 0;

// Function to update the loading percentage
function updateLoadingPercentage() {
  // Update the CSS variable --percentage
  loadingElement.style.setProperty("--percentage", `${loadingPercentage}deg`);

  // Update the loading percentage display
  loadingPercentageDisplay.textContent = `Loading: ${Math.round(
    loadingPercentage / 3.6
  )}%`;

  // Increment the loading percentage
  loadingPercentage++;

  // If the loading percentage is less than or equal to 360, call the function again after a delay
  if (loadingPercentage <= 360) {
    setTimeout(updateLoadingPercentage, 10);
  }
}

// Call the function to start the loading animation
updateLoadingPercentage();
