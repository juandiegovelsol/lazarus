const fs = require("fs");
const path = require("path");

/**
 * Binarizes a file and saves it to another directory.
 *
 * @param {string} inputFilePath - The path to the input file.
 * @param {string} outputDir - The directory where the binarized file will be saved.
 */
function binarizeFile(inputFilePath, outputDir) {
  // Check if the input file exists
  if (!fs.existsSync(inputFilePath)) {
    console.error("Input file does not exist:", inputFilePath);
    return;
  }

  // Check if the output directory exists
  if (!fs.existsSync(outputDir)) {
    console.error("Output directory does not exist:", outputDir);
    return;
  }

  fs.readFile(inputFilePath, (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    // Convert the data to binary
    const binarizedData = Buffer.from(data);

    // Create the output file name and path
    const outputFileName =
      path.basename(inputFilePath, path.extname(inputFilePath)) +
      "_binarized.bin";
    const outputFilePath = path.join(outputDir, outputFileName);

    // Save the binarized data to the output file
    fs.writeFile(outputFilePath, binarizedData, (err) => {
      if (err) {
        console.error("Error saving the binarized file:", err);
        return;
      }
      console.log("File successfully binarized and saved to:", outputFilePath);
    });
  });
}

// Usage
const inputFilePath = "./path/to/your/input/file.txt";
const outputDir = "./path/to/output/folder";
binarizeFile(inputFilePath, outputDir);
