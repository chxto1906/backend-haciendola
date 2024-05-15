import { ProductsRouter } from '@Products';
import { UsersRouter } from '@Users';
import { Router } from 'express';
//import { NegocioRouter as NegocioRoute } from '@Negocio';


export const routes = Router();

// Endpoints intermedios


routes.use('/users', UsersRouter);
routes.use('/products', ProductsRouter);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *   basicAuth:
 *    type: http
 *    scheme: basic
 *    value: 'Basic <api-write:PgmHWYsVRr>'
 *    
 */

// Validacion de funcionamiento
routes.get('/', function (_req, res) {
  res.status(200).send({
    message: 'API',
  });
});
