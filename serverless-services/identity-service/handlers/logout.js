const AWS = require("aws-sdk");
const { getAuthToken } = require("../utils/authMiddleware");
const ErrorHandler = require("../utils/ErrorHandler");

const cognito = new AWS.CognitoIdentityServiceProvider({});

const globalSignOut = (accessToken) => {
  return new Promise((resolve, reject) => {
    cognito.globalSignOut({ AccessToken: accessToken }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

module.exports.handler = async (event) => {
  const tokenResponse = getAuthToken(event.headers);
  if (tokenResponse.status !== 200) return tokenResponse;

  try {
    await globalSignOut(tokenResponse?.token);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully logout" }),
    }
  } catch (error) {
    ErrorHandler.logError(new Error(error), { tokenResponse }, "auth_logout");
    return ErrorHandler.serverError(error.message, ['internal_server_error', error?.code ?? ''], 500);
  }
};
