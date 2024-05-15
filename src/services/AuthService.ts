var bcrypt = require('bcryptjs');
import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
//import { Usuario } from '../models/Usuario';
import * as globals from '../globals'
import { secret, saltRounds } from '../globals'
import * as basicAuthLib from 'basic-auth';
import { TokenData } from 'src/interfaces/General.interface';
export default class AuthService {

    basicAuth(username:string, password:string) {
      
      return function (req:any, res: Response, next: NextFunction) {
        if (req) console.info(req.originalUrl);
        var user = basicAuthLib(req);
        if (!user || user.name !== username || user.pass !== password) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.sendStatus(401);
        }
        return next();
      };
    };

    autenticarTokenPermisos() {
      const that = this;
      return async function (req: any, res: Response, next: NextFunction) {
          return await that.autenticarToken(req, res, next);
      }
  };

    autenticarToken = async function (req: any, res: Response, next: NextFunction) {
      try {
        const method = req.method
        const authorizationHeader = req.headers.authorization;
        console.log('authorizationHeader', authorizationHeader)
        console.log('method', method)
        if (!authorizationHeader) throw new Error('401');
        const token = authorizationHeader.split(' ')[1];
        let result = jwt.verify(token, globals.secret);
        req.decoded = result;
        let tokenData: TokenData = this.getTokenData(result);
        if (!tokenData) throw new Error('403');
        req.tokenData = tokenData;
        return next();
      } catch (err: any ) {
        let result = {
          error: true,
          message: '',
          status: 0
        };

        switch (err.message) {
          case '403': {
            result.message = 'No cuenta con los permisos necesarios para completar la acción.';
            result.status = 403;
            return res.status(403).send({ error: true, message: result.message });
          }
          case '401':
          default: {
            result.message = 'Error de autenticación. Por favor vuelva a iniciar sesión.';
            result.status = 401;
            return res.status(401).send({ error: true, message: result.message });
          }
        }
      }
    }

    getTokenData(token: { id: number } | null): TokenData | null {
      return (!token) ? null : {
          UsuarioId: token.id,
      };
    }

    encryptPassword = async (password: string) => {
      const salt = await bcrypt.genSalt(saltRounds)
      return await bcrypt.hash(password, salt)
    }

    comparePassword = async (receivedPassword: string, password: string) => {
      return await bcrypt.compare(receivedPassword, password)
    }

    generateToken = (usuario: object, dias: number = 1) => {
      return jwt.sign(usuario, secret, {
          expiresIn: 86400 * dias
      })
    }

}
