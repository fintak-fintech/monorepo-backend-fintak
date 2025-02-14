const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "email_should_be_text",
    "string.email": "email_invalid",
    "any.required": "email_required",
  }),
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .required()
    .messages({
      "string.base": "invalid_password",
      "string.min": "password_invalid_min_length",
      "string.pattern.base":
        "password_contain_uppercase_lowercase_number_special_characters",
      "any.required": "password_required",
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "password_must_match",
      "any.required": "confirm_password_required",
    }),
  document_id: Joi.number().optional().messages({
    "string.base": "invalid_document_id",
    "any.required": "document_id_required",
  }),
  document_type: Joi.string().optional().messages({
    "string.base": "invalid_document_type",
    "any.required": "document_type_required",
  }),
});

module.exports = {
  registerSchema,
};
