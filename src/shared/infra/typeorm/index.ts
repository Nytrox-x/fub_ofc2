import 'reflect-metadata';
import { resolve } from 'path';
import { config } from 'dotenv-flow';
import { DataSource } from 'typeorm';

import database from '../../../config/database';

config({ silent: true });

const databaseConfig = database();

const dataSource = new DataSource({
  type: 'postgres',
  migrationsRun: true,
  host: databaseConfig.DB_HOST,
  port: databaseConfig.DB_PORT,
  username: databaseConfig.DB_USER,
  password: databaseConfig.DB_PASSWORD,
  database: databaseConfig.DB_NAME,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  ssl: true,
  synchronize: false,
  logging: true,
  logger: 'file',
  entities: [
    resolve(__dirname, 'entities/*.{ts,js}'),
    resolve(
      __dirname,
      '..',
      '..',
      '..',
      'modules/**/infra/typeorm/entities/**/*.{ts,js}'
    ),
  ],
  migrations: [resolve(__dirname, 'migrations/*.{ts,js}')],
  subscribers: [],
});

export async function createConnection(): Promise<DataSource> {
  return dataSource.initialize();
}

export default dataSource;
