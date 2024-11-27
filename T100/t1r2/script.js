const chart = document.getElementById("chart");
const timeframeSelect = document.getElementById("timeframe");

const data = generateRandomPriceData(100, 10, 1);

// Function to create candles based on the provided data and timeframe
function createCandles(data, timeframe) {
  chart.innerHTML = "";
  // Calculate the maximum price to scale the chart
  const maxPrice = Math.max(...data);
  // Iterate over the data with the specified timeframe
  for (let i = 0; i < data.length - timeframe; i += timeframe) {
    const candle = document.createElement("div");
    candle.classList.add("candle");
    // Calculate the height of the candle based on the price difference
    const height = Math.abs(data[i + timeframe] - data[i]);
    // Scale the height to fit the chart
    const scaledHeight = (height / maxPrice) * chart.offsetHeight;
    candle.style.height = `${scaledHeight}px`;
    // Calculate the top position of the candle to align with the previous candle's end price
    const top = chart.offsetHeight - (data[i] / maxPrice) * chart.offsetHeight;
    candle.style.top = `${top}px`;
    // Calculate the left position of the candle to place them horizontally
    const left = (i / data.length) * chart.offsetWidth;
    candle.style.left = `${left}px`;
    // Add color class based on the price change
    candle.classList.add(data[i] < data[i + timeframe] ? "green" : "red");
    chart.appendChild(candle);
  }
}

// Function to generate random price data
function generateRandomPriceData(initialPrice, volatility, trend) {
  const data = [initialPrice];
  for (let i = 1; i < 288; i++) {
    const randomChange = (Math.random() - 0.5) * volatility;
    const newPrice = data[i - 1] + randomChange + trend;
    data.push(newPrice);
  }
  return data;
}

// Event listener to update the chart when the timeframe is changed
timeframeSelect.addEventListener("change", () => {
  createCandles(data, parseInt(timeframeSelect.value));
});

// Initial chart creation
createCandles(data, 5);
