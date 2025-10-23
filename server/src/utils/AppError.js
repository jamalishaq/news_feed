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
    super(code, details, message, suggestion, 500);
  }
}

export class BadRequestError extends AppError {
  constructor({
    code = "BAD_REQUEST",
    details = "Failed to process reques due to bad input",
    message = "Invalid input",
    suggestion = "Check the data sent",
  } = {}) {
    super(code, details, message, suggestion, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor({
    code = "AUTHENTICATION_ERROR",
    details = "Failed to authenticate",
    message = "Invalid authentication credentials",
    suggestion = "Check provided credentials",
  } = {}) {
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
