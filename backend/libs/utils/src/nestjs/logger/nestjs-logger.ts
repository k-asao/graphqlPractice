import { logger } from '@app/utils/logger';
import { LoggerService } from '@nestjs/common';

export class NestJSPinoLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    logger.info({ msg: message, params: optionalParams });
  }

  error(message: any, ...optionalParams: any[]) {
    // TODO: NotFoundErrorなどの出力不要のエラーまでERRORレベルで出力されてしまうので一旦INFOレベルに変更
    logger.info({ msg: message, params: optionalParams });
  }

  warn(message: any, ...optionalParams: any[]) {
    logger.warn({ msg: message, params: optionalParams });
  }

  debug?(message: any, ...optionalParams: any[]) {
    logger.debug({ msg: message, params: optionalParams });
  }

  verbose?(message: any, ...optionalParams: any[]) {
    logger.debug({ msg: message, params: optionalParams });
  }
}
