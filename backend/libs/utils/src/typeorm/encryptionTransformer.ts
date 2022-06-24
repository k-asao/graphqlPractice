import { EncryptionTransformer } from 'typeorm-encrypted';
import { EncryptionTransformerOptions } from './options';
import { getEnv } from '../env';

export const encryptionTransformer = new EncryptionTransformer({
  ...EncryptionTransformerOptions,
  iv: getEnv('ENCRYPTION_IV'),
});

/**
 * 暗号化カラムのサイズを計算
 */
export const calculateColumnSize = (originColumnSize: number) => {
  // AES暗号後のブロック長を求める
  const aesBlockSize = 32;
  const calculatedColumnSize =
    Math.ceil(originColumnSize / aesBlockSize) * aesBlockSize;

  // Base64後のデータサイズを求める
  const base64Ratio = 1.37;
  return Math.ceil(calculatedColumnSize * base64Ratio);
};
