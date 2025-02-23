import Joi from "joi";

export const companySchema = Joi.object({
  name: Joi.string().required(),
  nit: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  contact_email: Joi.string().email().required(),
  logo_url: Joi.string().uri().optional(),
  company_type: Joi.string().required(),
});

export const searchCompanySchema = Joi.object({
  id: Joi.string().required(),
});
