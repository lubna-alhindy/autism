import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config({
	// navigate to the path of .env file
	path: join(__dirname, '..', '..', '.env')
});

export const dataSource = new DataSource({
	type: 'mysql',
	logging: false,
	host: '127.0.0.1',
	migrations: ['**/*.migration.ts'],
	username: 'newuser',
	password: 'password',
	database: 'autism',
	port: 3306
});

dataSource.initialize().catch((err) => {
	console.error(`Error during Data Source initialization, in ${__dirname}`, err);
});

/*
 * To create a migration file:
 * npx typeorm migration:create ./libs/**.migration
 *
 * To run migration files:
 * npx typeorm-ts-node-commonjs -d apps/autism-backend/src/database/data-source.ts migration:run
 */
