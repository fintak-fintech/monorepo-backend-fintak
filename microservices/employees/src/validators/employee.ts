import Joi from 'joi';

export const employeeSchema = Joi.object({
  identification_number: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  position: Joi.string().required(),
  salary: Joi.number().required(),
  company_id: Joi.string().required(),
  status: Joi.string().required(),
});

export const editemployeeSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  position: Joi.string().required(),
  salary: Joi.number().required(),
  company_id: Joi.string().required(),
  status: Joi.string().required(),
});

export const statusSchema = Joi.object({
  status: Joi.boolean().required(),
});

export const searchEmployeeIDSchema = Joi.object({
  identification_number: Joi.string().required(),
});

export const searchCompanyIDSchema = Joi.object({
  company_id: Joi.string().required(),
});
