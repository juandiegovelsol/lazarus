const weatherTable = document.getElementById('weather-table');
const weatherData = document.getElementById('weather-data');

const cities = [
    { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 },
    { name: 'Chicago', latitude: 41.8781, longitude: -87.6298 },
    { name: 'Miami', latitude: 25.7617, longitude: -80.1918 },
    { name: 'Austin', latitude: 30.2672, longitude: -97.7431 },
];

async function getWeatherData(city) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`);
    const data = await response.json();
    return {
        city: city.name,
        temperature: data.current_weather.temperature,
        windSpeed: data.current_weather.windspeed,
    };
}

async function updateWeatherTable() {
    const weatherPromises = cities.map(getWeatherData);
    const weatherResults = await Promise.all(weatherPromises);

    // Sort the weather data by temperature in descending order
    weatherResults.sort((a, b) => b.temperature - a.temperature);

    // Clear the existing table data
    weatherData.innerHTML = '';

    // Add the new table data
    weatherResults.forEach((result) => {
        const row = document.createElement('tr');
        const cityCell = document.createElement('td');
        const temperatureCell = document.createElement('td');
        const windSpeedCell = document.createElement('td');

        cityCell.textContent = result.city;
        temperatureCell.textContent = `${result.temperature}°C`;
        windSpeedCell.textContent = `${result.windSpeed} km/h`;

        // Set the background color of the temperature cell based on the temperature
        if (result.temperature > 25) {
            temperatureCell.style.background = 'red';
        } else if (result.temperature > 15) {
            temperatureCell.style.background = 'yellow';
        } else {
            temperatureCell.style.background = 'blue';
        }

        row.appendChild(cityCell);
        row.appendChild(temperatureCell);
        row.appendChild(windSpeedCell);
        weatherData.appendChild(row);
    });
}

// Update the weather table every 10 minutes
setInterval(updateWeatherTable, 600000);
updateWeatherTable();