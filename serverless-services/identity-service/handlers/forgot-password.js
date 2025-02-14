const AWS = require("aws-sdk");
const { CLIENT_ID } = require("../utils/const");
const { generateSecretHash } = require("../utils/utils");
const ErrorHandler = require("../utils/ErrorHandler");
const { forgotPasswordSchema } = require("../schemas/forgotPasswordSchema");
const validateSchema = require("../utils/validateSchema");

const cognito = new AWS.CognitoIdentityServiceProvider({});

const forgotPassword = async (event) => {
  const { email } = JSON.parse(event.body);

  if (!email) {
    ErrorHandler.logError(
      new Error("All fields are required"),
      { email },
      "auth_forgot_password"
    );
    return ErrorHandler.validationError(
      "All fields are required",
      ["fields_required"],
      400
    );
  }

  try {
    const params = {
      ClientId: CLIENT_ID,
      SecretHash: generateSecretHash(email),
      Username: email,
    };

    await cognito.forgotPassword(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "email sent successfully" }),
    };
  } catch (error) {
    ErrorHandler.logError(new Error(error), { email }, "auth_forgot_password");
    return ErrorHandler.serverError(
      error.message,
      ["internal_server_error", error?.code ?? ""],
      500
    );
  }
};

module.exports.handler = validateSchema({ body: forgotPasswordSchema })(forgotPassword);
