const fs = require("fs");
const parse = require("csv-parse");

// Function to convert CSV to JSON
function csvToJson(csvFilePath, jsonFilePath) {
  // Check if CSV file exists
  if (!fs.existsSync(csvFilePath)) {
    throw new Error(`The CSV file ${csvFilePath} does not exist.`);
  }

  // Initialize variables
  let headers;
  let jsonData = [];

  // Read CSV file
  fs.createReadStream(csvFilePath)
    .pipe(parse({ skip_empty_lines: true }))
    .on("data", (csvRow) => {
      // Get headers from the first row
      if (!headers) {
        headers = csvRow.map((header) => header.trim());
      } else {
        // Create JSON object from CSV row
        let jsonObject = {};
        csvRow.forEach((value, index) => {
          // Ignore repetitive headers
          if (headers.indexOf(headers[index]) === index) {
            // Handle double quotes and special characters
            let trimmedValue = value.trim().replace(/^"|"$/g, "");
            // Try to parse value as number or date
            let parsedValue = tryParseValue(trimmedValue);
            jsonObject[headers[index]] = parsedValue;
          }
        });
        jsonData.push(jsonObject);
      }
    })
    .on("end", () => {
      // Write JSON data to file
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
      console.log(
        `CSV file has been successfully converted to JSON and saved to ${jsonFilePath}.`
      );
    })
    .on("error", (error) => {
      console.error("An error occurred while converting CSV to JSON:", error);
    });
}

// Helper function to try parsing a value as number or date
function tryParseValue(value) {
  let parsedValue = value;
  // Try to parse as number
  if (!isNaN(parseFloat(value))) {
    parsedValue = parseFloat(value);
  } else {
    // Try to parse as date
    let date = new Date(value);
    if (!isNaN(date.getTime())) {
      parsedValue = date.toISOString();
    }
  }
  return parsedValue;
}

// Example usage
let csvFilePath = "input.csv";
let jsonFilePath = "output.json";
csvToJson(csvFilePath, jsonFilePath);
