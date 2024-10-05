const weatherTable = document.getElementById("weather-table");
const weatherData = document.getElementById("weather-data");

let nextUpdate = null;

async function getWeatherData() {
  const response = await fetch("http://localhost:3000/weather-data");
  const data = await response.json();
  nextUpdate = data.nextUpdate;
  return data.data;
}

async function updateWeatherTable() {
  const weatherResults = await getWeatherData();

  // Clear the existing table data
  weatherData.innerHTML = "";

  // Sort the weather data by temperature in descending order
  weatherResults.sort((a, b) => b.temperature - a.temperature);

  // Add the new table data
  weatherResults.forEach((result) => {
    const row = document.createElement("tr");
    const cityCell = document.createElement("td");
    const temperatureCell = document.createElement("td");
    const windSpeedCell = document.createElement("td");

    cityCell.textContent = result.city;
    temperatureCell.textContent = `${result.temperature}°C`;
    windSpeedCell.textContent = `${result.windSpeed} km/h`;

    // Set the background color of the temperature cell based on the temperature
    if (result.temperature > 25) {
      temperatureCell.style.background = "red";
    } else if (result.temperature > 15) {
      temperatureCell.style.background = "yellow";
    } else {
      temperatureCell.style.background = "blue";
    }

    row.appendChild(cityCell);
    row.appendChild(temperatureCell);
    row.appendChild(windSpeedCell);
    weatherData.appendChild(row);
  });

  // Schedule the next update
  setTimeout(updateWeatherTable, nextUpdate - Date.now() + 15000);
}

updateWeatherTable();
