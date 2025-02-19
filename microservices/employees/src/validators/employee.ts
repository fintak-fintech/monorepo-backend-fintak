import Joi from 'joi';

export const employeeSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    position: Joi.string().required(),
    email: Joi.string().email().required(),
    salary: Joi.number().required(),
    company_id: Joi.string().required(),
});


export const searchEmployeeSchema = Joi.object({
    id: Joi.string().required(),
});
