const ErrorHandler = require("./ErrorHandler");

const getAuthToken = (headers) => {
  const authHeader = headers["authorization"];
  if (!authHeader) {
    ErrorHandler.logError(new Error('Authorization header is missing'), { authHeader }, "auth_validation");
    return ErrorHandler.validationError('Authorization header is missing', ['auth_header_is_missing'], 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    ErrorHandler.logError(new Error('Token missing from authorization header'), { authHeader }, "auth_validation");
    return ErrorHandler.validationError('Token missing from authorization header', ['token_header_is_missing'], 401);
  }

  return {
    message: null,
    status: 200,
    token,
  };
};

module.exports = {
  getAuthToken,
};
