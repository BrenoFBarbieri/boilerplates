import { env } from '#config/env.js';
import { setupPinoLogger } from '#infra/logger/setup-pino-logger.js';
import { setSharedLogger, logger } from '#shared/logger.js';

const pinoLogger = setupPinoLogger(env.NODE_ENV, env.LOG_LEVEL);
setSharedLogger(pinoLogger);

const startServer = () => {
  logger.info('Initializing the application');
  logger.info(`Listening on: ${env.APP_URL}`);
};

startServer();
