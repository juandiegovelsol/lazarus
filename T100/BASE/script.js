const chart = document.getElementById("chart");
const timeframeSelect = document.getElementById("timeframe");

const data = generateRandomPriceData(100, 10, 1);

function createCandles(data, timeframe) {
  chart.innerHTML = "";
  for (let i = 0; i < data.length - timeframe; i += timeframe) {
    const candle = document.createElement("div");
    candle.classList.add("candle");
    candle.style.height = `${Math.abs(data[i + timeframe] - data[i])}px`;
    candle.style.marginTop = `${Math.min(data[i], data[i + timeframe])}px`;
    candle.classList.add(data[i] < data[i + timeframe] ? "green" : "red");
    chart.appendChild(candle);
  }
}

function generateRandomPriceData(initialPrice, volatility, trend) {
  const data = [initialPrice];
  for (let i = 1; i < 288; i++) {
    const randomChange = (Math.random() - 0.5) * volatility;
    const newPrice = data[i - 1] + randomChange + trend;
    data.push(newPrice);
  }
  return data;
}

timeframeSelect.addEventListener("change", () => {
  createCandles(data, timeframeSelect.value);
});

createCandles(data, 5);
