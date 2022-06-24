module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.(e2e-spec|spec).ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '@app/domain/(.*)': '<rootDir>/libs/domain/src/$1',
    '@app/domain': '<rootDir>/libs/domain/src',
    '@app/utils/(.*)': '<rootDir>/libs/utils/src/$1',
    '@app/utils': '<rootDir>/libs/utils/src',
  },
  testTimeout: 30000,
  clearMocks: true,
  resetMocks: true,
};
