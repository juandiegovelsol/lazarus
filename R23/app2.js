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
          if (error.response && error.response.status === 429) {
            console.error(
              `Rate limit exceeded for ${crypto.name} (${crypto.id}). Please try again later.`
            );
          } else {
            console.error(
              `Error fetching data for ${crypto.name}: ${error.message}`
            );
          }
          return null;
        });
    });

    const prices = await Promise.all(pricePromises);

    // Filter out any null values (which indicate an error occurred)
    const validPrices = prices.filter((price) => price !== null);

    // Save the results to a JSON file
    saveResultsToJson(validPrices);

    validPrices.forEach((result) => {
      const { name, price } = result;
      console.log(`${name}: $${price} USD`);
    });
  } catch (error) {
    console.error("Unexpected error occurred: ", error.message);
  }
}

// Function to save results to a JSON file
function saveResultsToJson(results) {
  const filePath = "crypto_prices.json";
  const existingData = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  // Concatenate new results with existing data
  const newData = existingData.concat(results);

  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
}

// Array of cryptocurrencies to fetch prices for
const cryptos = [
  { name: "Bitcoin", id: "bitcoin" },
  { name: "Ethereum", id: "ethereum" },
  { name: "Dogecoin", id: "dogecoin" },
];

fetchCryptoPrices(cryptos);
