/**
 * External Libraries
 */
import { Sequelize } from 'sequelize-typescript';

import { config } from 'dotenv';
config();
//import { environment } from './globals';
//import Logger from '@Logger';

//environment !== 'test' ? config() : config({ path: './.env.test' });

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const port: number =
  process && process.env && process.env.DB_PORT && !Number.isNaN(parseInt(process.env.DB_PORT))
    ? parseInt(process.env.DB_PORT)
    : 3306;

export const sequelize = new Sequelize({
  username,
  password,
  host,
  database,
  port: port,
  storage: ':memory:',
  models: [__dirname + '/resources/**/*.model.ts'],
  dialect: 'mysql',
  timezone: '-06:00',
  logging: (sql) => console.log(sql),
  benchmark: true,
  dialectOptions: { connectTimeout: 15000 },
  pool: {
    max: 25,
    acquire: 30000,
  },
});
