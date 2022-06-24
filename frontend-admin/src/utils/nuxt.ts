import { NuxtApp } from '@nuxt/types/app'
import { NotFoundError, UnauthorizedError } from '~/errors'

/**
 * fetchのエラーハンドラー
 * fetchで発生したエラーをグローバルエラーハンドラー(src/plugins/error-handler.ts)でキャッチできないため
 * 全てのfetchに適用するラッパー関数。
 * Nuxtのバージョンアップでfetchのエラーをハンドリングできるようになったら不要。
 */
export const fetchErrorHandler = async (_app: NuxtApp, fn: any) => {
  try {
    return await fn()
  } catch (error) {
    if (error instanceof NotFoundError) {
      return location.replace('/error/')
    }

    if (error instanceof UnauthorizedError) {
      return location.reload()
    }
  }
}
