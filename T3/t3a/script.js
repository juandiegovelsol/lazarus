// Get elements
const onButton = document.getElementById("on-button");
const offButton = document.getElementById("off-button");
const increaseButton = document.getElementById("increase-button");
const decreaseButton = document.getElementById("decrease-button");
const unitsToggle = document.getElementById("units-toggle");
const unitsLabel = document.getElementById("units-label");
const temperatureDisplay = document.getElementById("temperature-display");
const temperatureValue = document.getElementById("temperature-value");
const temperatureUnit = document.getElementById("temperature-unit");
const stateDisplay = document.getElementById("state-display");
const stateValue = document.getElementById("state-value");
const messageDisplay = document.getElementById("message-display");
const temperatureChartCanvas = document.getElementById("temperature-chart");

// Initialize data
let temperature = 20;
let isCelsius = true;
let isOn = false;
let temperatureHistory = [];

// Load data from local storage
if (localStorage.getItem("temperature")) {
  temperature = parseFloat(localStorage.getItem("temperature"));
}
if (localStorage.getItem("isCelsius")) {
  isCelsius = localStorage.getItem("isCelsius") === "true";
}
if (localStorage.getItem("isOn")) {
  isOn = localStorage.getItem("isOn") === "true";
}
if (localStorage.getItem("temperatureHistory")) {
  temperatureHistory = JSON.parse(localStorage.getItem("temperatureHistory"));
}

// Update display
function updateDisplay() {
  temperatureValue.textContent = temperature.toFixed(1);
  temperatureUnit.textContent = isCelsius ? "°C" : "°F";
  unitsLabel.textContent = isCelsius ? "°C" : "°F";
  unitsToggle.checked = !isCelsius;
  stateValue.textContent = isOn ? "On" : "Off";
}

// Save data to local storage
function saveData() {
  localStorage.setItem("temperature", temperature.toString());
  localStorage.setItem("isCelsius", isCelsius.toString());
  localStorage.setItem("isOn", isOn.toString());
  localStorage.setItem(
    "temperatureHistory",
    JSON.stringify(temperatureHistory)
  );
}

// Convert temperature
function convertTemperature() {
  if (isCelsius) {
    temperature = (temperature * 9) / 5 + 32;
  } else {
    temperature = ((temperature - 32) * 5) / 9;
  }
}

// Convert temperature history
function convertTemperatureHistory() {
  temperatureHistory = temperatureHistory.map((temp) => {
    if (isCelsius) {
      return (temp * 9) / 5 + 32;
    } else {
      return ((temp - 32) * 5) / 9;
    }
  });
}

// Update temperature history
function updateTemperatureHistory() {
  temperatureHistory.push(temperature);
  if (temperatureHistory.length > 50) {
    temperatureHistory.shift();
  }
}

// Handle button clicks
onButton.addEventListener("click", () => {
  isOn = true;
  updateDisplay();
  saveData();
  showMessage("Air conditioning turned on");
});

offButton.addEventListener("click", () => {
  isOn = false;
  updateDisplay();
  saveData();
  showMessage("Air conditioning turned off");
});

increaseButton.addEventListener("click", () => {
  if (isOn) {
    temperature += isCelsius ? 0.5 : 0.9;
    updateTemperatureHistory();
    updateDisplay();
    updateChart();
    saveData();
    showMessage(
      `Temperature increased to ${temperature.toFixed(1)} ${
        isCelsius ? "°C" : "°F"
      }`
    );
  } else {
    showMessage("Please turn on the air conditioning first");
  }
});

decreaseButton.addEventListener("click", () => {
  if (isOn) {
    temperature -= isCelsius ? 0.5 : 0.9;
    updateTemperatureHistory();
    updateDisplay();
    updateChart();
    saveData();
    showMessage(
      `Temperature decreased to ${temperature.toFixed(1)} ${
        isCelsius ? "°C" : "°F"
      }`
    );
  } else {
    showMessage("Please turn on the air conditioning first");
  }
});

unitsToggle.addEventListener("change", () => {
  convertTemperature();
  convertTemperatureHistory();
  isCelsius = !isCelsius;
  updateDisplay();
  updateChart();
  saveData();
  showMessage(`Units changed to ${isCelsius ? "°C" : "°F"}`);
});

// Show message
function showMessage(message) {
  messageDisplay.textContent = message;
  messageDisplay.style.display = "block";
  setTimeout(() => {
    messageDisplay.style.display = "none";
  }, 1000);
}

// Create chart
const chart = new Chart(temperatureChartCanvas, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "",
        },
      },
    },
  },
});

// Update chart
function updateChart() {
  chart.data.labels = Array(temperatureHistory.length)
    .fill("")
    .map((_, index) => index + 1);
  chart.data.datasets[0].data = temperatureHistory;
  chart.data.datasets[0].label = `Temperature (${isCelsius ? "°C" : "°F"})`;
  chart.options.scales.y.title.text = isCelsius
    ? "Temperature (°C)"
    : "Temperature (°F)";
  chart.update();
}

// Initialize display and chart
updateDisplay();
updateChart();
