import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    automock: false,
    rootDir: './tests',
    coverageDirectory: '../coverage',
    testRegex: '.test.ts$',
};
export default config;
