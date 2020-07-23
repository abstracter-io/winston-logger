import * as path from "path";
import TransportStream from "winston-transport";
import winston, { Logger, LoggerOptions } from "winston";

import { levels } from "./levels";
import { envLogLevel } from "./utils";
import { LogLevel } from "./LogLevel";
import { NoopTransport } from "./transports/NoopTransport";
import { withContext } from "./formats/context-aware-format";
import { simpleLayoutFormat } from "./formats/simple-layout-format";

const formats = (loggerName: string) => [
  simpleLayoutFormat({
    name: loggerName,
  }),
];

const loggerOptions = (): LoggerOptions => {
  const stdErrorLevels = [LogLevel.FATAL, LogLevel.ERROR];
  const level = envLogLevel() ?? LogLevel.INFO;
  const transports: TransportStream[] = [];

  if (level === LogLevel.OFF) {
    transports.push(NoopTransport.INSTANCE);
  }
  //
  else {
    const console = new winston.transports.Console({
      stderrLevels: stdErrorLevels,
      consoleWarnLevels: stdErrorLevels,
    });

    transports.push(console);
  }

  return {
    level,

    // https://github.com/winstonjs/winston/blob/master/README.md#formats
    format: winston.format.combine(...formats("Unnamed")),

    // https://github.com/winstonjs/winston/blob/master/README.md#using-custom-logging-levels
    levels: levels(),

    // https://github.com/winstonjs/winston/blob/master/docs/transports.md
    transports,
  };
};

const createFactory = (options: LoggerOptions) => (filename: string): Logger => {
  return winston.createLogger({
    ...options,

    format: winston.format.combine(...formats(path.basename(filename))),
  });
};

const loggerFactory = createFactory(loggerOptions());

export { loggerFactory, loggerOptions, withContext };
