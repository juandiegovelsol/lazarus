const http = require('http');
const fs = require('fs');
const axios = require('axios');
const port = 3000;

const cities = [
    { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 },
    { name: 'Chicago', latitude: 41.8781, longitude: -87.6298 },
    { name: 'Miami', latitude: 25.7617, longitude: -80.1918 },
    { name: 'Austin', latitude: 30.2672, longitude: -97.7431 },
];

async function getWeatherData(city) {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`);
    return {
        city: city.name,
        temperature: response.data.current_weather.temperature,
        windSpeed: response.data.current_weather.windspeed,
    };
}

async function generateJsonFile() {
    const weatherPromises = cities.map(getWeatherData);
    const weatherResults = await Promise.all(weatherPromises);

    const groupedData = weatherResults.reduce((acc, result) => {
        if (result.temperature > 25) {
            acc.hot.push(result);
        } else if (result.temperature > 15) {
            acc.medium.push(result);
        } else {
            acc.cold.push(result);
        }
        return acc;
    }, { hot: [], medium: [], cold: [] });

    fs.writeFileSync('weather-data.json', JSON.stringify(groupedData, null, 2));
    console.log('JSON file generated successfully!');
}

// Generate the JSON file every 10 minutes
setInterval(generateJsonFile, 600000);
generateJsonFile();

http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Error: File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/script.js') {
        fs.readFile('script.js', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Error: File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else if (req.url === '/styles.css') {
        fs.readFile('styles.css', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Error: File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (req.url === '/weather-data.json') {
        fs.readFile('weather-data.json', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Error: File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    }
}).listen(port, () => {
    console.log(`Server running on port ${port}`);
});