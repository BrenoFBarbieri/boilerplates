import { envSchema } from './env.schema.js';

/**
 * Validates process.env against the schema.
 * Throws an error immediately if the environment is invalid.
 */
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error('Invalid Environment Variables:');

  _env.error.issues.forEach((issue) => {
    const prop = String(issue.path[0]);
    console.error(` - ${prop}: \n\t * ${issue.message}`);
  });

  process.exit(1);
}

const env = _env.data;

export { env };
