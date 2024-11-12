// errorHandler.js
const { BaseError } = require("./error");

const errorHandler = (error) => {
  if (error instanceof BaseError) {
    return {
      code: error.code,
      status: error.status,
      message: error.message,
    };
  }

  // Log unknown errors
  console.error("Unknown error:", error);

  return {
    code: "UNKNOWN_ERROR",
    status: 500,
    message: "An unknown error occurred.",
  };
};

module.exports = errorHandler;
