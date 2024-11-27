const chart = document.getElementById("chart");
const timeframeSelect = document.getElementById("timeframe");

const data = generateRandomPriceData(100, 10, 1);

function createCandles(data, timeframe) {
  chart.innerHTML = "";
  const scaleFactor =
    chart.offsetHeight / (Math.max(...data) - Math.min(...data));
  const minPrice = Math.min(...data);
  for (let i = 0; i < data.length - timeframe; i += timeframe) {
    const candle = document.createElement("div");
    candle.classList.add("candle");
    const initialPrice = data[i];
    const finalPrice = data[i + timeframe];
    const top = chart.offsetHeight - (initialPrice - minPrice) * scaleFactor;
    const height = Math.abs(finalPrice - initialPrice) * scaleFactor;
    candle.style.top = `${top}px`;
    candle.style.height = `${height}px`;
    candle.style.left = `${(i / data.length) * chart.offsetWidth}px`;
    candle.style.width = `${(timeframe / data.length) * chart.offsetWidth}px`;
    candle.classList.add(initialPrice < finalPrice ? "green" : "red");
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
  const timeframeValue = parseInt(timeframeSelect.value);
  createCandles(data, timeframeValue);
});

createCandles(data, 1);
