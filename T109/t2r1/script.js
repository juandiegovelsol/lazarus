// Sample JSON data array
const DATA = Array.from({ length: 120 }, () =>
  Math.floor(Math.random() * 200 - 100)
);

// Reference to chart container
const CHART = document.getElementById("chart");

// Function to create the chart
function createChart(data) {
  // Maximum number of bars allowed in the chart
  const MAX_BARS_ALLOWED = 100;

  if (data.length > MAX_BARS_ALLOWED) {
    // Only display the first MAX_BARS_ALLOWED data points if there are more than MAX_BARS_ALLOWED data points
    alert(`Only the first ${MAX_BARS_ALLOWED} data points will be displayed.`);
    data = data.slice(0, MAX_BARS_ALLOWED);
  }

  // Maximum height of the chart container
  const MAX_CHART_CONTAINER_HEIGHT =
    document.getElementsByClassName("chart-container")[0].offsetHeight - 40;

  // Get the max absolute value from the data for scaling
  const maxValue = Math.max(...data.map(Math.abs));

  // Add the center line
  const centerLine = document.createElement("div");
  centerLine.classList.add("center-line");
  CHART.appendChild(centerLine);

  // Create bars dynamically
  data.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    if (value < 0) {
      bar.classList.add("negative");
    }

    // Calculate height as a fraction of MAX_CHART_CONTAINER_HEIGHT to ensure bars do not exceed the chart height
    const height =
      (Math.abs(value / maxValue) * MAX_CHART_CONTAINER_HEIGHT) / 2;
    bar.style.height = `${height}px`;

    // Position bars above or below the center line
    if (value < 0) {
      bar.style.top = `${height / 2}px`;
    } else {
      bar.style.bottom = `${height / 2}px`;
    }
    CHART.appendChild(bar);
  });
}

// Initialize the chart with data
createChart(DATA);
