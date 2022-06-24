export const getEnv = (envName: string) => {
  const value = process.env[envName];
  if (typeof value === 'undefined') {
    throw new Error(`環境変数が見つからない: process.env.${envName}`);
  }

  return value;
};

export const getEnvAsNumber = (envName: string) => {
  return parseInt(getEnv(envName));
};

export const isLocalHost = () => getEnv('NODE_ENV') === 'localhost';
export const isTest = () => getEnv('NODE_ENV') === 'test';
