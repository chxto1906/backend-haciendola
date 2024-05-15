
import { Op } from 'sequelize';
import { IdParam, ProviderResponseInterface } from 'src/interfaces/General.interface';
import { serializeError } from 'src/utilities/SerializeError';
import { UsersInterfaces, UsersModel } from '.';
import { FiltersPaginationRequestQuery, IRequestWithTokenDataAndLoginBody } from './Users.interfaces';
import { MESSAGES } from 'src/utilities/strings';
import AuthService from '../../services/AuthService';
const auth = new AuthService();

class userProvider {

  momentZone = require('moment-timezone');

  async login (req: IRequestWithTokenDataAndLoginBody): Promise<ProviderResponseInterface> {
    try {
      const data = req.body;
      console.log('data', data)
      const user: UsersModel | null = await UsersModel.findOne({
        where: {
          [Op.or]: [{ username: data.username }],
        },
      });
      if (!user) return { statusCode: 400, error: true, message: MESSAGES.USUARIO.USER_NOT_FOUND };
      const passwordCorrecto = await auth.comparePassword(data.password, user.hash);

      if (!passwordCorrecto) {
        return { statusCode: 400, error: true, message: MESSAGES.USUARIO.LOGIN.CREDENDIATLS_INCORRECT };
      }
      user.hash = '';
      const tokenData = {
        id: user.id,
        name: user.name,
        username: user.username,
        hash: user.hash,
      };
      const token = auth.generateToken(tokenData, 2);
      return { statusCode: 200, error: false, 
        message: 'Usuario logueado correctamente',
        result: { token: token, user: user }, 
      };
    } catch (error) {
      return { statusCode: 500, errorInstance: serializeError(error, { filename: __filename, method: this.login.name })};
    }
  }



  async create(
    body: UsersInterfaces.CreateUser,
  ): Promise<ProviderResponseInterface> {
    try {
      const data = body;

      const userFoundByUsername: UsersModel | null = await UsersModel.findOne({
        where: {
          [Op.and]: [
            { username: { [Op.ne]: '' } },
            { username: data.username },
          ],
        },
      });

      if (userFoundByUsername !== null) return { statusCode: 400, error: true, message: MESSAGES.USUARIO.USER_FOUND };

      const hash = await auth.encryptPassword(data.password);

      const newUser = await UsersModel.create(
        {
          name: data.name,
          username: data.username,
          hash: hash,
        },
      );
      
      return {
        statusCode: 201, error: false, message: 'Usuario creado correctamente', result: newUser,
      };
    } catch (error) {
      return { statusCode: 500, errorInstance: serializeError(error, { filename: __filename, method: this.create.name })};
    }
  
  }

  async getAll(
  ): Promise<ProviderResponseInterface> {
    try {

      const Users = await UsersModel.findAll({});
      
      return {
        statusCode: 200,
        result: Users,
        error: false,
      };
      
    } catch (error) {
      
      return {
        statusCode: 500,
        errorInstance: serializeError(error, { filename: __filename, method: this.getAll.name }),
      };
    }
  
  }

  async getAllPaginacion(
    query: FiltersPaginationRequestQuery,
  ): Promise<ProviderResponseInterface> {
    
    try {
      const { value } = query;
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      let whereCondition = {};

      if (value) {
        whereCondition = {
          [Op.or]: [
            {
              name: {
                [Op.like]: '%' + value + '%',
              },
            },
            {
              username: {
                [Op.like]: '%' + value + '%',
              },
            },
          ],
        };
      }
      const offset = (page - 1) * pageSize;

      const Users = await UsersModel.findAll({
        offset: offset,
        limit: pageSize,
        where: whereCondition,
      });
      const totalUsers = await UsersModel.count({
        where: whereCondition,
      });

      const totalPages = Math.ceil(totalUsers / pageSize);
      return {
        statusCode: 200,
        result: Users,
        totalPages,
        error: false,
      };
      
    } catch (error) {
      return {
        statusCode: 500,
        errorInstance: serializeError(error, { filename: __filename, method: this.getAll.name }),
      };
    }
  
  }


  async getOne(
    params: IdParam,
  ): Promise<ProviderResponseInterface> {
    try {
      const { id } = params;
      
      const user = await UsersModel.findByPk(id);
      return {
        statusCode: 200,
        result: user,
        error: false,
      };
        
    } catch (error) {
      return {
        statusCode: 500,
        errorInstance: serializeError(error, { filename: __filename, method: this.getOne.name }),
      };
    }
    
  }

  async update(
    req: UsersInterfaces.IRequestWithTokenDataAndUpdateBody,
  ): Promise<ProviderResponseInterface> {
    try {

      const data = req.body;
      const id = req.params.id;

      const result = await UsersModel.update(
        data,
        { where: { id: id }},
      );

      return {
        statusCode: 200,
        result,
        message: 'Usuario actualizado correctamente',
      };
    } catch (error) {
      return {
        statusCode: 500,
        errorInstance: serializeError(error, { filename: __filename, method: this.update.name }),
      };
    }
  }

  async deleteOne(
    params: IdParam,
  ): Promise<ProviderResponseInterface> {

    try {
      const { id } = params;

      const deleted = await UsersModel.destroy({ where:{ id } });
      
      return {
        statusCode: 200,
        result: deleted,
        error: false,
        message: 'Eliminado correctamente',
      };
        
    } catch (error) {
      
      return {
        statusCode: 500,
        errorInstance: serializeError(error, { filename: __filename, method: this.deleteOne.name }),
      };
    }
    
  }
}

export default new userProvider();