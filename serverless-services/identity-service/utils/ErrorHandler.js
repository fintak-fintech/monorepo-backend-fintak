class ErrorHandler {
  static ERROR_CODES = {
    VALIDATION_ERROR: "validation_error",
    AUTHENTICATION_ERROR: "authentication_error",
    NOT_FOUND_ERROR: "not_found",
    SERVER_ERROR: "server_error",
  };

  static createErrorResponse(statusCode, reasons, message, isPublic = true) {
    return {
      statusCode,
      body: JSON.stringify({
        reasons,
        message: isPublic
          ? message
          : "An unexpected error occurred. Please try again.",
      }),
    };
  }

  static logError(error, args, context = "") {
    console.error(`Error in ${context}:`, args, error);
  }

  static validationError(message, reasons = [], statusCode = 400) {
    return this.createErrorResponse(statusCode, reasons, message);
  }

  static notFoundError(message = "Resource not found", statusCode = 404) {
    return this.createErrorResponse(
      statusCode,
      [this.ERROR_CODES.NOT_FOUND_ERROR],
      message
    );
  }

  static serverError(message = "Internal server error",  reasons = [this.ERROR_CODES.SERVER_ERROR], statusCode = 500, isPublic = true) {
    return this.createErrorResponse(
      statusCode,
      reasons,
      message,
      isPublic
    );
  }
}

module.exports = ErrorHandler;
