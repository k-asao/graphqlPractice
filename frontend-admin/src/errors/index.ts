import { CustomError, CustomErrorProperties } from 'ts-custom-error'

export abstract class ApplicationError extends CustomError {
  public type: string
  public title: string

  constructor(message: string) {
    super(message)

    this.type = this.constructor.name
    this.title = message
  }
}

export class BadRequestError extends ApplicationError {}
export class UnauthorizedError extends ApplicationError {}
export class ForbiddenError extends ApplicationError {}
export class NotFoundError extends ApplicationError {}
export class ConflictError extends ApplicationError {}
export class SystemError extends ApplicationError {}
export class TooManyRequestError extends ApplicationError {}
export class ServiceUnavailableError extends ApplicationError {}
export class ValidationError extends BadRequestError {
  public messages: string[]
  constructor(errors: CustomErrorProperties[]) {
    const messages = errors.map((error) => error.message)
    super(messages.join('\n'))
    this.messages = messages
  }
}

// LIFF初期化が必要な場合に発生
// 本エラーの場合はシステムエラー画面への遷移を抑止
export class RequiredLiffInitError extends ApplicationError {}
