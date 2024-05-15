import { Migrations } from '../src/umzug';
import { DataType } from 'sequelize-typescript';

export const up: Migrations = async ({ context: queryInterface }) => {
  try {
    await queryInterface.getQueryInterface().createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataType.STRING,
      },
      description: {
        allowNull: false,
        type: DataType.STRING,
      },
      handle: {
        allowNull: false,
        type: DataType.STRING,
      },
      sku: {
        allowNull: false,
        type: DataType.STRING,
      },
      grams: {
        allowNull: false,
        type: DataType.INTEGER,
      },
      stock: {
        allowNull: false,
        type: DataType.INTEGER,
      },
      price: {
        allowNull: false,
        type: DataType.FLOAT,
      },
      comparePrice: {
        allowNull: false,
        type: DataType.FLOAT,
      },
      barcode: {
        allowNull: false,
        type: DataType.STRING,
      },
      createdAt: {
        type: DataType.DATE,
      },
      updatedAt: {
        type: DataType.DATE,
      },
      deletedAt: {
        type: DataType.DATE,
      },
    });

    console.info('Se hizo la migración exitósamente', __filename);
  } catch (error) {
    console.error(error instanceof Error ? error.message : `Unexpected error: ${error}`, __filename);
  }
};

export const down: Migrations = async ({ context: _queryInterface }) => {};
