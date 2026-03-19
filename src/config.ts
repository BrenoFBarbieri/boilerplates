import { z } from 'zod';

const envSchema = z.object({
  // Node Environment
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  // Server Port (transforms string to number)
  PORT: z.coerce.number().default(3000),

  // Validating DB URL without the strict .url() limitations
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

  // API Keys (example of required field)
  // API_KEY: z.string().min(1, "API_KEY is required"),
});

/**
 * Validates process.env against the schema.
 * Throws an error immediately if the environment is invalid.
 */
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid Environment Variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
