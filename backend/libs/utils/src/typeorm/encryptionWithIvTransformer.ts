import { EncryptionTransformer, EncryptionOptions } from 'typeorm-encrypted';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
import { EncryptionTransformerOptions } from './options';
import { getEnv } from '@app/utils/env';
import { FindOperator, In } from 'typeorm';
import * as _ from 'lodash';

class EncryptionWithIvTransformer implements ValueTransformer {
  private encryptionTransformer: EncryptionTransformer;

  constructor(private options: EncryptionOptions) {
    this.encryptionTransformer = new EncryptionTransformer(this.options);
  }

  from(value: any): any {
    if (_.isNil(value)) return null;
    return this.encryptionTransformer.from(value);
  }

  to(value: any): any {
    if (value instanceof FindOperator && value.type === 'in') {
      return In(value.value.map((v: any) => this.encryptionTransformer.to(v)));
    } else {
      return this.encryptionTransformer.to(value);
    }
  }
}

export const encryptionWithIvTransformer = new EncryptionWithIvTransformer({
  ...EncryptionTransformerOptions,
  iv: getEnv('ENCRYPTION_IV'),
});
