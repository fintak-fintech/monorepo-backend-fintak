/* This Lambda use cross-account lambdas communication */
const AWS = require("aws-sdk");
const { CLIENT_ID, VERIFY_USER_STATUS } = require("../utils/const");
const { generateSecretHash } = require("../utils/utils");
const ErrorHandler = require("../utils/ErrorHandler");
const { registerSchema } = require("../schemas/registerSchema");
const validateSchema = require("../utils/validateSchema");

const cognito = new AWS.CognitoIdentityServiceProvider({});
const lambda = new AWS.Lambda();

const createWallet = async (sub) => {
  const params = {
    FunctionName: `arn:aws:lambda:us-east-1:${
      process.env.SECRET_ACCOUNT_ID ?? ""
    }:function:secrets-service-${process.env.ENV ?? "dev"}-create-wallet`,
    InvocationType: "RequestResponse",
    Payload: JSON.stringify({ body: { sub } }),
  };

  try {
    const result = await lambda.invoke(params).promise();
    const { statusCode, body } = JSON.parse(result.Payload);
    return { statusCode, body };
  } catch (error) {
    ErrorHandler.logError(
      error,
      { message: "error invoking create wallet lambda" },
      "auth_signup"
    );
    throw error;
  }
};

const signUp = async (event) => {
  const { document_type, document_id, email, password, confirm_password } =
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

  if (!document_type || !document_id || !email || !password) {
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
        { Name: "custom:document_type", Value: document_type },
        { Name: "custom:document_id", Value: document_id },
        {
          Name: "custom:user_is_verified",
          Value: VERIFY_USER_STATUS.NO_VERIFY,
        },
      ],
      SecretHash: generateSecretHash(email),
    };

    const response = await cognito.signUp(params).promise();
    if (response.UserSub) {
      const {
        statusCode: walletStatusCode,
        body: { address },
      } = await createWallet(response.UserSub);

      if (walletStatusCode !== 201) {
        ErrorHandler.logError(
          new Error("User created, but Wallet was not created"),
          { email },
          "auth_signup"
        );
        return ErrorHandler.validationError(
          "User created, but Wallet was not created",
          ["user_created_without_wallet"],
          500
        );
      }

      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "User registered successfully",
          body: {
            document_id,
            document_type,
            address,
            email,
          },
        }),
      };
    }

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User registered successfully without creation of wallet",
        body: {
          document_id,
          document_type,
          email,
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
