// error.js
class BaseError extends Error {
  constructor(message, code, status) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

class ValidationError extends BaseError {
  constructor(message, code = "VALIDATION_ERROR", status = 400) {
    super(message, code, status);
  }
}

class AuthenticationError extends BaseError {
  constructor(message, code = "AUTHENTICATION_ERROR", status = 401) {
    super(message, code, status);
  }
}

class InternalServerError extends BaseError {
  constructor(message, code = "INTERNAL_SERVER_ERROR", status = 500) {
    super(message, code, status);
  }
}

module.exports = {
  BaseError,
  ValidationError,
  AuthenticationError,
  InternalServerError,
};
