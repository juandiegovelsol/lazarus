const fs = require("fs");
const path = require("path");

/**
 * Binarize the contents of a file and save the binary data to another file.
 * @param {string} inputFilePath - The path to the input file.
 * @param {string} outputDir - The directory where the binarized file will be saved.
 */
function binarizeFile(inputFilePath, outputDir) {
  fs.readFile(inputFilePath, (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    // Convert the buffer to a binary string
    let binarizedData = Array.prototype.map
      .call(new Uint8Array(data), (x) => ("00000000" + x.toString(2)).slice(-8))
      .join("");

    // However, writing binary data as a string will result in a larger file size due to character encoding.
    // If you want the output file to be binary, it's better to directly write the buffer.
    // In Node.js, buffers are instances of the Buffer class, which is a subclass of Uint8Array.
    // Buffers can be written directly to files.

    // So, here we will directly write the buffer to the output file
    const outputFileName =
      path.basename(inputFilePath, path.extname(inputFilePath)) +
      "_binarized.bin";
    const outputFilePath = path.join(outputDir, outputFileName);

    fs.writeFile(outputFilePath, data, (err) => {
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
