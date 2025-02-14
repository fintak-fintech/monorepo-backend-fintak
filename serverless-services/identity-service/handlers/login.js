/* This Lambda use cross-account lambdas communication */
const AWS = require("aws-sdk");
const { CLIENT_ID, VERIFY_USER_STATUS } = require("../utils/const");
const {
  generateSecretHash,
  transformArrayToObject,
  removeCustomPrefix,
  removeUserResponseInformation,
} = require("../utils/utils");
const ErrorHandler = require("../utils/ErrorHandler");
const validateSchema = require("../utils/validateSchema");
const { loginSchema } = require("../schemas/loginSchema");

const cognito = new AWS.CognitoIdentityServiceProvider({});

const getUser = (accessToken) => {
  return new Promise((resolve, reject) => {
    cognito.getUser({ AccessToken: accessToken }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const resendEmailCode = async (email) => {
  try {
    await cognito.resendConfirmationCode({
      ClientId: CLIENT_ID,
      SecretHash: generateSecretHash(email),
      Username: email
    }).promise();
  } catch (err) {
    throw err;
  }
};

const login = async (event) => {
  const { email, password } = JSON.parse(event.body);

  if (!email || !password) {
    const message = 'Email and password are required';
    ErrorHandler.logError(new Error(message), { email }, "auth_login");
    return ErrorHandler.validationError(message, ['email_password_required'], 400);
  }

  try {
    const params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: generateSecretHash(email),
      },
    };

    let accessToken;
    let refreshToken;
    try {
      const response = await cognito.initiateAuth(params).promise();
      accessToken = response.AuthenticationResult.AccessToken;
      refreshToken = response.AuthenticationResult.RefreshToken;
    } catch(err) {
      ErrorHandler.logError(err, { email }, "auth_login");

      if (err.statusCode === 400) {
        if (err.code === 'UserNotConfirmedException') {
          await resendEmailCode(email);
          return ErrorHandler.validationError('User is not confirmed', ['user_is_not_confirmed'], 401);
        }
        if (err.code === 'NotAuthorizedException') {
          return ErrorHandler.validationError('Incorrect username or password', ['incorrect_username_password'], 401);
        }
      }
      throw err;
    }
    const user = await getUser(accessToken);

    const responseUserData =
      transformArrayToObject(removeCustomPrefix(user?.UserAttributes) ?? []) ??
      {};

    if (responseUserData?.user_is_verified === VERIFY_USER_STATUS.REJECTED) {
      ErrorHandler.logError(new Error('User has rejected verify status'), { email }, "auth_login");
      return ErrorHandler.validationError('User has rejected verify status', ['user_has_rejected_status'], 401);
    }

    const data = removeUserResponseInformation(responseUserData);
    if (!data.user_is_verified)
      data.user_is_verified = VERIFY_USER_STATUS.NO_VERIFY;

    return {
      statusCode: 200,
      body: JSON.stringify({
        accessToken,
        refreshToken,
        user: {
          ...data,
        },
      }),
    };
  } catch (error) {
    ErrorHandler.logError(new Error(error), { email }, "auth_login");
    return ErrorHandler.serverError(error.message, [error?.code ?? '', 'internal_server_error'], 500);
  }
};

module.exports.handler = validateSchema({ body: loginSchema })(login);
