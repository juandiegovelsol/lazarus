const json = {
  programming_language: ["JavaScript", "HTML", "CSS"],
  install_commands: ["n/a"],
  run_commands: ["n/a"],
  output:
    "web app in the following link: https://codepen.io/juandiegovelsol/pen/JjQqXPZ",
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
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="style.css" />
                    <title>Air Conditioning Control</title>
                </head>
                <body>
                    <div class="container">
                    <h1>Air Conditioning Control</h1>
                    <div class="control-panel">
                        <button id="on-btn">On</button>
                        <button id="off-btn">Off</button>
                        <button id="increase-btn">Increase</button>
                        <button id="decrease-btn">Decrease</button>
                        <button id="units-toggle-btn">°C/°F</button>
                    </div>
                    <div class="display-panel">
                        <h2 id="temperature-display"></h2>
                        <h3 id="action-display"></h3>
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
                text-align: center;
                }

                .container {
                width: 50%;
                margin: 40px auto;
                }

                .control-panel {
                margin-bottom: 20px;
                }

                button {
                margin: 10px;
                padding: 10px 20px;
                font-size: 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                }

                button:hover {
                background-color: #ccc;
                }

                .display-panel {
                margin-top: 20px;
                }

                #temperature-display {
                font-size: 36px;
                font-weight: bold;
                margin-bottom: 10px;
                }

                #action-display {
                font-size: 18px;
                color: #666;
                }`,
    },
    {
        name: "script.js",
        content: `// Initialize variables
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
                    updateDisplay();`
    }
  ],
};