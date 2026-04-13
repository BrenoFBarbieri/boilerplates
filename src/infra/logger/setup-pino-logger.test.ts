import { describe, it } from 'node:test';
import { Writable } from 'node:stream';
import assert from 'node:assert/strict';

import { setupPinoLogger } from './setup-pino-logger.js';

describe('Pino Logger: setupPinoLogger', () => {
  it('should generate JSON with redaction of sensitive fields in production', () => {
    let output = '';
    const mockStream = new Writable({
      write(chunk, _, cb) {
        output += chunk.toString();
        cb();
      },
    });

    const myLogger = setupPinoLogger('production', 'info', mockStream);

    myLogger.info({ password: '123', user: 'breno' }, 'Login attempt');

    const parsed = JSON.parse(output.trim());

    assert.strictEqual(
      parsed.password,
      '[GDPR COMPLIANT]',
      'The configured redaction failed',
    );
    assert.strictEqual(parsed.service, 'api');
    assert.strictEqual(parsed.env, 'production');
  });

  it('should use the log level defined by the environment variable', () => {
    const myLogger = setupPinoLogger('production', 'warn');
    assert.strictEqual(myLogger.level, 'warn');
  });
});
