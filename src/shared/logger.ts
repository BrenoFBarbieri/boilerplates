import { ContextualLogger } from '#domain/logger/contextual-logger.js';
import type {
  Logger,
  BaseLogger,
} from '#domain/logger/interfaces/logger.interface.js';
import type {
  Context,
  ContextState,
} from '#domain/context/interfaces/context.interface.js';

export let baseLogger: BaseLogger;
export let logger: Logger;

export function setSharedLogger(l: BaseLogger, c: Context<ContextState>) {
  baseLogger = l;
  logger = new ContextualLogger(l, c);
}
