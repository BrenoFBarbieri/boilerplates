import pino, { type Logger, type DestinationStream } from 'pino';

import { env as validateEnv } from '#config';
import { redactFields } from './redact.js';

function createAppLogger(
  env = validateEnv.NODE_ENV,
  logLevel = validateEnv.LOG_LEVEL,
  dest?: DestinationStream,
): Logger {
  const isTest = env === 'test';
  const isDevelopment = env === 'development';
  const isProductionLike = ['production', 'staging'].includes(env);

  const redactConfig = {
    paths: redactFields,
    censor: '[GDPR COMPLIANT]',
  };

  const devTransportConfig = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  };

  const baseConfig = {
    service: 'api', // Useful tag for Grafana
    env, // Useful for filtering in Grafana: { env="production" }
  };

  const pinoOptions = {
    level: logLevel || (isProductionLike ? 'info' : 'debug'),
    redact: isProductionLike ? redactConfig : undefined,
    transport: isDevelopment ? devTransportConfig : undefined,
    base: isProductionLike ? baseConfig : undefined,
    async: isProductionLike,
    enabled: !isTest,
  };

  return pino(pinoOptions, dest!);
}

const logger = createAppLogger();

export { createAppLogger, logger };
