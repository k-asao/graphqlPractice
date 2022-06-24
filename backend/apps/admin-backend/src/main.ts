import { isLocalHost } from '@app/utils/env';
import { NestJSPinoLogger } from '@app/utils/nestjs/logger/nestjs-logger';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as helmet from 'helmet';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { v4 as uuid } from 'uuid';
import { AdminBackendModule } from './admin-backend.module';

async function bootstrap() {
  initializeTransactionalContext();

  const server = express();
  server.enable('trust proxy');

  const app = await NestFactory.create(
    AdminBackendModule,
    new ExpressAdapter(server),
    {
      logger: new NestJSPinoLogger(),
    },
  );

  // CORS設定
  // NestJSの公式の手順だと以下のヘッダーが付与されないのでミドルウェアで対応
  // * Access-Control-Allow-Methods
  // * Access-Control-Allow-Headers
  // https://stackoverflow.com/questions/50949231/nestjs-enable-cors-in-production
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    );
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.use(function (req, res, next) {
    res.removeHeader('X-Powered-By');
    res.header('X-Request-Id', uuid());
    next();
  });

  //キャッシュ無効化
  app.use((req, res, next) => {
    res.header('Pragma', 'no-cache');
    res.header('Cache-Control', 'no-cache, no-store');
    res.header('Expires', 'Mon, 31-Dec-1979 00:00:00 GMT');
    next();
  });

  // 脆弱性攻撃の防御
  if (!isLocalHost()) {
    app.use(helmet());
  }

  const httpServer = await app.listen(process.env.PORT, '0.0.0.0');
  // ALBのKeepAliveを600に設定しているため+20秒で設定
  httpServer.keepAliveTimeout = 620 * 1000;
}
bootstrap();
