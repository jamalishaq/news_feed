class AppError extends Error {
  constructor(code, details, message, suggestion, statusCode) {
    super(message);

    this.name = this.constructor.name; // Good practice for custom errors
    this.code = code;
    this.details = details;
    this.suggestion = suggestion;
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }
  }
}
export class InternalServerError extends AppError {
  constructor({
    code = "INTERNAL_SERVER_ERROR",
    details = "Something went wrong",
    message = "Server down at the moment, try again later.",
    suggestion = "Check your internet connection",
  } = {}) {
    console.log("Internal server", code)
    super(code, details, message, suggestion, 500);
  }
}

class BadRequestError extends AppError {
  constructor(code = "BAD_REQUEST", details, message, suggestion) {
    super(code, details, message, suggestion, 400);
  }
}

class AuthenticationError extends AppError {
  constructor(code = "AUTHENTICATION_FAILED", details, message, suggestion) {
    super(code, details, message, suggestion, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(code = "ACCESS_FORBIDDEN", details, message, suggestion) {
    super(code, details, message, suggestion, 403);
  }
}

class NotFoundError extends AppError {
  constructor(code = "RESOURCE_NOT_FOUND", details, message, suggestion) {
    super(code, details, message, suggestion, 404);
  }
}

class MethodNotAllowedError extends AppError {
  constructor(code = "METHOD_NOT_ALLOWED", details, message, suggestion) {
    super(code, details, message, suggestion, 405);
  }
}

class TooManyRequestError extends AppError {
  constructor(code = "TOO_MANY_REQUEST", details, message, suggestion) {
    super(code, details, message, suggestion, 429);
  }
}
