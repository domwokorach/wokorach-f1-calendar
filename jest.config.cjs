/** @type {import('jest').Config} */
module.exports = {
  // Next.js projects typically use jsdom by default.
  testEnvironment: 'jsdom',

  testMatch: ['**/__tests__/**/*.(spec|test).(ts|tsx|js|jsx)'],

  // Align with this repo's TS baseUrl (src) and its tsconfig paths.
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@_db/(.*)$': '<rootDir>/_db/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
  },

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        isolatedModules: true,
      },
    ],
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/dist/',
    '/build/',
    '<rootDir>/src/middleware.ts',
  ],
};
