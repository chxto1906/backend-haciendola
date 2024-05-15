import { Migrations } from '../src/umzug';
import { DataType } from 'sequelize-typescript';

export const up: Migrations = async ({ context: queryInterface }) => {
  try {
    await queryInterface.getQueryInterface().createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataType.STRING,
      },
      username: {
        allowNull: false,
        type: DataType.STRING,
      },
      hash: {
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
