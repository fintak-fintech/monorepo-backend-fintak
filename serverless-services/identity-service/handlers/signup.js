/* This Lambda use cross-account lambdas communication */
const AWS = require("aws-sdk");
const { CLIENT_ID } = require("../utils/const");
const { generateSecretHash } = require("../utils/utils");
const ErrorHandler = require("../utils/ErrorHandler");
const { registerSchema } = require("../schemas/registerSchema");
const validateSchema = require("../utils/validateSchema");

const cognito = new AWS.CognitoIdentityServiceProvider({});

const signUp = async (event) => {
  const {
    email,
    phone_number,
    password,
    confirm_password,
  } =
    JSON.parse(event.body);

  if (password !== confirm_password) {
    ErrorHandler.logError(
      new Error("Password and confirm password does not match"),
      { email },
      "auth_signup"
    );
    return ErrorHandler.validationError(
      "Password and confirm password does not match",
      ["confirm_password_does_not_match"],
      422
    );
  }

  if (!email || !password) {
    ErrorHandler.logError(
      new Error("All fields are required"),
      { email },
      "auth_signup"
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
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "phone_number", Value: phone_number },
        ],
      SecretHash: generateSecretHash(email),
    };

    const response = await cognito.signUp(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User registered successfully",
        body: {
          sub: response.UserSub,
          email,
          userConfirmed: response.UserConfirmed,
        },
      }),
    };
  } catch (error) {
    ErrorHandler.logError(new Error(error), { email }, "auth_signup");
    if (error?.code === 'UsernameExistsException') {
      return ErrorHandler.validationError('Username already exists', ['username_taken'], 400);
    }

    return ErrorHandler.serverError(
      error.message,
      ["internal_server_error", error?.code ?? ''],
      500
    );
  }
};

module.exports.handler = validateSchema({ body: registerSchema })(signUp);
