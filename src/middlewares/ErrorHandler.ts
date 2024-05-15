/**
 * External Libraries
 */
import { NextFunction, Request, Response } from 'express';
/**
 * Internal Libraries
 */
import { ControllerResponseInterface, ProviderErrorInstance } from 'src/interfaces/General.interface';

/**
 * Middleware Definition
 */
const ErrorHandler =
  () =>
  (
    errorInstance: ProviderErrorInstance,
    _req: Request,
    res: Response<ControllerResponseInterface>,
    _next: NextFunction,
  ) => {
    const { error, metadata } = errorInstance;

    if (error instanceof Error) {
      res.status(500).send({ error: true, message: error?.message || 'internal server error' });
    }
  };

export default ErrorHandler;
