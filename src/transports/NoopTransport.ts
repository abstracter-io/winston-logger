import Transport from "winston-transport";
import { TransformableInfo } from "logform";

export class NoopTransport extends Transport {
  public static EVENT_NAME = "logged";
  public static INSTANCE = new NoopTransport();

  private constructor() {
    super();
  }

  public log(info: TransformableInfo, cb: () => void): void {
    cb();
  }
}
