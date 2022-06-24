import { Logger } from 'typeorm';
import { logger } from '../logger';

export class TypeOrmCustomLogger implements Logger {
  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[]) {
    logger.debug({
      msg: 'executing query',
      query,
      parameters,
    });
  }
  /**
   * Logs query that is failed.
   */
  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    if (error instanceof Error) {
      if (error.message.startsWith('could not obtain lock on row in relation')) {
        // DBロック取得失敗のログはエラーログとして出力しない
        logger.info({ msg: "TypeORM Logger: DBロック取得失敗", err: error })
        return
      }
    }

    logger.error({
      err: error,
      msg: 'query error',
      query,
      parameters,
    });
  }
  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[]) {
    logger.warn({
      msg: 'query slow',
      time,
      query,
      parameters,
    });
  }
  /**
   * Logs events from the schema build process.
   * syncを使ってないので呼ばれない
   */
  logSchemaBuild(message: string) {
    logger.info({
      msg: message,
    });
  }
  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string) {
    logger.info({
      msg: message,
    });
  }
  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(level: 'log' | 'info' | 'warn' | 'error', message: any) {
    switch (level) {
      case 'log':
        logger.debug({
          msg: message,
        });
        break;

      case 'info':
        logger.info({
          msg: message,
        });
        break;

      case 'warn':
        logger.warn({
          msg: message,
        });
        break;

      case 'error':
        logger.error({
          msg: message,
        });
        break;
    }
  }
}

export const typeOrmCustomLogger = new TypeOrmCustomLogger();
