import * as bcrypt from 'bcrypt';

export const generatePasswordHash = async (password: string) => {
  const passwordSalt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, passwordSalt);
  return passwordHash;
};
