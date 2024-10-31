/**
 * Fetches data from two different APIs and merges the results.
 *
 * @param {string} url1 - The URL of the first API endpoint.
 * @param {string} url2 - The URL of the second API endpoint.
 * @returns {Promise<object>} A promise that resolves to a combined response object.
 */
async function fetchDataFromAPIs(url1, url2) {
  try {
    // Use Promise.all to fetch data from both APIs concurrently
    const [response1, response2] = await Promise.all([
      fetch(url1),
      fetch(url2),
    ]);

    // Check if both responses were successful
    if (!response1.ok || !response2.ok) {
      throw new Error(
        `Error fetching data: ${response1.statusText} or ${response2.statusText}`
      );
    }

    // Parse the JSON responses
    const data1 = await response1.json();
    const data2 = await response2.json();

    // Merge the results into a single object
    const combinedData = { ...data1, ...data2 };

    return combinedData;
  } catch (error) {
    // Handle any errors that occurred during the fetching or parsing process
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
}

// Example usage:
fetchDataFromAPIs(
  "https://api1.example.com/data",
  "https://api2.example.com/data"
)
  .then((combinedData) => console.log(combinedData))
  .catch((error) => console.error(error));
