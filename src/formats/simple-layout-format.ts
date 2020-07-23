import winston from "winston";
import { MESSAGE } from "triple-beam";

import { contextAwareFormat as ctxAwareFormat } from "./context-aware-format";

type Options = {
  name: string;
};

const contextAwareFormat = ctxAwareFormat();
const errorsFormat = winston.format.errors();
const timeStampFormat = winston.format.timestamp();

const simpleLayoutFormat = winston.format((info, opts: Options) => {
  const level = `${info.level.toUpperCase()}`;
  const tsOpts = {
    format: "HH:mm:ss.SSS",
    alias: "ts",
  };
  const ctxOpts = {
    key: "mc",
  };

  timeStampFormat.transform(info, tsOpts);
  contextAwareFormat.transform(info, ctxOpts);
  errorsFormat.transform(info, { stack: true });

  let message = `${info[tsOpts.alias]}`;

  message = `${message} ${level} ${opts.name} - ${info.message}`;

  if (info[ctxOpts.key]) {
    message = `${message} ${Object.values(info[ctxOpts.key])}`;
  }

  info[MESSAGE] = message;

  if (info.stack) {
    info[MESSAGE] = `${message}\n${info.stack}`;
  }

  return info;
});

export { simpleLayoutFormat };
