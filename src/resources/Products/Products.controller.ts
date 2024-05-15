
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { ProductsInterfaces, ProductsProvider } from '@Products';
import { ControllerResponseInterface, IdParam } from 'src/interfaces/General.interface';


export const create: RequestHandler<object,object,ProductsInterfaces.CreateProduct> = async (
  req: Request<object,object,ProductsInterfaces.CreateProduct>, 
  res: Response<ControllerResponseInterface>,
  next: NextFunction) => {
  const { statusCode, errorInstance, error, message, result } = await ProductsProvider.create(req.body);
  if (statusCode === 500) {
    return next(errorInstance);
  }
  return res.status(statusCode).send({ error: error as boolean, message, result });
};

export const update: RequestHandler<IdParam, object, ProductsInterfaces.UpdateProduct> = async (
  req: ProductsInterfaces.IRequestWithTokenDataAndUpdateBody,
  res: Response<ControllerResponseInterface>,
  next: NextFunction,
) => {
  const { statusCode, result, errorInstance, message } = await ProductsProvider.update(req);
  if (statusCode === 500) {
    return next(errorInstance);
  }
  return res.status(statusCode).send({ error: false, result, message });
};

export const getAll: RequestHandler = async (
  _req: Request, 
  res: Response<ControllerResponseInterface>,
  next: NextFunction) => {
  const { statusCode, errorInstance, error, message, result } = await ProductsProvider.getAll();
  if (statusCode === 500) {
    return next(errorInstance);
  }
  return res.status(statusCode).send({ error: error as boolean, message, result });
};

export const getAllPaginacion: RequestHandler<object, object, object, ProductsInterfaces.FiltersPaginationRequestQuery> = async (
  req: Request<object, object, object, ProductsInterfaces.FiltersPaginationRequestQuery>, 
  res: Response<ControllerResponseInterface>,
  next: NextFunction) => {
  const { value, page, pageSize } = req.query;
  const { statusCode, errorInstance, error, message, result, totalPages } = await ProductsProvider.getAllPaginacion({ page, pageSize, value });
  if (statusCode === 500) {
    return next(errorInstance);
  }
  return res.status(statusCode).send({ error: error as boolean, message, result, totalPages });
};

export const getOne: RequestHandler<IdParam> = async (
  req: Request<IdParam>,
  res: Response<ControllerResponseInterface>,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { statusCode, result, errorInstance } = await ProductsProvider.getOne({ id });
  if (statusCode === 500) {
    return next(errorInstance);
  }
  return res.status(statusCode).send({ error: false, result });
};

export const deleteOne: RequestHandler<IdParam> = async (
  req: Request<IdParam>,
  res: Response<ControllerResponseInterface>,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { statusCode, result, errorInstance, message } = await ProductsProvider.deleteOne({ id });
  if (statusCode === 500) {
    return next(errorInstance);
  }
  return res.status(statusCode).send({ error: false, result, message });
};
