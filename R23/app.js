const axios = require("axios");
const fs = require("fs");

// Function to fetch cryptocurrency data for given symbols
async function fetchCryptoPrices(cryptos) {
  try {
    const pricePromises = cryptos.map((crypto) => {
      return axios(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto.id}&vs_currencies=usd`
      )
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(
              `API request failed for ${crypto.name} (${crypto.id}) with status code ${response.status}`
            );
          }
          return response.data;
        })
        .then((data) => {
          if (!data || !data[crypto.id] || !data[crypto.id].usd) {
            throw new Error(
              `Invalid data received for ${crypto.name} (${crypto.id})`
            );
          }
          return { name: crypto.name, price: data[crypto.id].usd };
        })
        .catch((error) => {
          console.error(
            `Error fetching data for ${crypto.name}: ${error.message}`
          );
          return null; // Return null to handle the error and continue with other promises
        });
    });

    const prices = await Promise.all(pricePromises);
    const validPrices = prices.filter((price) => price !== null); // Filter out null values

    // Save the results to a JSON file
    saveResultsToJSON(validPrices);

    validPrices.forEach((result) => {
      const { name, price } = result;
      console.log(`${name}: $${price} USD`);
    });
  } catch (error) {
    console.error("Unexpected error occurred: ", error.message);
  }
}

// Function to save the results to a JSON file
function saveResultsToJSON(prices) {
  const filePath = "crypto_prices.json";
  const existingData = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  // Concatenate new results with existing data
  const newData = existingData.concat(prices);

  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
}

// Array of cryptocurrencies to fetch prices for
const cryptos = [
  { name: "Bitcoin", id: "bitcoin" },
  { name: "Ethereum", id: "ethereum" },
  { name: "Dogecoin", id: "dogecoin" },
];

// Handle rate limiting (status 429)
axios.defaults.retry = 3; // Retry 3 times
axios.defaults.retryDelay = 1000; // Wait 1 second between retries

axios.interceptors.push({
  responseError: (error) => {
    if (error.response.status === 429) {
      console.error("Rate limit exceeded. Retrying...");
      return axios(error.config);
    }
    return Promise.reject(error);
  },
});

fetchCryptoPrices(cryptos);
