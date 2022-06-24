import { GraphQLClient } from 'graphql-request'
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  SystemError,
  TooManyRequestError,
  UnauthorizedError,
} from '~/errors'
import { getSdk, SdkFunctionWrapper } from '~/graphql/generated/types'
import { logger } from '~/utils/logger'

const client = new GraphQLClient(`${process.env.LIFF_FE_BACKEND_URL!}/graphql`)

export const getClient = () => {
  const headers: any = {}

  const requestWrapper: SdkFunctionWrapper = async <T>(
    action: (requestHeaders?: Record<string, string>) => Promise<T>
  ): Promise<T> => {
    try {
      return await action(headers)
    } catch (error) {
      // TODO: エラーハンドリングを追加
      const exception = error.response.errors[0]?.extensions?.exception
      const businessException = error.response.errors[0]?.extensions?.response

      // システムエラー
      if (exception) {
        if (exception.type === 'BadRequestError') {
          logger.info(error)
          throw new BadRequestError(exception.title)
        }

        if (exception.status === 400) {
          logger.info(error)
          throw new BadRequestError('ValidationError')
        }

        if (exception.type === 'UnauthorizedError') {
          logger.info(error)
          throw new UnauthorizedError(exception.title)
        }

        if (exception.type === 'ForbiddenError') {
          logger.info(error)
          throw new ForbiddenError(exception.title)
        }

        if (exception.type === 'NotFoundError') {
          logger.info(error)
          throw new NotFoundError(exception.title)
        }

        if (exception.type === 'ConflictError') {
          logger.info(error)
          throw new ConflictError(exception.title)
        }

        if (exception.type === 'TooManyRequestError') {
          logger.info(error)
          throw new TooManyRequestError(exception.title)
        }

        if (exception.type === 'SystemError') {
          logger.error('GraphQLリクエストでシステムエラー発生', error)
          throw new SystemError(exception.title)
        }
      }

      // 業務上発生しうるエラー
      if (businessException) {
        if (businessException.statusCode === 400) {
          logger.info(error)
          throw new BadRequestError(businessException.message)
        }
        if (businessException.statusCode === 401) {
          logger.info(error)
          throw new UnauthorizedError(businessException.message)
        }
        if (businessException.statusCode === 403) {
          logger.info(error)
          throw new ForbiddenError(businessException.message)
        }
        if (businessException.statusCode === 404) {
          logger.info(error)
          throw new NotFoundError(businessException.message)
        }
        if (businessException.statusCode === 409) {
          logger.info(error)
          throw new ConflictError(businessException.message)
        }
      }

      logger.error('GraphQLリクエストで予期しないエラー発生', error)
      throw error
    }
  }

  return getSdk(client, requestWrapper)
}
