import { describe, it } from 'node:test';
import assert from 'node:assert';

import { env } from '#/config.js';

describe('Environment Configuration', () => {
  describe('Server & Network Settings', () => {
    it('should correctly coerce APP_PORT to a number', () => {
      assert.strictEqual(typeof env.APP_PORT, 'number');
      assert.ok(env.APP_PORT > 0, 'APP_PORT should be a positive number');
    });

    it('should have a generated APP_URL containing the port', () => {
      assert.ok(env.APP_URL, 'APP_URL should be defined');
      assert.match(
        env.APP_URL,
        new RegExp(`:${env.APP_PORT}$`),
        'APP_URL should end with the defined APP_PORT',
      );
    });

    it('should validate APP_BODY_LIMIT format and lowercase it', () => {
      assert.match(env.APP_BODY_LIMIT, /^\d+(b|kb|mb|gb)$/);
      assert.strictEqual(env.APP_BODY_LIMIT, env.APP_BODY_LIMIT.toLowerCase());
    });
  });

  describe('Security & Auth', () => {
    it('should have a sufficiently strong JWT_SECRET', () => {
      assert.ok(env.JWT_SECRET.length >= 32, 'JWT_SECRET is too short');
    });

    it('should have a valid JWT_EXPIRES_IN format', () => {
      const isDuration = /^(\d+[smhdw]|unlimited)$/.test(env.JWT_EXPIRES_IN);
      assert.strictEqual(isDuration, true, 'JWT_EXPIRES_IN format is invalid');
    });
  });

  describe('Database & Logging', () => {
    it('should have a valid database protocol (Postgres or Mongo)', () => {
      const protocols = ['postgres://', 'postgresql://', 'mongodb://'];
      const hasValidProtocol = protocols.some((p) =>
        env.DATABASE_URL.startsWith(p),
      );

      assert.strictEqual(
        hasValidProtocol,
        true,
        'DATABASE_URL must be a supported database protocol',
      );
    });

    it('should have a lowercase LOG_LEVEL', () => {
      const validLevels = [
        'fatal',
        'error',
        'warn',
        'info',
        'debug',
        'trace',
        'silent',
      ];
      assert.ok(validLevels.includes(env.LOG_LEVEL));
      assert.strictEqual(env.LOG_LEVEL, env.LOG_LEVEL.toLowerCase());
    });
  });

  describe('Logical Transformations', () => {
    it('should ensure APP_TIMEOUT is a positive integer', () => {
      assert.ok(Number.isInteger(env.APP_TIMEOUT));
      assert.ok(env.APP_TIMEOUT > 0);
    });
  });
});
