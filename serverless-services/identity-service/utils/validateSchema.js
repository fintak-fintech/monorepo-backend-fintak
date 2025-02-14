const ErrorHandler = require("./ErrorHandler");

const validateInformation = async (data, schema) => {
  try {
    return await schema.validateAsync(data, { allowUnknown: true });
  } catch (err) {
    throw err;
  }
};

const validateSchema = (schema) => {
  return (handler) => async (event) => {
    try {
      if (event?.body && schema?.body) {
        await validateInformation(JSON.parse(event.body), schema.body);
      }

      if (event?.queryStringParameters && schema?.queryStringParameters) {
        await validateInformation(event.queryStringParameters, schema.queryStringParameters);
      }

      return handler(event);
    } catch (error) {
      console.log('body', event.body);
      ErrorHandler.logError(new Error('Validation error'), {
        details: error?.details?.map((err) => err.message),
      }, "validate_schema");
      return ErrorHandler.validationError('Validation error', error?.details?.map((err) => err.message) ?? [], 422);
    }
  };
};

module.exports = validateSchema;
