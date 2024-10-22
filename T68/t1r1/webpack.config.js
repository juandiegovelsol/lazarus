const path = require("path");

module.exports = {
  entry: {
    visitor: "./visitor.js",
    resident: "./resident.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
