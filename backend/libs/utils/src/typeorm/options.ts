import { EncryptionOptions } from 'typeorm-encrypted';
import { getEnv } from '../env';

export const EncryptionTransformerOptions: EncryptionOptions = {
  key: getEnv('ENCRYPTION_KEY'),
  algorithm: 'aes-256-cbc',
  ivLength: 16,
};
