import { z } from 'zod';

const envSchema = z
  .object({
    /* Environment */
    NODE_ENV: z
      .enum(['test', 'development', 'staging', 'production'])
      .default('development'),
    // Server Port (transforms string to number)
    APP_PORT: z.coerce.number().default(3000),
    APP_URL: z.string().optional(),
    APP_TIMEOUT: z.coerce.number().int().positive().default(30000),
    APP_BODY_LIMIT: z
      .string()
      .regex(/^\d+(b|kb|mb|gb)$/i, {
        message: 'Invalid body limit format. Use: 1kb, 1mb, 512b, etc.',
      })
      .default('1mb')
      .transform((val) => val.toLowerCase()),

    /* Security */
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_EXPIRES_IN: z
      .string()
      .regex(/^(\d+[smhdw]|unlimited)$/, 'Invalid duration format'),

    /* Database */
    DATABASE_URL: z
      .string()
      .min(1, 'DATABASE_URL cannot be empty')
      .refine(
        (url) =>
          url.startsWith('postgres://') ||
          url.startsWith('postgresql://') ||
          url.startsWith('mongodb://'),
        { message: 'Invalid database protocol' },
      )
      // Default fallback for local development if not provided
      .catch('postgresql://postgres:postgres@localhost:5432/node_ts_db'),

    /*  Logging */
    LOG_LEVEL: z.preprocess(
      (val) => (typeof val === 'string' ? val.toLowerCase() : val),
      z
        .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
        .default('info'),
    ),

    // API Keys (example of required field)
    // API_KEY: z.string().min(1, "API_KEY is required"),
  })
  .transform((data) => {
    if (!data.APP_URL) {
      const host =
        data.NODE_ENV === 'production'
          ? 'https://myapp.com'
          : 'http://localhost';
      return {
        ...data,
        APP_URL: `${host}:${data.APP_PORT}`,
      };
    }
    return data;
  });

export { envSchema };
