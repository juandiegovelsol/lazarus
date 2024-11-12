const fs = require("fs");
const { parse } = require("csv-parse");

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
    .pipe(
      require("stream").Transform({
        transform(chunk, encoding, callback) {
          // Replace double commas with a placeholder
          const data = chunk.toString().replace(/,,/g, "__DOUBLE_COMMA__");
          callback(null, data);
        },
      })
    )
    .pipe(parse({ skip_empty_lines: true, relax_column_count: true }))
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
            let doubleCommaReplace = value
              .trim()
              .replace(/__DOUBLE_COMMA__/g, ",");
            // Handle double quotes and special characters
            let trimmedValue = doubleCommaReplace.trim().replace(/^"|"$/g, "");
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
  // Check if the value is a date
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value; // Return the date as a string
  }

  // Try to parse as a number
  let number = Number(value);
  if (!isNaN(number)) {
    return number;
  }

  // Return the original value if it's neither a date nor a number
  return value;
}

// Example usage
let csvFilePath = "input.csv";
let jsonFilePath = "output.json";
csvToJson(csvFilePath, jsonFilePath);
