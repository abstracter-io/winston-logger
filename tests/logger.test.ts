import winston from "winston";
import TransportStream from "winston-transport";

import * as utils from "./utils";
import { LogLevel } from "../src/LogLevel";
import { NoopTransport } from "../src/transports/NoopTransport";
import { loggerFactory, loggerOptions, withContext } from "../src/logger";

describe("loggerFactory", () => {
  it("log entries with a logger name", async () => {
    const name = Date.now().toString();
    const logger = loggerFactory(name);
    const logEntry = await utils.logEntry(logger, "test");

    expect(logEntry.includes(name)).toStrictEqual(true);
  });

  it("log errors", async () => {
    const error = new Error(Date.now().toString());
    const logger = loggerFactory("test");
    const logEntry = await utils.logEntry(logger, error);

    expect(logEntry.includes(error.message)).toStrictEqual(true);
  });

  it("is context aware", () => {
    return new Promise((resolve) => {
      const requestId = Date.now().toString();

      withContext({ requestId }, async () => {
        const logEntry = await utils.logEntry(loggerFactory("test"), "some message");

        expect(logEntry.endsWith(requestId)).toStrictEqual(true);

        resolve();
      });
    });
  });
});

describe("loggerOptions", () => {
  const LOG_LEVEL_ENV_VAR = "LOG_LEVEL";

  it(`ignores unknown '${LOG_LEVEL_ENV_VAR}' value`, () => {
    jest.spyOn(console, "error").mockImplementationOnce(() => undefined);

    utils.envVariableContext(LOG_LEVEL_ENV_VAR, "baaa", () => {
      const logger = winston.createLogger(loggerOptions());

      expect(logger.level).toStrictEqual("info");
    });
  });

  it(`uses '${LOG_LEVEL_ENV_VAR}' value in case-insensitive manner`, () => {
    const logLevels = [LogLevel.DEBUG, "Debug", "DEBUG"];

    logLevels.forEach((level) => {
      utils.envVariableContext(LOG_LEVEL_ENV_VAR, level, () => {
        const logger = winston.createLogger(loggerOptions());

        expect(logger.level).toStrictEqual(level.toLowerCase());
      });
    });
  });

  it(`uses noop transport`, () => {
    utils.envVariableContext(LOG_LEVEL_ENV_VAR, LogLevel.OFF, () => {
      const options = loggerOptions();
      const transports = options.transports as TransportStream[];

      expect(Array.isArray(transports)).toStrictEqual(true);
      expect(transports.length > 0).toStrictEqual(true);
      expect(transports[0]).toBeInstanceOf(NoopTransport);
    });
  });
});
