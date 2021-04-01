module.exports = {
collectCoverageFrom: ['test/**/*.ts', '!**/node_modules/**'],
coverageDirectory: '<rootDir>/test/coverage',
coverageReporters: ['html', 'text'],
coverageThreshold: {
global: {
branches: 2,
functions: 5,
lines: 35,
statements: 30,
},
},
moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'yml', 'yaml'],
modulePathIgnorePatterns: ['<rootDir>/built/'],
testResultsProcessor: './node_modules/jest-junit-reporter',
testTimeout: 30000,
transform: {
    '.(ts|tsx)': 'ts-jest',
    '.test.(ts|tsx)': 'ts-jest',
  },
}