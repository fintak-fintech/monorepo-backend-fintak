import Joi from 'joi';

export const employeeSchema = Joi.object({
    cognito_sub: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    identification_number: Joi.string().required(),
    email: Joi.string().email().required(),
    position: Joi.string().optional(),
    depto: Joi.string().optional(),
    phone: Joi.string().optional(),
    salary: Joi.number().required(),
    company_id: Joi.string().required(),
});

export const editemployeeSchema = Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    position: Joi.string().optional(),
    depto: Joi.string().optional(),
    phone: Joi.string().optional(),
    salary: Joi.number().optional(),
    company_id: Joi.string().optional(),
});

export const searchEmployeeSchema = Joi.object({
    id: Joi.string().required(),
});

export const searchEmployeeIDSchema = Joi.object({
    identification_number: Joi.string().required(),
});

export const statusSchema = Joi.object({
    status: Joi.boolean().required(),
  });