import { describe, it } from 'node:test';
import { Writable } from 'node:stream';
import assert from 'node:assert/strict';
import pino from 'pino';

import { createContextLogger } from '../context-logger.js';
import { requestContext } from '#core';

describe('ContextLogger Wrapper (Strict Typing)', () => {
  const createLogCapturer = () => {
    let output = '';
    const stream = new Writable({
      write(chunk, _, cb) {
        output += chunk.toString();
        cb();
      },
    });
    return {
      stream,
      get data() {
        return output;
      },
    };
  };

  it('Should inject requestId into the trace log (requires level config)', (_, done) => {
    const capturer = createLogCapturer();
    const mockId = 'TRACE-ID-789';
    const testPino = pino({ level: 'trace' }, capturer.stream);
    const contextualLog = createContextLogger(testPino);

    requestContext.run({ requestId: mockId }, () => {
      contextualLog.trace({ step: 'Middleware internal' }, 'Trace message');

      const parsed = JSON.parse(capturer.data.trim());
      assert.strictEqual(parsed.requestId, mockId);
      assert.strictEqual(parsed.level, 10);
      assert.strictEqual(parsed.step, 'Middleware internal');
      done();
    });
  });

  it('Should inject requestId into the debug log (requires level config)', (_, done) => {
    const capturer = createLogCapturer();
    const mockId = 'DEBUG-ID-456';
    const testPino = pino({ level: 'debug' }, capturer.stream);
    const contextualLog = createContextLogger(testPino);

    requestContext.run({ requestId: mockId }, () => {
      contextualLog.debug({ detail: 'Payload investigation' }, 'Debug message');

      const parsed = JSON.parse(capturer.data.trim());
      assert.strictEqual(parsed.requestId, mockId);
      assert.strictEqual(parsed.level, 20);
      assert.strictEqual(parsed.detail, 'Payload investigation');
      done();
    });
  });

  it('Should inject requestId into the info log', (_, done) => {
    const capturer = createLogCapturer();
    const mockId = 'REQ-123-ABC';
    const testPino = pino({}, capturer.stream);
    const contextualLog = createContextLogger(testPino);

    requestContext.run({ requestId: mockId }, () => {
      contextualLog.info({ user: 'breno' }, 'Test message');

      const parsed = JSON.parse(capturer.data.trim());
      assert.strictEqual(parsed.requestId, mockId);
      assert.strictEqual(parsed.level, 30);
      assert.strictEqual(parsed.user, 'breno');
      assert.strictEqual(parsed.msg, 'Test message');
      done();
    });
  });

  it('Should inject requestId into the warn log', (_, done) => {
    const capturer = createLogCapturer();
    const mockId = 'WARN-ID-123';
    const testPino = pino({}, capturer.stream);
    const contextualLog = createContextLogger(testPino);

    requestContext.run({ requestId: mockId }, () => {
      contextualLog.warn({ reason: 'Slow Query' }, 'Warning message');

      const parsed = JSON.parse(capturer.data.trim());
      assert.strictEqual(parsed.requestId, mockId);
      assert.strictEqual(parsed.level, 40);
      assert.strictEqual(parsed.reason, 'Slow Query');
      assert.strictEqual(parsed.msg, 'Warning message');
      done();
    });
  });

  it('Should inject requestId into the error log', (_, done) => {
    const capturer = createLogCapturer();
    const mockId = 'ERR-999';
    const testPino = pino({}, capturer.stream);
    const contextualLog = createContextLogger(testPino);

    requestContext.run({ requestId: mockId }, () => {
      const errorData = { code: 'AUTH_FAILED' };
      contextualLog.error(errorData, 'Access denied');

      const parsed = JSON.parse(capturer.data.trim());
      assert.strictEqual(parsed.requestId, mockId);
      assert.strictEqual(parsed.level, 50);
      assert.strictEqual(parsed.code, 'AUTH_FAILED');
      assert.strictEqual(parsed.msg, 'Access denied');
      done();
    });
  });

  it('Should inject requestId into the fatal log', (_, done) => {
    const capturer = createLogCapturer();
    const mockId = 'FATAL-ID-999';
    const testPino = pino({}, capturer.stream);
    const contextualLog = createContextLogger(testPino);

    requestContext.run({ requestId: mockId }, () => {
      contextualLog.fatal({ exitCode: 1 }, 'Critical failure');

      const parsed = JSON.parse(capturer.data.trim());
      assert.strictEqual(parsed.requestId, mockId);
      assert.strictEqual(parsed.level, 60);
      assert.strictEqual(parsed.exitCode, 1);
      assert.strictEqual(parsed.msg, 'Critical failure');
      done();
    });
  });
});
