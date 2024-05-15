/**
 * External Libraries
 */
import { AnyZodObject, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { getFailedAttributesMessage } from 'src/utilities/ZodError';
/**
 * Middleware Definition
 */
const ValidateSchemaQueryParamsMiddleware =
  <QueryType extends qs.ParsedQs>(schema: AnyZodObject) =>
  async (req: Request<{},{},{},QueryType>, res: Response, next: NextFunction) => {
    try {
      req.query = await schema.parseAsync(req.query) as QueryType;
      return next();
    } catch (error: unknown) {
      const zodError = error as ZodError;
      const message = getFailedAttributesMessage(zodError.issues);
      const response = { message: message, error: true };
      return res.status(400).json(response);
    }
  };

export default ValidateSchemaQueryParamsMiddleware;
