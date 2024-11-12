// example.js
const { ValidationError } = require("./error");
const errorHandler = require("./errorHandler");
const logger = require("./logger");

const validateUserInput = (input) => {
  if (!input.name) {
    throw new ValidationError("Name is required.");
  }
};

try {
  validateUserInput({ email: "example@example.com" });
} catch (error) {
  const errorResponse = errorHandler(error);
  logger(errorResponse);
  console.log("Error response:", errorResponse);
}
