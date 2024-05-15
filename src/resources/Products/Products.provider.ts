
import { Op } from 'sequelize';
import { IdParam, ProviderResponseInterface } from 'src/interfaces/General.interface';
import { serializeError } from 'src/utilities/SerializeError';
import { ProductsInterfaces, ProductsModel } from '.';
import { FiltersPaginationRequestQuery } from './Products.interfaces';

class ProductProvider {

  async create(
    body: ProductsInterfaces.CreateProduct,
  ): Promise<ProviderResponseInterface> {
    try {
      const product = await ProductsModel.create(body);

      return {
        statusCode: 201,
        result: product,
        message: 'Producto creado exitósamente',
        error: false,
      };
      
    } catch (error) {
      return {
        statusCode: 500,
        errorInstance: serializeError(error, { filename: __filename, method: this.create.name }),
      };
    }
  
  }

  async getAll(
  ): Promise<ProviderResponseInterface> {
    try {

      const products = await ProductsModel.findAll({});
      
      return {
        statusCode: 200,
        result: products,
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
              title: {
                [Op.like]: '%' + value + '%',
              },
            },
            {
              description: {
                [Op.like]: '%' + value + '%',
              },
            },
            {
              price: {
                [Op.like]: '%' + value + '%',
              },
            },
          ],
        };
      }
      const offset = (page - 1) * pageSize;

      const products = await ProductsModel.findAll({
        offset: offset,
        limit: pageSize,
        where: whereCondition,
        order: [['id', 'DESC']],
      });
      const totalproducts = await ProductsModel.count({
        where: whereCondition,
        paranoid: true,
      });

      console.log('totalproducts', totalproducts);

      
      return {
        statusCode: 200,
        result: products,
        totalPages: totalproducts,
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
      // se guarda un nuevo registro
      const product = await ProductsModel.findByPk(id);
      return {
        statusCode: 200,
        result: product,
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
    req: ProductsInterfaces.IRequestWithTokenDataAndUpdateBody,
  ): Promise<ProviderResponseInterface> {
    try {

      const data = req.body;
      const id = req.params.id;

      const result = await ProductsModel.update(
        data,
        { where: { id: id }},
      );

      return {
        statusCode: 200,
        result,
        message: 'Producto actualizado correctamente',
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

      const deleted = await ProductsModel.destroy({ where:{ id } });
      
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

export default new ProductProvider();