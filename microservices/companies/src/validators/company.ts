import Joi from "joi";

export const companySchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
});

export const searchCompanySchema = Joi.object({
  id: Joi.string().required(),
});
