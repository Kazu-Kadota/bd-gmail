module.exports = {
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.tsx?$': [
      'esbuild-jest',
      {
        sourcemap: true,
        loaders: {
          '.spec.ts': 'tsx',
        },
      },
    ],
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  modulePathIgnorePatterns: ['<rootDir>/.build/'],
  moduleNameMapper: {
    '~/constants/(.*)': '<rootDir>/src/constants/$1',
    '~/models/(.*)': '<rootDir>/src/models/$1',
    '~/repositories/(.*)': '<rootDir>/src/repositories/$1',
    '~/services/(.*)': '<rootDir>/src/services/$1',
    '~/use-cases/(.*)': '<rootDir>/src/use-cases/$1',
    '~/utils/(.*)': '<rootDir>/src/utils/$1',
  },
}
