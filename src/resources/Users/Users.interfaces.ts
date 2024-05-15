import { Request } from 'express';
import { IdParam, TokenData } from 'src/interfaces/General.interface';

export interface CreateUser {
  name: string;
  username: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  username?: string;
  password?: string;
}

export interface IRequestWithTokenDataAndUpdateBody extends Request<IdParam, object, UpdateUser> {
  tokenData?: TokenData;
  decoded?: unknown;
  params: IdParam;
  body: UpdateUser;
}

export interface PaginationRequestQuery {
  page: string;
  pageSize: string;
  [key: string]: string;
}
  
export interface FiltersPaginationRequestQuery extends PaginationRequestQuery {
  value: string;
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface IRequestWithTokenDataAndLoginBody extends Request<object,object,LoginBody> {
  tokenData?: TokenData;
  decoded?: unknown;
  body: LoginBody;
}