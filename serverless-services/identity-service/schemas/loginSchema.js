const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "email_should_be_text",
    "string.email": "email_invalid",
    "any.required": "email_required",
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
  loginSchema,
};
