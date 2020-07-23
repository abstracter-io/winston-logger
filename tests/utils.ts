import { Logger } from "winston";
import { MESSAGE } from "triple-beam";
import { TransformableInfo } from "logform";
import Transport from "winston-transport";

class EventEmittingTransport extends Transport {
  public static EVENT_NAME = "logged";
  public static NAME = "EventEmittingTransport";

  public name;

  public constructor(opts?: Transport.TransportStreamOptions) {
    super(opts);

    this.name = EventEmittingTransport.NAME;
  }

  public log(info: TransformableInfo, cb: () => void): void {
    setImmediate((): void => {
      this.emit(EventEmittingTransport.EVENT_NAME, info);
    });

    cb();
  }
}

const envVariableContext = (key: string, value: string, cb: () => void): void => {
  const environmentVariable = process.env[key];

  process.env[key] = value;

  cb();

  process.env[key] = environmentVariable;
};

const logEntry = (logger: Logger, ...args: unknown[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    const eventEmittingTransport = new EventEmittingTransport();
    const timeout = setTimeout(() => reject(new Error("log entry timed out")), 3000);

    eventEmittingTransport.once(EventEmittingTransport.EVENT_NAME, (info): void => {
      clearTimeout(timeout);

      logger.remove(eventEmittingTransport);

      resolve(info[MESSAGE]);
    });

    logger.add(eventEmittingTransport);

    if (args && args.length) {
      args.unshift(logger.level);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      logger.log(...args);
    } else {
      logger.log(logger.level, "");
    }
  });
};

export { EventEmittingTransport, envVariableContext, logEntry };
