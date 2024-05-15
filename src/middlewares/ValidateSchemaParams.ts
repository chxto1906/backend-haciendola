/**
 * External Libraries
 */
import { AnyZodObject, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { getFailedAttributesMessage } from 'src/utilities/ZodError';
/**
 * Middleware Definition
 */
const ValidateSchemaParamsMiddleware =
  <ParamsType>(schema: AnyZodObject) =>
  async (req: Request<ParamsType>, res: Response, next: NextFunction) => {
    try {
      req.params = await schema.parseAsync(req.params) as ParamsType;
      return next();
    } catch (error: unknown) {
      const zodError = error as ZodError;
      const message = getFailedAttributesMessage(zodError.issues);
      const response = { message: message, error: true };
      return res.status(400).json(response);
    }
  };

export default ValidateSchemaParamsMiddleware;
