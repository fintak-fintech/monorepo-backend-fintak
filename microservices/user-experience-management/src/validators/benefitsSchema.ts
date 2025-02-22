import Joi from 'joi';

export const benefitSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const benefitUpdateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const benefitIdSchema = Joi.object({
  id: Joi.string().required(),
});