// Select the chart container element
const container = document.querySelector(".chart");

// Initialize the data array with random values
let data = [20, 50, 75, 30, 85, 60, 100, 45, 90, 15];

// Define a function to animate the bars
const animateBars = () => {
  // Select all bar elements inside the chart container
  const bars = container.querySelectorAll(".bar");

  // Use Anime.js to animate the bars
  anime({
    // Set the targets of the animation to the bar elements
    targets: bars,
    // Set the height of each bar to a value based on the data array
    height: (el, i) => data[i] * 2,
    // Set the background color of each bar to a random color
    backgroundColor: () =>
      `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    // Set the easing function of the animation to easeInOutSine
    easing: "easeInOutSine",
    // Set the duration of the animation to a random value between 500 and 1500 milliseconds
    duration: () => Math.random() * 1000 + 500,
    // Set the delay of each bar's animation to a value based on its index
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
