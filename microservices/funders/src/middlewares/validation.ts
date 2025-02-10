import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi'

type SchemasType = {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
};

const validateInformation = async (data: any, schema: ObjectSchema) => {
  try {
    return await schema.validateAsync(data, { allowUnknown: true });
  } catch (err: any) {
    const errorDetails = err.details.map((detail: any) => detail.message);
    throw new Error(errorDetails.join(', '));
  }
};

export const validateSchema = async (req: Request, res: Response, next: NextFunction, schema: SchemasType) => {
  try {
    let data = {};
    if (req?.body && schema?.body) {
      const body = await validateInformation(req.body, schema.body);
      data = { body }
    }
    if (req?.params && schema?.params) {
      const params = await validateInformation(req.params, schema.params);
      data = { params }
    }
    if (req?.query && schema?.query) {
      const query = await validateInformation(req.query, schema.query);
      data = { query };
    }

    if (Object.keys(data)?.length) req = Object.assign(req, data);
    next();
  } catch (err: any) {
    return res.status(422).json({ message: err.message })
  }
};
