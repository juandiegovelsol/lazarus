// Initialize variables
let temperature = 20; // Default temperature in Celsius
let isCelsius = true; // Default unit is Celsius
let isOn = false; // Default state is off
const storage = window.localStorage;

// Load data from local storage
if (storage.getItem("temperature")) {
  temperature = parseFloat(storage.getItem("temperature"));
}
if (storage.getItem("isCelsius")) {
  isCelsius = storage.getItem("isCelsius") === "true";
}
if (storage.getItem("isOn")) {
  isOn = storage.getItem("isOn") === "true";
}

// Update display
function updateDisplay() {
  const temperatureDisplay = document.getElementById("temperature-display");
  const units = isCelsius ? "°C" : "°F";
  temperatureDisplay.textContent = `${temperature.toFixed(1)} ${units}`;
}

// Convert temperature between Celsius and Fahrenheit
function convertTemperature() {
  if (isCelsius) {
    temperature = (temperature * 9) / 5 + 32; // Convert to Fahrenheit
  } else {
    temperature = ((temperature - 32) * 5) / 9; // Convert to Celsius
  }
}

// Update action display
function updateActionDisplay(message) {
  const actionDisplay = document.getElementById("action-display");
  actionDisplay.textContent = message;
  setTimeout(() => {
    actionDisplay.textContent = "";
  }, 1000);
}

// Event listeners
document.getElementById("on-btn").addEventListener("click", () => {
  isOn = true;
  storage.setItem("isOn", isOn);
  updateActionDisplay("Air conditioning turned on");
});

document.getElementById("off-btn").addEventListener("click", () => {
  isOn = false;
  storage.setItem("isOn", isOn);
  updateActionDisplay("Air conditioning turned off");
});

document.getElementById("increase-btn").addEventListener("click", () => {
  temperature += isCelsius ? 0.5 : 1; // Increase by 0.5°C or 1°F
  storage.setItem("temperature", temperature);
  updateDisplay();
  updateActionDisplay(
    `Temperature increased to ${temperature.toFixed(1)} ${
      isCelsius ? "°C" : "°F"
    }`
  );
});

document.getElementById("decrease-btn").addEventListener("click", () => {
  temperature -= isCelsius ? 0.5 : 1; // Decrease by 0.5°C or 1°F
  storage.setItem("temperature", temperature);
  updateDisplay();
  updateActionDisplay(
    `Temperature decreased to ${temperature.toFixed(1)} ${
      isCelsius ? "°C" : "°F"
    }`
  );
});

document.getElementById("units-toggle-btn").addEventListener("click", () => {
  isCelsius = !isCelsius;
  storage.setItem("isCelsius", isCelsius);
  convertTemperature();
  updateDisplay();
  updateActionDisplay(`Units changed to ${isCelsius ? "°C" : "°F"}`);
});

// Initial update
updateDisplay();
