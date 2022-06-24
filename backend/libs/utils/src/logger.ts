import pino from 'pino';
import { getEnv } from './env';

export const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

/**
 * 本番環境以外は出力をマスク
 */
export const mask = (fn: any) => {
  return getEnv('STAGE') === 'prd' ? '***' : fn();
};
