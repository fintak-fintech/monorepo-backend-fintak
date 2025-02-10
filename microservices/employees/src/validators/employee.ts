import Joi from 'joi';

export const employeeSchema = Joi.object({
    name: Joi.string().required(),
    position: Joi.string().required(),
});


export const searchEmployeeSchema = Joi.object({
    id: Joi.string().required(),
});
