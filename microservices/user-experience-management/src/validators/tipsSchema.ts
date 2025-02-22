import Joi from "joi";

export const tipSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required()
});

export const idSchema = Joi.string().guid({ version: 'uuidv4' }).required();