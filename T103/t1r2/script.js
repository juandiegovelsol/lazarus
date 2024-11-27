// Select the chart container element
const container = document.querySelector(".chart");

let data = [20, 50, 75, 30, 85, 60, 100, 45, 90, 15];

// Define a function to animate the bars
const animateBars = () => {
  // Select all bar elements within the container
  const bars = container.querySelectorAll(".bar");

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
  // Animate the bars with the new data
  animateBars();
};

// Animate the bars initially
animateBars();

// Set an interval to update the chart every 2 seconds
setInterval(updateChart, 2000);
