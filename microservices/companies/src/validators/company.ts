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


export const editCompanySchema = Joi.object({
  name: Joi.string().optional(),
  nit: Joi.string().optional(),
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  contact_email: Joi.string().email().required(),
  logo_url: Joi.string().uri().optional(),
  company_type: Joi.string().optional(),
});

export const searchCompanyIDschema = Joi.object({
  nit: Joi.string().required(),
});

export const statusSchema = Joi.object({
  status: Joi.boolean().required(),
});

export const searchCompanySchema = Joi.object({
  id: Joi.string().required(),
});
