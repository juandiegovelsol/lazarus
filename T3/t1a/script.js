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

// Initialize data
let temperature = 20;
let isCelsius = true;
let isOn = false;

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
}

// Convert temperature
function convertTemperature() {
  if (isCelsius) {
    temperature = (temperature * 9) / 5 + 32;
  } else {
    temperature = ((temperature - 32) * 5) / 9;
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
  temperature += isCelsius ? 0.5 : 0.9;
  updateDisplay();
  saveData();
  showMessage(
    `Temperature increased to ${temperature.toFixed(1)} ${
      isCelsius ? "°C" : "°F"
    }`
  );
});

decreaseButton.addEventListener("click", () => {
  temperature -= isCelsius ? 0.5 : 0.9;
  updateDisplay();
  saveData();
  showMessage(
    `Temperature decreased to ${temperature.toFixed(1)} ${
      isCelsius ? "°C" : "°F"
    }`
  );
});

unitsToggle.addEventListener("change", () => {
  convertTemperature();
  isCelsius = !isCelsius;
  updateDisplay();
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

// Initialize display
updateDisplay();
