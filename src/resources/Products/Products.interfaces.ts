import { Request } from 'express';
import { IdParam, TokenData } from 'src/interfaces/General.interface';

export interface CreateProduct {
  title: string;
  description: string;
  handle: string;
  sku: string;
  grams: number;
  stock: number;
  price: number;
  comparePrice: number;
  barcode: string;
}

export interface UpdateProduct {
  title?: string;
  description?: string;
  handle?: string;
  sku?: string;
  grams?: number;
  stock?: number;
  price?: number;
  comparePrice?: number;
  barcode?: string;
}

export interface IRequestWithTokenDataAndUpdateBody extends Request<IdParam, object, UpdateProduct> {
  tokenData?: TokenData;
  decoded?: unknown;
  params: IdParam;
  body: UpdateProduct;
}

export interface PaginationRequestQuery {
  page: string;
  pageSize: string;
  [key: string]: string;
}
  
export interface FiltersPaginationRequestQuery extends PaginationRequestQuery {
  value: string;
}