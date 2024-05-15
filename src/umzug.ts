import { sequelize } from './sequelize';
import { Umzug, SequelizeStorage } from 'umzug';

export const Migrator = new Umzug({
  migrations: { glob: 'migrations/*.ts' },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize: sequelize,
  }),
  logger: console,
});

export type Migrations = typeof Migrator._types.migration;

export const Seeder = new Umzug({
  migrations: { glob: 'seeders/*.ts' },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize: sequelize,
    modelName: 'sequelizedata',
  }),
  logger: console,
});

export type Seeders = typeof Seeder._types.migration;
