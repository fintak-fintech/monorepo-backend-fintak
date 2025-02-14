const AWS = require("aws-sdk");
const { CLIENT_ID } = require("../utils/const");
const { generateSecretHash } = require("../utils/utils");
const ErrorHandler = require("../utils/ErrorHandler");
const validateSchema = require("../utils/validateSchema");
const { verificationEmailSchema } = require("../schemas/verificationEmailSchema");

const cognito = new AWS.CognitoIdentityServiceProvider({});

const verificationEmail = async (event) => {  
  const { code, email } = JSON.parse(event.body);

  if (!code || !email) {
    ErrorHandler.logError(new Error('Code and email are required'), { email }, "verification_email");
    return ErrorHandler.validationError('Code and email are required', ['fields_required'], 400);
  }

  try {
    const params = {
      ClientId: CLIENT_ID,
      ConfirmationCode: code,
      Username: email,
      SecretHash: generateSecretHash(email),
    };

    await cognito.confirmSignUp(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Email confirmed successfully" }),
    }
  } catch (error) {
    ErrorHandler.logError(new Error(error), { email }, "verification_email");
    return ErrorHandler.serverError(error.message, ['internal_server_error', error?.code ?? ''], 500);
  }
};

module.exports.handler = validateSchema({ body: verificationEmailSchema })(verificationEmail);
