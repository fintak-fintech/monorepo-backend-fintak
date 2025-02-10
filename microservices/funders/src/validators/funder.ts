import Joi from 'joi';

export const funderSchema = Joi.object({
    name: Joi.string().required(),
    amount: Joi.number().required(),
});

export const searchFunderSchema = Joi.object({
    id: Joi.string().required(),
});
