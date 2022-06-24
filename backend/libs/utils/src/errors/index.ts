import * as v from 'class-validator';
import { CustomError } from 'ts-custom-error';

export abstract class ApplicationError extends CustomError {
  public type: string;
  public title: string;

  constructor(message: string) {
    super(message);

    this.type = this.constructor.name;
    this.title = message;
  }
}

export class ClientError extends ApplicationError {}
export class BadRequestError extends ClientError {}
export class UnauthorizedError extends ClientError {}
export class ForbiddenError extends ClientError {}
export class NotFoundError extends ClientError {}
export class ConflictError extends ClientError {}
export class TooManyRequestError extends ClientError {}

export class NetworkError extends ApplicationError {}
export class SystemError extends ApplicationError {}

export class ValidationError extends BadRequestError {
  constructor(errors: v.ValidationError[]) {
    const errorMessages = errors
      .map((error) => {
        return Object.values(error.constraints || '');
      })
      .join(', ');
    super(errorMessages);
  }
}
