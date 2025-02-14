const Joi = require("joi");

const confirmationPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "email_should_be_text",
    "string.email": "email_invalid",
    "any.required": "email_required",
  }),
  confirmation_code: Joi.string().min(6).max(6).required().messages({
    "string.base": "confirmation_code_must_be_a_number",
    "string.min": "invalid_confirmation_code_size",
    "string.max": "invalid_confirmation_code_size",
    "any.required": "confirmation_code_is_required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "invalid_password",
    "string.min": "password_invalid_min_length",
    "string.pattern.base":
    "password_contain_uppercase_lowercase_number_special_characters",
    "any.required": "password_required",
  }),
});

module.exports = {
  confirmationPasswordSchema,
};
