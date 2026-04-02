import { env } from '#config';
import { log } from '#infra';

const startServer = () => {
  try {
    log.info(`Listening on ${env.APP_URL}`);
    log.info(`Database connected at ${env.DATABASE_URL}`);
  } catch (error) {
    log.error(
      error instanceof Error ? error : new Error(String(error)),
      'Failed to start server',
    );
    process.exit(1);
  }
};

startServer();
