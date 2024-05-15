import { Request } from "express";

export interface ResponseInterface {
  error?: boolean;
  message?: string;
  result?: any;
}
export interface TokenData {
  UsuarioId: number;
}

export interface IRequestWithTokenData extends Request {
  tokenData?: TokenData;
  decoded?: any;
}

export interface IdParam {
  id: number;
}

export interface ProviderResponseInterface {
  error?: boolean;
  statusCode: number;
  message?: string;
  results?: any;
  result?: any;
  totalPages?: any;
  errorInstance?: any;
}

export interface ControllerResponseInterface {
  error: boolean;
  message?: string;
  results?: any;
  result?: any;
  totalPages?: any;
}

export interface ErrorLoggerMetadata {
  method?: string;
  filename?: string;
  name?: string;
  url?: string;
  stack?: string;
}

export interface ProviderErrorInstance {
  error: unknown;
  metadata?: ErrorLoggerMetadata;
}


