import { ValidationError } from './errors';
import * as v from 'class-validator';

export const validate = (obj: any) => {
  return v.validateOrReject(obj).catch((errors) => {
    return Promise.reject(new ValidationError(errors));
  });
};
