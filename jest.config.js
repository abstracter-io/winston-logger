process.env.LOG_LEVEL = "off";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testMatch: ["**/tests/*test.ts?(x)"],
  moduleFileExtensions: ["ts", "js", "json", "node"],

  // https://jestjs.io/docs/en/configuration#coveragethreshold-object
  collectCoverage: process.env.CI !== undefined,
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  collectCoverageFrom: ["src/**"],
};
