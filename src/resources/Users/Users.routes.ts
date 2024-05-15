/**
 * External Libraries
 */
import { Router } from 'express';
/**
 * Paths
 */
import { UsersController, UsersInterfaces, UsersSchemas } from '@Users';
import { ValidateSchemaBodyMiddleware, ValidateSchemaParamsMiddleware, ValidateSchemaQueryParamsMiddleware } from '@Middlewares';
import * as globals from '../../globals';
import AuthService from '../../services/AuthService';
import { IdParam } from 'src/interfaces/General.interface';
import { FiltersPaginationQuerySchema, IdParamSchema } from 'src/schemas/General.schema';

/**
 * Creación de una instancia de AuthService
 */
const auth = new AuthService();

const UsersRouter = Router();


/**
 * @swagger
 * /api/users/login:
 *  post:
 *   summary: Iniciar sesión
 *   security:
 *    - basicAuth: [user, pass]
 *   tags:
 *    - Users
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateBody'
 *   responseBody:
 *   responses:
 *    200:
 *     description: Inicio de sesión exitoso
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ResponseBody'
 *    401:
 *     description: Unauthorized
 *    500:
 *     description: Error del servidor
 * components:
 *   schemas:
 *     CreateBody:
 *       description: Esquema de la solicitud de inicio de sesión
 *       type: object
 *       properties:
 *         username:
 *          type: string
 *         password:
 *          type: string
 *       required:
 *        - username
 *        - password
 *       example:
 *        username: admin
 *        password: admin
 *     ResponseBody:
 *       type: object
 *       properties:
 *        error:
 *         type: boolean
 *        token:
 *         type: string
 *        user:
 *          type: object
 *          properties:
 *           id:
 *            type: number
 *           name:
 *            type: string
 *           username:
 *            type: string
 *        message:
 *         type: string   
 */
UsersRouter.post(
  '/login',
  auth.basicAuth(globals.writeCredentials.user, globals.writeCredentials.pass),
  ValidateSchemaBodyMiddleware<UsersInterfaces.LoginBody>(UsersSchemas.LoginBodySchema),
  UsersController.login,
);

UsersRouter.get('/all', 
  auth.autenticarTokenPermisos(),
  UsersController.getAll,
);

UsersRouter.get('/', 
  auth.autenticarTokenPermisos(),
  ValidateSchemaQueryParamsMiddleware<UsersInterfaces.FiltersPaginationRequestQuery>(FiltersPaginationQuerySchema),
  UsersController.getAllPaginacion,
);

UsersRouter.get('/:id', 
  auth.autenticarTokenPermisos(),
  ValidateSchemaParamsMiddleware<IdParam>(IdParamSchema),
  UsersController.getOne,
);

UsersRouter.post('/', 
  auth.autenticarTokenPermisos(),
  ValidateSchemaBodyMiddleware<UsersInterfaces.CreateUser>(UsersSchemas.CreateBodySchema),
  UsersController.create,
);

UsersRouter.put('/:id', 
  auth.autenticarTokenPermisos(),
  ValidateSchemaParamsMiddleware<IdParam>(IdParamSchema),
  ValidateSchemaBodyMiddleware<UsersInterfaces.UpdateUser>(UsersSchemas.UpdateBodySchema),
  UsersController.update,
);
UsersRouter.delete('/:id', 
  auth.autenticarTokenPermisos(),
  ValidateSchemaParamsMiddleware<IdParam>(IdParamSchema),
  UsersController.deleteOne,
);

export default UsersRouter;
