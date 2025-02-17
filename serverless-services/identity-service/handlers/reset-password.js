const AWS = require("aws-sdk");
const { CLIENT_ID } = require("../utils/const");
const { generateSecretHash } = require("../utils/utils");
const ErrorHandler = require("../utils/ErrorHandler");
const validateSchema = require("../utils/validateSchema");
const { resetPasswordSchema } = require("../schemas/resetPasswordSchema");

const cognito = new AWS.CognitoIdentityServiceProvider({});

const resetPassword = async (event) => {  
  const { email, confirmation_code, password } = JSON.parse(event.body);

  if (!email || !confirmation_code || !password) {
    ErrorHandler.logError(new Error("All fields are required"), { email }, "auth_confirmation_password");
    return ErrorHandler.validationError("All fields are required", ['fields_required'], 400);
  }

  try {
    const params = {
        ConfirmationCode: confirmation_code,
        Password: password,
        ClientId: CLIENT_ID,
        SecretHash: generateSecretHash(email),
        Username: email,
      };
    await cognito.confirmForgotPassword(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "reset password successfully" }),
    }
  } catch (error) {
    ErrorHandler.logError(new Error(error), { email }, "auth_confirmation_password");
    return ErrorHandler.serverError(error.message, ['internal_server_error', error?.code ?? ''], 500);
  }
};

module.exports.handler = validateSchema({ body: resetPasswordSchema })(resetPassword);
