import { env } from '#config/env.js';
import { NodeALSContext } from '#infra/context/node-als.js';
import { setupPinoLogger } from '#infra/logger/setup-pino-logger.js';
import { setRequestContext, requestContext } from '#shared/context.js';
import { setSharedLogger, logger, baseLogger } from '#shared/logger.js';
import {
  setupDbClient,
  simulateConnectDb,
} from '#infra/database/connection.js';

import type { RequestContextSchema } from '#domain/context/schemas/request-context.schema.js';

setRequestContext(new NodeALSContext<RequestContextSchema>());
setSharedLogger(setupPinoLogger(env.NODE_ENV, env.LOG_LEVEL), requestContext);

const startServer = () => {
  baseLogger.info('Initializing the application');

  // 1. Create a context using `.provider()` to isolate this execution
  requestContext.provider(async () => {
    try {
      // To add a value only in context, use .setValue().
      requestContext.setValue('traceId', 'abc-123');

      // To add more than one value to the context, use .patch()
      requestContext.patch({
        userId: 'user-456',
        userRole: 'admin',
      });

      // Use .bind() to propagate all the information you need for traceability in your logger
      logger.bind({
        context: 'boot',
        traceId: requestContext.getValue('traceId'),
      });

      // Now, any log called within the context will inherit the values defined with .bind()

      await simulateConnectDb(setupDbClient({ dbUrl: env.DATABASE_URL }));

      logger.info(`Listening on: ${env.APP_URL}`);

      logger.info(
        `Context demonstration: ${JSON.stringify(requestContext.use())}`,
      );
    } catch (error) {
      logger.error(
        error instanceof Error ? error : new Error(String(error)),
        'Failed to start server',
      );
      process.exit(1);
    }
  });
};

startServer();
