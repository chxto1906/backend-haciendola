import { app } from './app';
import { sequelize } from 'src/sequelize';
import { Seeder, Migrator } from 'src/umzug';
import { MigrationError } from 'umzug';

sequelize
  .authenticate()
  .then(() => {
    console.info('Database connection successfully');
    migrationAndSeeders();
  })
  .catch(error => {
    console.error(error, { name: 'Database connection failed' });
  });

  const PORT = process.env.PORT || 3000;

export const server = app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});

const migrationAndSeeders = async () => {
  try {
    await Migrator.up();
    await Seeder.up();
      console.info(`Migrations and seeders executed succesfully`);
    if (process.env.CLOSE && process.env.CLOSE == 'true') process.exit(0);
  } catch (error) {
    if (error instanceof MigrationError) {
      console.error(error, { name: 'Migration error', filename: __filename });
    }
    if (process.env.CLOSE && process.env.CLOSE == 'true') process.exit(1);
  }
};
