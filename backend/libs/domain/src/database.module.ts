import { getEnv } from '@app/utils/env';
import { logger } from '@app/utils/logger';
import { createConnectionOptions } from '@app/utils/typeorm/connection';
import { TypeOrmModule } from '@nestjs/typeorm';

const connectionOptions = createConnectionOptions({
  user: getEnv('TYPEORM_USERNAME'),
  password: getEnv('TYPEORM_PASSWORD'),
  host: getEnv('TYPEORM_HOST'),
  port: '5432',
  database: getEnv('TYPEORM_DATABASE'),
});

logger.debug({ msg: 'データベース接続情報', connectionOptions });

export const DatabaseModule = TypeOrmModule.forRoot(connectionOptions);
