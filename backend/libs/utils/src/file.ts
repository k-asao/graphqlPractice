import { promises } from 'fs';
import { v4 as uuid } from 'uuid';

export const tmpFile = async (
  data: any,
  fn: (params: { tmpFilePath: string }) => Promise<any>,
) => {
  const tmpFilePath = process.env.TMPDIR + uuid();
  try {
    await promises.writeFile(tmpFilePath, data);
    return await fn({ tmpFilePath });
  } finally {
    await promises.rm(tmpFilePath);
  }
};
