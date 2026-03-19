import { test, describe } from 'node:test';
import assert from 'node:assert';
import { env } from './config.js';

describe('System Configuration', () => {
  test('should load environment variables correctly', () => {
    // Check if the defaults or .env.test values are present
    assert.ok(env.PORT, 'PORT should be defined');
    assert.strictEqual(typeof env.PORT, 'number');
  });

  test('should have a valid NODE_ENV', () => {
    const validEnvironments = ['development', 'test', 'production'];
    assert.ok(
      validEnvironments.includes(env.NODE_ENV),
      `NODE_ENV should be one of ${validEnvironments.join(', ')}`,
    );
  });

  test('should have a valid database protocol', () => {
    const hasValidProtocol =
      env.DATABASE_URL.startsWith('postgres://') ||
      env.DATABASE_URL.startsWith('postgresql://');

    assert.strictEqual(
      hasValidProtocol,
      true,
      'DATABASE_URL should use PostgreSQL protocol',
    );
  });
});
