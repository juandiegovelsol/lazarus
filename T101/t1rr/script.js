// Get references to the chart container, x-axis, y-axis, and timeframe dropdown
const chart = document.getElementById("chart");
const xAxis = document.getElementById("x-axis");
const yAxis = document.getElementById("y-axis");
const candlesContainer = document.getElementById("candles");
const timeframeSelect = document.getElementById("timeframe");
const verticalLine = document.getElementById("vertical-line");
const horizontalLine = document.getElementById("horizontal-line");
const legend = document.getElementById("legend");
const priceLegend = document.getElementById("price-legend");
const timeLegend = document.getElementById("time-legend");

// Generate random price data for demonstration
const data = generateRandomPriceData(100, 10, 1);

// Defines variables
let minPrice = 0;
let maxPrice = 0;

/**
 * Creates and displays candle elements in the chart based on the price data and timeframe.
 * @param {number[]} data - Array of price data points.
 * @param {number} timeframe - Number of data points to group into one candle.
 */
function createCandles(data, timeframe) {
  // Clear any existing candles from the chart
  candlesContainer.innerHTML = "";
  xAxis.innerHTML = "";
  yAxis.innerHTML = "";

  // Find the minimum price for scaling the chart
  minPrice = Math.min(...data);
  maxPrice = Math.max(...data);

  // Loop through the price data in steps of the timeframe
  for (let i = 0; i < data.length - timeframe; i += timeframe) {
    const candle = document.createElement("div");
    candle.classList.add("candle");

    // Determine the initial and final price for the current candle
    const initialPrice = data[i];
    const finalPrice = data[i + timeframe];

    // Calculate the bottom position of the candle relative to the chart
    const bottom =
      ((Math.min(initialPrice, finalPrice) - minPrice) /
        (maxPrice - minPrice)) *
      chart.offsetHeight;

    // Calculate the height of the candle based on price difference
    const height =
      (Math.abs(finalPrice - initialPrice) / (maxPrice - minPrice)) *
      chart.offsetHeight;

    // Calculate the left position and width of the candle based on data length
    candle.style.left = `${
      30 + (i / data.length) * (chart.offsetWidth - 30)
    }px`;
    candle.style.width = `${
      (timeframe / data.length) * (chart.offsetWidth - 30)
    }px`;

    // Position and size the candle within the chart
    candle.style.bottom = `${bottom}px`;
    candle.style.height = `${height}px`;

    // Assign color class based on price movement (green for upward, red for downward)
    candle.classList.add(initialPrice < finalPrice ? "green" : "red");

    // Append the candle to the chart container
    candlesContainer.appendChild(candle);
  }

  // Create x-axis labels
  for (let i = 0; i <= 12; i++) {
    const label = document.createElement("span");
    label.classList.add("axis-label");
    label.style.position = "absolute";
    label.style.left = `${(i / 12) * (chart.offsetWidth - 30)}px`;
    label.style.top = "5px";
    label.textContent = `${String(Math.floor(i * 2)).padStart(2, "0")}:00`;
    xAxis.appendChild(label);
  }

  // Create y-axis labels
  for (let i = 0; i <= 10; i++) {
    const label = document.createElement("span");
    label.classList.add("axis-label");
    label.style.position = "absolute";
    label.style.top = `${(1 - i / 10) * chart.offsetHeight}px`;
    label.style.left = "5px";
    label.textContent = `${Math.round(
      minPrice + (i / 10) * (maxPrice - minPrice)
    )}`;
    yAxis.appendChild(label);
  }
}

/**
 * Generates an array of random price data for the chart.
 * @param {number} initialPrice - Starting price value.
 * @param {number} volatility - Maximum price change per step.
 * @param {number} trend - Overall price trend (positive or negative).
 * @returns {number[]} - Array of price data points.
 */
function generateRandomPriceData(initialPrice, volatility, trend) {
  const data = [initialPrice];
  for (let i = 1; i < 289; i++) {
    // Calculate random price change with volatility and trend
    const randomChange = (Math.random() - 0.5) * volatility;
    const newPrice = data[i - 1] + randomChange + trend;
    data.push(newPrice);
  }
  return data;
}

// Update candles on timeframe selection change
timeframeSelect.addEventListener("change", () => {
  const timeframeValue = parseInt(timeframeSelect.value);
  createCandles(data, timeframeValue);
});

// Initial rendering of candles with default timeframe
createCandles(data, 1);

// Add event listener for mouse movement over the chart
chart.addEventListener("mousemove", (event) => {
  // Calculate the x and y coordinates of the cursor within the chart
  const x = event.clientX - chart.offsetLeft;
  const y = event.clientY - chart.offsetTop;

  // Update the position of the vertical and horizontal lines
  verticalLine.style.left = `${x}px`;
  horizontalLine.style.top = `${y}px`;

  // Show the crosshair lines and legend
  verticalLine.style.display = "block";
  horizontalLine.style.display = "block";
  legend.style.display = "block";

  // Calculate the price and time values for the legend
  const price = minPrice + (1 - y / chart.offsetHeight) * (maxPrice - minPrice);
  const timeframeValue = +timeframeSelect.value;
  const time = ((x - 30) / (chart.offsetWidth - 30)) * 24;
  const hours = Math.floor(time);
  const hoursDecimalPart = Math.abs(time - hours) * 60;
  const minutes =
    Math.trunc(hoursDecimalPart / (timeframeValue * 5)) * (timeframeValue * 5);

  // Update the legend text and position
  priceLegend.textContent = `${Math.round(price)}`;
  priceLegend.style.top = `${y}px`;
  priceLegend.style.left = "5px";

  timeLegend.textContent = `${String(Math.floor(time)).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(2, "0")}`;
  timeLegend.style.top = `${chart.offsetHeight}px`;
  timeLegend.style.left = `${x}px`;
});

// Add event listener for mouse leaving the chart
chart.addEventListener("mouseleave", () => {
  // Hide the crosshair lines and legend
  verticalLine.style.display = "none";
  horizontalLine.style.display = "none";
  legend.style.display = "none";
});
