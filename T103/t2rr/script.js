// Select chart elements
const chart = document.querySelector(".chart");
const barsContainer = chart.querySelector(".bars-container");
const yAxis = chart.querySelector(".y-axis");
const xAxis = chart.querySelector(".x-axis");

let data = [20, 50, 75, 30, 85, 60, 100, 45, 90, 15];

// Define a function to animate the bars
const animateBars = () => {
  // Select all bar elements within the container
  const bars = barsContainer.querySelectorAll(".bar");

  // Use anime.js to animate the bars
  anime({
    targets: bars,
    // Set the height of each bar based on the corresponding data value
    height: (el, i) => data[i] * 2,
    // Set a random background color for each bar
    backgroundColor: () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
    easing: "easeInOutSine",
    // Set a random duration for each bar's animation
    duration: () => Math.random() * 1000 + 500,
    // Set a delay for each bar's animation based on its index
    delay: (el, i) => i * 100,
  });
};

// Define a function to update the chart data and animate the bars
const updateChart = () => {
  // Update the data array with new random values
  data = data.map(() => Math.floor(Math.random() * 100) + 10);

  // Clear existing labels
  yAxis.innerHTML = "";
  xAxis.innerHTML = "";

  // Calculate bar positions
  const barWidth = 20;
  const barMargin = 30;
  const totalBarWidth = barWidth + barMargin;
  const containerWidth = data.length * totalBarWidth;

  // Update y-axis labels aligned with data values
  data.forEach((value, index) => {
    const yLabel = document.createElement("span");
    yLabel.textContent = value;
    yLabel.style.top = `${320 - value * 2}px`; // Align with top of bar
    yAxis.appendChild(yLabel);

    // Create x-axis labels aligned with bar centers
    const xLabel = document.createElement("span");
    xLabel.textContent = index;
    const xPosition = index * totalBarWidth + barWidth / 2;
    xLabel.style.left = `${xPosition}px`;
    xAxis.appendChild(xLabel);
  });

  // Animate bars
  animateBars();
};

// Initialize chart
updateChart();

// Update every 2 seconds
setInterval(updateChart, 2000);
