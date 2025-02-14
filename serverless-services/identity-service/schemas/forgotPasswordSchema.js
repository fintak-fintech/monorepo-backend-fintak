const Joi = require('joi');

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "email_should_be_text",
    "string.email": "email_invalid",
    "any.required": "email_required",
  }),
});

module.exports = {
  forgotPasswordSchema,
};
