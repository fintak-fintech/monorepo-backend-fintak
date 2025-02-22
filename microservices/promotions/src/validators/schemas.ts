import Joi from "joi";

export const productPromotionSchema = Joi.object({
  company_id: Joi.string().required(),
  product_name: Joi.string().required(),
  product_description: Joi.string().required(),
  price: Joi.number().required(),
  installment_plan: Joi.string().required(),
  status: Joi.string().required(),
});

export const productPromotionUpdateSchema = Joi.object({
  company_id: Joi.string().required(),
  product_name: Joi.string().required(),
  product_description: Joi.string().required(),
  price: Joi.number().required(),
  installment_plan: Joi.string().required(),
  status: Joi.string().required(),
});

export const productPromotionIdSchema = Joi.object({
  productId: Joi.string().required(),
});

export const productPromotionDeleteSchema = Joi.object({
  id: Joi.string().required(),
});

export const productPromotionDisabledSchema = Joi.object({
  company_id: Joi.string().required(),
  product_id: Joi.string().required(),
  state: Joi.string().required(),
});
