import { logger } from '~/utils/logger'

if (process.env.LOGGER_ENABLED === '1') {
  logger.enableDebug()
}
