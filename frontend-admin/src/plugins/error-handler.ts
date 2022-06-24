import Vue from 'vue'
import { Context } from '@nuxt/types'
import {
  ApplicationError,
  ForbiddenError,
  RequiredLiffInitError,
  UnauthorizedError,
} from '~/errors'
import { logger } from '~/utils/logger'

export default (_context: Context) => {
  const handle = (error: Error) => {
    logger.info('エラーハンドラーでキャッチ')
    if (error instanceof RequiredLiffInitError) {
      // 何もしない
      logger.info('LIFF初期化中')
    } else if (error instanceof UnauthorizedError) {
      logger.info('認証の有効期限切れ')
      // 再認証
      location.reload()
    } else if (error instanceof ForbiddenError) {
      logger.error('許可されていないアクセスです。\n' + error.message)
    } else if (error instanceof ApplicationError) {
      logger.error('アプリケーションエラーが発生しました\n' + error.message)
    } else {
      logger.error('システムエラーが発生しました\n' + error.message)
    }
  }

  Vue.config.errorHandler = (err, _vm, info) => {
    logger.info(`Captured in Vue.config.errorHandler: ${info}`)
    handle(err)
  }
  window.addEventListener('error', (event) => {
    logger.info('Captured in error EventListener')
    handle(event.error)
  })
  window.addEventListener('unhandledrejection', (event) => {
    logger.info('Captured in unhandledrejection EventListener')
    handle(event.reason)
  })
}
