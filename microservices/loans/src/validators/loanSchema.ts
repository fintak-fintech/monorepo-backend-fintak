import Joi from "joi";

export const loanSchema = Joi.object({
  amount: Joi.number().required(),
  term: Joi.number().required(),
  company_id: Joi.string().required(),
});

export const loanUpdateSchema = Joi.object({
  amount: Joi.number().required(),
  term: Joi.number().required(),
});

export const loanIdSchema = Joi.object({
  loan_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required()
});

export const userIdSchema = Joi.object({
  userId: Joi.string().required(),
});
