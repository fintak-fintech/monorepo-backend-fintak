const Joi = require("joi");

const verificationEmailSchema = Joi.object({
  code: Joi.string().min(6).max(6).required().messages({
    "string.base": "confirmation_code_must_be_a_number",
    "string.min": "invalid_confirmation_code_size",
    "string.max": "invalid_confirmation_code_size",
    "any.required": "confirmation_code_is_required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "email_should_be_text",
    "string.email": "email_invalid",
    "any.required": "email_required",
  }),
});

module.exports = {
  verificationEmailSchema,
};
