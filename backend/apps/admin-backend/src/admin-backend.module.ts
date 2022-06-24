import { isLocalHost } from '@app/utils/env';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { SampleModule } from './samples/samples.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: () => uuid(),
        prettyPrint: isLocalHost() ? true : false,
      },
    }),
    GraphQLModule.forRoot({
      debug: isLocalHost(),
      playground: isLocalHost(),
      useGlobalPrefix: true,
      // Lambdaでは/tmp以外の書き込みが許されていない
      autoSchemaFile: isLocalHost()
        ? join(process.cwd(), 'apps/admin-backend/src/schema.gql')
        : '/tmp/admin-backend-schema.gql',
      context: ({ req }) => ({ headers: req.headers }),
    }),
    ScheduleModule.forRoot(),
    // モジュール
    UsersModule,
    SampleModule,
  ],
})
export class AdminBackendModule {}
