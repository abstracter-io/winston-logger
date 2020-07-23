import { levels } from "./levels";
import { LogLevel } from "./LogLevel";

const envLogLevel = (): LogLevel | null => {
  const envLogLevel: string | undefined = process.env.LOG_LEVEL;

  let logLevel: LogLevel | null = null;

  if (envLogLevel !== undefined) {
    const lowerCaseLogLevel = envLogLevel.toLowerCase();

    if (Object.prototype.hasOwnProperty.call(levels(), lowerCaseLogLevel)) {
      logLevel = lowerCaseLogLevel as LogLevel;
    } else {
      console.error(`Unknown log level environment variable: 'LOG_LEVEL=${envLogLevel}'`);
    }
  }

  return logLevel;
};

export { envLogLevel };
