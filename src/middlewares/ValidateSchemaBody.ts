/**
 * External Libraries
 */
import { AnyZodObject, ZodError  } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { getFailedAttributesMessage } from 'src/utilities/ZodError';
/**
 * Middleware Definition
 */
const ValidateSchemaBodyMiddleware =
  <BodyType>(schema: AnyZodObject) =>
  async (req: Request<{}, {}, BodyType>, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body) as BodyType;
      return next();
    } catch (error: unknown) {
      const zodError = error as ZodError;
      const message = getFailedAttributesMessage(zodError.issues);
      const response = { message: message, error: true };
      return res.status(400).json(response);
    }
  };

  

export default ValidateSchemaBodyMiddleware;
