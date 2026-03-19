import { env } from './config.js';

console.log(`🚀 Server starting in ${env.NODE_ENV} mode...`);

const startServer = () => {
  try {
    console.info(`📡 Listening on port ${env.PORT}`);
    console.info(`🔗 Database connected at ${env.DATABASE_URL}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
