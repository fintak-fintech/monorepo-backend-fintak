import Joi from "joi";

export const loanSchema = Joi.object({
  employee_id: Joi.string().required(),
  amount: Joi.number().required(),
  term: Joi.number().required(),
  interest_rate: Joi.number().required(),
  status: Joi.string().required(),
  approval_date: Joi.date().optional(),
  payment_date: Joi.date().optional(),
  disbursement_status: Joi.string().required(),
  disbursement_date: Joi.date().optional(),
  company_id: Joi.string().optional()
});

export const loanUpdateSchema = Joi.object({
  amount: Joi.number().required(),
  term: Joi.number().required(),
});

export const loanIdSchema = Joi.object({
  loan_id: Joi.string().uuid().required()
});

export const loanIdUserIdSchema = Joi.object({
  loan_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required()
});

export const userIdSchema = Joi.object({
  userId: Joi.string().required(),
});

export const updateApprovalDateSchema = Joi.object({
  approval_date: Joi.date().required(),
});

export const updatePaymentDateSchema = Joi.object({
  payment_date: Joi.date().required(),
});