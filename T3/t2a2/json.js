const json = {
  programming_language: ["JavaScript", "HTML", "CSS"],
  install_commands: ["n/a"],
  run_commands: ["n/a"],
  output:
    "web app in the following link: https://codepen.io/juandiegovelsol/pen/NWZVrRy",
  output_expected: "no",
  output_mime_type: "web app",
  stream_source: "stdout/stderr",
  code: [
    {
      name: "index.html",
      content: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Air Conditioning Controller</title>
                    <link rel="stylesheet" href="style.css" />
                    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                </head>

                <body>
                    <div class="container">
                    <h1>Air Conditioning Controller</h1>
                    <div class="controls">
                        <button id="on-button">On</button>
                        <button id="off-button">Off</button>
                        <button id="increase-button">+</button>
                        <button id="decrease-button">-</button>
                        <label for="units-toggle">Units:</label>
                        <input type="checkbox" id="units-toggle" />
                        <label for="units-toggle" id="units-label">°C</label>
                    </div>
                    <div class="display">
                        <p id="temperature-display">
                        Temperature: <span id="temperature-value">20</span>
                        <span id="temperature-unit">°C</span>
                        </p>
                        <p id="state-display">State: <span id="state-value">Off</span></p>
                        <p id="message-display" style="display: none"></p>
                        <canvas id="temperature-chart"></canvas>
                    </div>
                    </div>
                    <script src="script.js"></script>
                </body>
                </html>`,
    },
    {
      name: "style.css",
      content: `body {
                font-family: Arial, sans-serif;
                }

                .container {
                width: 800px;
                margin: 50px auto;
                text-align: center;
                }

                .controls {
                margin-bottom: 20px;
                }

                button {
                width: 50px;
                height: 30px;
                margin: 5px;
                }

                #units-toggle {
                vertical-align: middle;
                }

                #units-label {
                vertical-align: middle;
                }

                .display {
                border: 1px solid #ccc;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                #message-display {
                font-size: 14px;
                color: #666;
                margin-top: 10px;
                }

                #temperature-chart {
                width: 700px;
                height: 300px;
                margin: 20px auto;
                }`,
    },
    {
        name: "script.js",
        content: `// Get elements
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
                        labels: Array(temperatureHistory.length)
                        .fill("")
                        .map((_, index) => index + 1),
                        datasets: [
                        {
                            label: `Temperature (${isCelsius ? "°C" : "°F"})`,
                            data: temperatureHistory,
                            borderColor: "rgba(255, 99, 132, 1)",
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                        },
                        ],
                    },
                    options: {
                        scales: {
                        y: {
                            beginAtZero: true,
                        },
                        },
                    },
                    });

                    // Update chart
                    function updateChart() {
                    chart.data.datasets[0].data = temperatureHistory;
                    chart.options.scales.y.title.text = isCelsius
                        ? "Temperature (°C)"
                        : "Temperature (°F)";
                    chart.update();
                    }

                    // Initialize display and chart
                    updateDisplay();
                    updateChart();`
    }
  ],
};