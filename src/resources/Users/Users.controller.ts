
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { UsersInterfaces, UsersProvider } from '@Users';
import { ControllerResponseInterface, IdParam } from 'src/interfaces/General.interface';
import { IRequestWithTokenDataAndLoginBody, LoginBody } from './Users.interfaces';


export const login: RequestHandler<object, object, LoginBody> = async (
  req: IRequestWithTokenDataAndLoginBody, 
  res: Response<ControllerResponseInterface>,
  next: NextFunction) => {
  const { statusCode, result, errorInstance, error, message } = await UsersProvider.login(req);
  if (statusCode === 500) {
    return next(errorInstance);
  }
  return res.status(statusCode).send({ error, ...result, message });
};

export const create: RequestHandler<object,object,UsersInterfaces.CreateUser> = async (
  req: Request<object,object,UsersInterfaces.CreateUser>, 
  res: Response<ControllerResponseInterface>,
  next: NextFunction) => {
  const { statusCode, errorInstance, error, message, result } = await UsersProvider.create(req.body);
  if (statusCode === 500) {
    return next(errorInstance);
  }
  return res.status(statusCode).send({ error: error as boolean, message, result });
};

export const update: RequestHandler<IdParam, object, UsersInterfaces.UpdateUser> = async (
  req: UsersInterfaces.IRequestWithTokenDataAndUpdateBody,
  res: Response<ControllerResponseInterface>,
  next: NextFunction,
) => {
  const { statusCode, result, errorInstance, message } = await UsersProvider.update(req);
  if (statusCode === 500) {
    return next(errorInstance);
  }
  return res.status(statusCode).send({ error: false, result, message });
};

export const getAll: RequestHandler = async (
  _req: Request, 
  res: Response<ControllerResponseInterface>,
  next: NextFunction) => {
  const { statusCode, errorInstance, error, message, result } = await UsersProvider.getAll();
  if (statusCode === 500) {
    return next(errorInstance);
  }
  return res.status(statusCode).send({ error: error as boolean, message, result });
};

export const getAllPaginacion: RequestHandler<object, object, object, UsersInterfaces.FiltersPaginationRequestQuery> = async (
  req: Request<object, object, object, UsersInterfaces.FiltersPaginationRequestQuery>, 
  res: Response<ControllerResponseInterface>,
  next: NextFunction) => {
  const { value, page, pageSize } = req.query;
  const { statusCode, errorInstance, error, message, result, totalPages } = await UsersProvider.getAllPaginacion({ page, pageSize, value });
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
  const { statusCode, result, errorInstance } = await UsersProvider.getOne({ id });
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
  const { statusCode, result, errorInstance, message } = await UsersProvider.deleteOne({ id });
  if (statusCode === 500) {
    return next(errorInstance);
  }
  return res.status(statusCode).send({ error: false, result, message });
};
