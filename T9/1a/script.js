const weatherTable = document.getElementById("weather-table");
const weatherDataElement = document.getElementById("weather-data");

let nextUpdate = null;

async function updateWeatherTable() {
  const response = await fetch("/weather-data");
  const data = await response.json();
  nextUpdate = data.nextUpdate;

  // Clear the existing table data
  weatherDataElement.innerHTML = "";

  // Sort the weather data by temperature in descending order
  data.data.sort((a, b) => b.temperature - a.temperature);

  // Add the new table data
  data.data.forEach((result) => {
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
    weatherDataElement.appendChild(row);
  });

  // Update the weather table again after the next update time
  setTimeout(updateWeatherTable, Math.max(nextUpdate - Date.now(), 15000));
}

updateWeatherTable();
