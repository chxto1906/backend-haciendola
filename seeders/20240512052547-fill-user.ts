import { UsersModel } from '@Users';
import { Seeders } from '../src/umzug';
import { config } from 'dotenv';
import { Op } from 'sequelize';
config();

import AuthService from 'src/services/AuthService';
const auth = new AuthService();


export const up: Seeders = async ({ context: _queryInterface }) => {
  try {

    const data = {
      name: process.env.USER_NAME || 'admin',
      username: process.env.USER_USERNAME || 'admin',
      password: process.env.USER_PASSWORD || 'admin',
    };

    console.log('data', data)
    
    const userFoundByUsername: UsersModel | null = await UsersModel.findOne({
      where: {
        [Op.and]: [
          { username: { [Op.ne]: '' } },
          { username: data.username },
        ],
      },
    });

    console.log('userFoundByUsername', userFoundByUsername)

    if (userFoundByUsername !== null) return;

    const hash = await auth.encryptPassword(data.password);

    await UsersModel.create(
      {
        name: data.name,
        username: data.username,
        hash: hash,
      },
    );
    
    console.info('Se hizo la seeder exitósamente', __filename);
  } catch (error: any) {
    console.error(error.message, __filename);
  }
};

export const down: Seeders = async ({ context: _queryInterface }) => {};