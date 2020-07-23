import winston from "winston";
import { createNamespace } from "node-request-context";

type Context = Record<string, unknown>;

const CONTEXT_STORE_NAME = "context";
const CONTEXT_NAMESPACE = createNamespace("mc");

const contextAwareFormat = winston.format((info, opts) => {
  try {
    info[opts.key] = CONTEXT_NAMESPACE.get(CONTEXT_STORE_NAME);
  } catch (e) {}

  return info;
});

const withContext = (context: Context, cb: () => void): void => {
  CONTEXT_NAMESPACE.run(() => {
    CONTEXT_NAMESPACE.set(CONTEXT_STORE_NAME, context);

    cb();
  });
};

export { contextAwareFormat, withContext };
