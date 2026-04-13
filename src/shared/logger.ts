import type { BaseLogger } from '#domain/logger/logger.interface.js';

export let logger: BaseLogger;

export function setSharedLogger(l: BaseLogger) {
  logger = l;
}
