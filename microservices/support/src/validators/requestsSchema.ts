import Joi from 'joi';

export const requestSchema = Joi.object({
  company_id: Joi.string().required(),
  user_id: Joi.string().required(),
  request_type: Joi.string().required(),
  request_description: Joi.string().required(),
  status: Joi.string().required(),
});

export const requestUpdateStatusSchema = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().required(),
});

export const requestIdSchema = Joi.object({
  id: Joi.string().required(),
});