/**
 * External Libraries
 */
import { Router } from 'express';
/**
 * Paths
 */
import { ProductsController, ProductsInterfaces, ProductsSchemas } from '@Products';
import { ValidateSchemaBodyMiddleware, ValidateSchemaParamsMiddleware, ValidateSchemaQueryParamsMiddleware } from '@Middlewares';

import AuthService from '../../services/AuthService';
import { IdParam } from 'src/interfaces/General.interface';
import { FiltersPaginationQuerySchema, IdParamSchema } from 'src/schemas/General.schema';

/**
 * Creación de una instancia de AuthService
 */
const auth = new AuthService();

const ProductsRouter = Router();

/**
 * @swagger
 * /api/products/all:
 *  get:
 *   summary: Obtiene todos los productos
 *   security: 
 *    - bearerAuth: []
 *   tags: 
 *    - Products
 *   responses:
 *    200:
 *     description: Obtiene todos los productos
 *    401:
 *      description: Unauthorized
 *    403:
 *     description: No cuenta con los permisos necesarios para completar la acción
 *    500:
 *     description: Error del servidor
 */
ProductsRouter.get('/all', 
  auth.autenticarTokenPermisos(),
  ProductsController.getAll,
);

ProductsRouter.get('/', 
  auth.autenticarTokenPermisos(),
  ValidateSchemaQueryParamsMiddleware<ProductsInterfaces.FiltersPaginationRequestQuery>(FiltersPaginationQuerySchema),
  ProductsController.getAllPaginacion,
);

ProductsRouter.get('/:id', 
  auth.autenticarTokenPermisos(),
  ValidateSchemaParamsMiddleware<IdParam>(IdParamSchema),
  ProductsController.getOne,
);


ProductsRouter.post('/', 
  auth.autenticarTokenPermisos(),
  ValidateSchemaBodyMiddleware<ProductsInterfaces.CreateProduct>(ProductsSchemas.CreateBodySchema),
  ProductsController.create,
);

ProductsRouter.put('/:id', 
  auth.autenticarTokenPermisos(),
  ValidateSchemaParamsMiddleware<IdParam>(IdParamSchema),
  ValidateSchemaBodyMiddleware<ProductsInterfaces.UpdateProduct>(ProductsSchemas.UpdateBodySchema),
  ProductsController.update,
);
ProductsRouter.delete('/:id', 
  auth.autenticarTokenPermisos(),
  ValidateSchemaParamsMiddleware<IdParam>(IdParamSchema),
  ProductsController.deleteOne,
);

export default ProductsRouter;
