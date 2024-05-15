/**
 * External Libraries
 */
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

/**
 * Routes Definitions
 */
import { routes } from 'src/routes';
/**
 * Types Libraries
 */
import * as swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger';
//import { environment } from './globals';
/**
 * Constants Definitions
 */
const busboy = require('connect-busboy');
/**
 * App Definition
 */
export const app = express();

console.log('__dirname', __dirname);

app.use(cors({ exposedHeaders: 'Content-Disposition' }));
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true, parameterLimit: 100000 }));
app.use(busboy());
app.use(cookieParser());
app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
//app.use(ErrorHandlerMiddleware());



