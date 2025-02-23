import Joi from 'joi';

export const simulateLoanSchema = Joi.object({
  amount: Joi.number().required(),
  term: Joi.number().required(),
  annual_interest: Joi.number().required(),
  user_id: Joi.string().optional(),
});

export const userIdSchema = Joi.object({
  userId: Joi.string().required(),
});