const fs = require("fs");
const Papa = require("papaparse");

// Function to convert CSV to JSON
function csvToJson(csvFilePath, jsonFilePath) {
  try {
    // Check if the CSV file exists
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`The CSV file ${csvFilePath} does not exist.`);
    }

    // Read the CSV file
    const csvFile = fs.readFileSync(csvFilePath, "utf8");

    // Parse the CSV file
    Papa.parse(csvFile, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (results) {
        // Get the header row
        const headerRow = results.meta.fields;

        // Remove duplicate header keys
        const uniqueHeaderKeys = [...new Set(headerRow)];

        // Create a new array to store the JSON objects
        const jsonArray = [];

        // Iterate over each row in the CSV file
        results.data.forEach((row) => {
          // Create a new object to store the key-value pairs
          const jsonObject = {};

          // Iterate over each unique header key
          uniqueHeaderKeys.forEach((key, index) => {
            // Get the value for the current key
            const value = row[key];

            // Add the key-value pair to the object
            jsonObject[key] = value;
          });

          // Add the object to the JSON array
          jsonArray.push(jsonObject);
        });

        // Write the JSON array to a file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 4));

        console.log(
          `The CSV file has been successfully converted to JSON and saved to ${jsonFilePath}.`
        );
      },
      error: function (error) {
        console.error(`An error occurred while parsing the CSV file: ${error}`);
      },
    });
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
}

// Example usage
const csvFilePath = "input.csv";
const jsonFilePath = "output.json";

csvToJson(csvFilePath, jsonFilePath);
