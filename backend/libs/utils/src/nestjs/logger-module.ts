import { LoggerModule } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';

export const loggerModule = LoggerModule.forRoot({
  pinoHttp: {
    level: process.env.LOG_LEVEL || 'info',
    genReqId: () => uuid(),
  },
});
