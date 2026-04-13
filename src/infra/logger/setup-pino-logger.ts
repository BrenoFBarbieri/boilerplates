import pino, { type Logger, type DestinationStream } from 'pino';
import { redactFields } from './redact.js';
import type { LogLevel } from '#domain/logger/logger.interface.js';

type NodeEnv = 'development' | 'test' | 'staging' | 'production';

export function setupPinoLogger(
  nodeEnv: NodeEnv,
  logLevel: LogLevel,
  dest?: DestinationStream,
): Logger {
  const isTest = nodeEnv === 'test';
  const isDevelopment = nodeEnv === 'development';
  const isProductionLike = ['production', 'staging'].includes(nodeEnv);

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
    env: nodeEnv, // Useful for filtering in Grafana: { env="production" }
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
