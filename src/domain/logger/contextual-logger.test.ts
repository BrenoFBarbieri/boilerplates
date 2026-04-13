import { describe, it, beforeEach, mock, type Mock } from 'node:test';
import assert from 'node:assert/strict';

import { ContextualLogger } from './contextual-logger.js';
import type { BaseLogger } from './interfaces/logger.interface.js';
import type {
  Context,
  ContextState,
} from '#domain/context/interfaces/context.interface.js';

interface MockLogger {
  info: Mock<(msg: string | object, p2?: string) => void>;
  error: Mock<(msg: string | object, p2?: string) => void>;
  child: Mock<(bindings: object) => MockLogger>;
}

interface MockContext {
  getResource: Mock<(key: string) => unknown>;
  setResource: Mock<(key: string, val: MockLogger) => void>;
}

describe('ContextualLogger', () => {
  let mockBaseLogger: MockLogger;
  let mockContext: MockContext;
  let sut: ContextualLogger;
  let resources: Map<string, MockLogger>;

  beforeEach(() => {
    const createMockLogger = (bindings = {}) => ({
      info: mock.fn(),
      error: mock.fn(),
      warn: mock.fn(),
      debug: mock.fn(),
      trace: mock.fn(),
      fatal: mock.fn(),
      child: mock.fn((newBindings) =>
        createMockLogger({ ...bindings, ...newBindings }),
      ),
      bindings,
    });

    mockBaseLogger = createMockLogger();

    resources = new Map();
    mockContext = {
      getResource: mock.fn((key) => resources.get(key)),
      setResource: mock.fn((key, val) => resources.set(key, val)),
    };

    sut = new ContextualLogger(
      mockBaseLogger as unknown as BaseLogger,
      mockContext as unknown as Context<ContextState>,
    );
  });

  it('should call base logger when no contextual logger is bound', () => {
    const message = 'test message';
    sut.info(message);

    assert.strictEqual(mockBaseLogger.info.mock.callCount(), 1);
    assert.deepStrictEqual(mockBaseLogger.info.mock.calls[0].arguments, [
      message,
    ]);
  });

  it('should use the logger from context after bind is called', () => {
    const bindings = { correlationId: '123' };

    sut.bind(bindings);

    const loggerInstanceInContext = resources.get('ACTIVE_LOGGER');
    assert.ok(
      loggerInstanceInContext instanceof ContextualLogger,
      'Should be a ContextualLogger instance',
    );

    mockContext.getResource.mock.resetCalls();
    const internalChildMock = mockBaseLogger.child.mock.calls[0].result;

    sut.info('log with context');

    assert.strictEqual(mockContext.getResource.mock.callCount(), 1);

    assert.strictEqual(internalChildMock?.info.mock.callCount(), 1);
    assert.deepStrictEqual(internalChildMock?.info.mock.calls[0].arguments, [
      'log with context',
    ]);
  });

  it('should handle object and message overloads correctly', () => {
    const logObj = { user: 'John' };
    const logMsg = 'login attempt';

    sut.error(logObj, logMsg);

    assert.strictEqual(mockBaseLogger.error.mock.callCount(), 1);
    assert.deepStrictEqual(mockBaseLogger.error.mock.calls[0].arguments, [
      logObj,
      logMsg,
    ]);
  });

  it('should create a new ContextualLogger instance when child() is called', () => {
    const childBindings = { component: 'auth' };
    const childLogger = sut.child(childBindings);

    assert.ok(childLogger instanceof ContextualLogger);
    assert.notStrictEqual(childLogger, sut);
    assert.strictEqual(mockBaseLogger.child.mock.callCount(), 1);
  });

  it('should stack bindings when calling child within an already bound context', () => {
    const boundLogger = sut.child({ first: 1 });
    mockContext.setResource(
      'ACTIVE_LOGGER',
      boundLogger as unknown as MockLogger,
    );

    sut.child({ second: 2 });

    assert.ok(mockContext.getResource.mock.callCount() > 0);
  });
});
