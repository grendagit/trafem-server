import type { Config } from '@jest/types'

const jestConfig: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  moduleNameMapper: {
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@helpers/(.*)': '<rootDir>/src/helpers/$1',
    '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@wrappers/(.*)': '<rootDir>/src/wrappers/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
}

export default jestConfig
