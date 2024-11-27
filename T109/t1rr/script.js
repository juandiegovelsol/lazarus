// Sample JSON data array
const data = Array.from({ length: 120 }, () =>
  Math.floor(Math.random() * 200 - 100)
); // Example random data between -100 and 100

// Max number of bars allowed
const MAX_BARS = 100;
// Max height of the chart container
const MAX_HEIGHT =
  document.getElementsByClassName("chart-container")[0].offsetHeight - 40;
// Reference to chart container
const chart = document.getElementById("chart");

// Function to create the chart
function createChart(data) {
  if (data.length > MAX_BARS) {
    alert(`Only the first ${MAX_BARS} data points will be displayed.`);
    data = data.slice(0, MAX_BARS); // Truncate data to MAX_BARS
  }

  // Get the max absolute value from the data for scaling
  const maxValue = Math.max(...data.map(Math.abs));

  // Add the center line
  const centerLine = document.createElement("div");
  centerLine.classList.add("center-line");
  chart.appendChild(centerLine);

  // Create bars dynamically
  data.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    if (value < 0) {
      bar.classList.add("negative");
    }

    // Calculate height as percentage of the container
    const height = (Math.abs(value / maxValue) * MAX_HEIGHT) / 2; // 50% of the container height
    bar.style.height = `${height}px`;

    // Position bars above or below the center line
    if (value < 0) {
      bar.style.top = `${height / 2}px`;
    } else {
      bar.style.bottom = `${height / 2}px`;
    }
    chart.appendChild(bar);
  });
}

// Initialize the chart with data
createChart(data);
