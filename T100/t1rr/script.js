// Get references to the chart container and timeframe dropdown
const chart = document.getElementById("chart");
const timeframeSelect = document.getElementById("timeframe");

// Generate random price data for demonstration
const data = generateRandomPriceData(100, 10, 1);

/**
 * Creates and displays candle elements in the chart based on the price data and timeframe.
 * @param {number[]} data - Array of price data points.
 * @param {number} timeframe - Number of data points to group into one candle.
 */
function createCandles(data, timeframe) {
  // Clear any existing candles from the chart
  chart.innerHTML = "";

  // Find the minimum price for scaling the chart
  const minPrice = Math.min(...data);

  // Loop through the price data in steps of the timeframe
  for (let i = 0; i < data.length - timeframe; i += timeframe) {
    const candle = document.createElement("div");
    candle.classList.add("candle");

    // Determine the initial and final price for the current candle
    const initialPrice = data[i];
    const finalPrice = data[i + timeframe];

    // Calculate the bottom position of the candle relative to the chart
    const bottom = Math.min(initialPrice, finalPrice) - minPrice;

    // Calculate the height of the candle based on price difference
    const height = Math.abs(finalPrice - initialPrice);

    // Calculate the left position and width of the candle based on data length
    candle.style.left = `${(i / data.length) * chart.offsetWidth}px`;
    candle.style.width = `${(timeframe / data.length) * chart.offsetWidth}px`;

    // Position and size the candle within the chart
    candle.style.bottom = `${bottom}px`;
    candle.style.height = `${height}px`;

    // Assign color class based on price movement (green for upward, red for downward)
    candle.classList.add(initialPrice < finalPrice ? "green" : "red");

    // Append the candle to the chart container
    chart.appendChild(candle);
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
