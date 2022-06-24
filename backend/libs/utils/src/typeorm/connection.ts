import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmCustomLogger } from './logger';

export const createConnectionOptions = (options: {
  user: string;
  password: string;
  host: string;
  port: string;
  database: string;
}): TypeOrmModuleOptions => {
  const { user, password, host, port, database } = options;

  return {
    type: 'postgres',
    url: `postgresql://${user}:${password}@${host}:${port}/${database}`,
    cache: false,
    useUTC: false,
    keepConnectionAlive: true,
    migrationsTransactionMode: 'none',
    autoLoadEntities: true,
    logger: typeOrmCustomLogger,
  };
};
