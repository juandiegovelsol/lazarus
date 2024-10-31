/**
 * Fetches data from two different APIs and merges the results.
 *
 * @param {string} url1 - URL of the first API endpoint.
 * @param {string} url2 - URL of the second API endpoint.
 * @returns {Promise<Object>} A promise that resolves to a combined response object.
 */
async function fetchDataFromAPIs(url1, url2) {
  try {
    // Use Promise.all to concurrently fetch data from both URLs
    const [response1, response2] = await Promise.all([
      fetch(url1),
      fetch(url2),
    ]);

    // Check if both responses are OK
    if (!response1.ok || !response2.ok) {
      throw new Error(
        `Error fetching data: ${response1.status} ${response2.status}`
      );
    }

    // Parse the JSON responses
    const data1 = await response1.json();
    const data2 = await response2.json();

    // Merge the data from both APIs
    const combinedData = { ...data1, ...data2 };

    return combinedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Example usage:
fetchDataFromAPIs(
  "https://api1.example.com/data",
  "https://api2.example.com/data"
)
  .then((combinedData) => console.log(combinedData))
  .catch((error) => console.error("Error:", error));
