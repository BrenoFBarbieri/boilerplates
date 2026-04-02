import type { Logger, LogFn } from 'pino';

import { requestContext } from '#core';
import { logger as defaultLogger } from './app-logger.js';

function withContext(pinoLogFn: LogFn) {
  return (obj: object | string, msg?: string) => {
    const store = requestContext.getStore();

    if (typeof obj === 'string') {
      return pinoLogFn({ ...store }, obj);
    }

    return pinoLogFn({ ...store, ...obj }, msg);
  };
}

const createContextLogger = (logger: Logger) => ({
  trace: withContext(logger.trace.bind(logger)),
  debug: withContext(logger.debug.bind(logger)),
  info: withContext(logger.info.bind(logger)),
  warn: withContext(logger.warn.bind(logger)),
  error: withContext(logger.error.bind(logger)),
  fatal: withContext(logger.fatal.bind(logger)),
});

const log = createContextLogger(defaultLogger);

export { createContextLogger, log };
