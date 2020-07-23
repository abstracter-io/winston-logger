import { LogLevel } from "./LogLevel";

const levels = (): { [K in LogLevel]: number } => ({
  [LogLevel.FATAL]: 0,
  [LogLevel.ERROR]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.INFO]: 3,
  [LogLevel.DEBUG]: 4,
  [LogLevel.TRACE]: 5,
  [LogLevel.OFF]: 6,
});

export { levels };
