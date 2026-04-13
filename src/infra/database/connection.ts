// Example of a function in another file to demonstrate the logger with context

import { logger } from '#shared/logger.js';
import { requestContext } from '#shared/context.js';

export function setupDbClient({ dbUrl }: { dbUrl: string }) {
  return {
    connect: async () => {
      requestContext.setValue('tenantId', 'company_1');
      logger.info(`Client DB configured to connect to: ${dbUrl}`);
      logger.info('Successfully connected to the database!');
      logger.bind({ dbConnection: true });
    },
  };
}

export async function simulateConnectDb(dbClient: {
  connect: () => Promise<void>;
}) {
  await dbClient.connect();
  logger.info(
    'Connection simulation for logger demonstration successfully completed!',
  );
  logger.bind({ loggerDemonstration: true });
  requestContext.patch({ userId: '1' });
}
