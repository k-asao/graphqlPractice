import { EncryptionTransformer, EncryptionOptions } from 'typeorm-encrypted';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
import { EncryptionTransformerOptions } from './options';

class EncryptionNumberTransformer implements ValueTransformer {
  private encryptionTransformer: EncryptionTransformer;

  constructor(private options: EncryptionOptions) {
    this.encryptionTransformer = new EncryptionTransformer(this.options);
  }

  from(value: string | null): number | null {
    // nullを渡した場合undefinedが返却される
    const result = this.encryptionTransformer.from(value);
    if (!result) return null;
    return parseFloat(result);
  }

  to(value: number | null): string | null {
    if (typeof value === 'number') {
      return this.encryptionTransformer.to(value.toString())!;
    } else {
      return null;
    }
  }
}

export const encryptionWithoutIvTransformer = new EncryptionTransformer(
  EncryptionTransformerOptions,
);

export const encryptionWithoutIvNumberTransformer =
  new EncryptionNumberTransformer(EncryptionTransformerOptions);
