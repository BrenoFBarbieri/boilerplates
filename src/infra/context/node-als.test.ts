import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { NodeALSContext } from './node-als.js';
import type { Context } from '#domain/context/interfaces/context.interface.js';
import type { RequestContextSchema } from '#domain/context/schemas/request-context.schema.js';

describe('NodeALSContext (Strict Type-Safe)', () => {
  let sut: Context<RequestContextSchema>;

  beforeEach(() => {
    sut = new NodeALSContext<RequestContextSchema>();
  });

  it('should fail fast when accessing data outside of a run conxtext', () => {
    const expectedError = {
      message:
        '[ExecutionContext] Execution context not found. Ensure it is wrapped in ".provider()".',
    };

    assert.throws(() => sut.getValue('traceId'), expectedError);
    assert.throws(() => sut.setValue('userId', 'user-1'), expectedError);
    assert.throws(() => sut.use(), expectedError);
    assert.throws(() => sut.patch({}), expectedError);
    assert.throws(() => sut.getResource('test'), expectedError);
    assert.throws(() => sut.setResource('test', () => {}), expectedError);
  });

  it('should ensure data integrity and isolation between contexts', async () => {
    const runTask = (tenantId: string, traceId: string) =>
      new Promise<void>((resolve, reject) => {
        sut.provider(() => {
          sut.setValue('tenantId', tenantId);
          sut.setValue('traceId', traceId);

          // Simulate IO
          setImmediate(() => {
            try {
              assert.strictEqual(sut.getValue('tenantId'), tenantId);
              assert.strictEqual(sut.getValue('traceId'), traceId);
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        });
      });

    await Promise.all([
      runTask('company_1', 'abc-123'),
      runTask('company_2', 'cba-321'),
    ]);
  });

  it('should protect the internal state by returning a new object reference in .use()', () => {
    sut.provider(() => {
      const traceId = 'abc-123';
      sut.setValue('traceId', traceId);

      const state1 = sut.use();
      const state2 = sut.use();

      assert.notStrictEqual(
        state1,
        state2,
        'Each call to .use() must return a new object reference',
      );
      assert.strictEqual(state1.traceId, traceId);
    });
  });

  it('should add and/or update the state value without deleting the existing one using .patch()', () => {
    sut.provider(() => {
      const traceId = 'abc-123';
      sut.setValue('traceId', traceId);

      assert.deepStrictEqual(sut.use(), { traceId });

      const values: Partial<RequestContextSchema> = {
        userId: 'user-1',
        tenantId: 'tenant-1',
        userRole: 'admin',
      };

      sut.patch(values);

      assert.deepStrictEqual(
        sut.use(),
        { ...values, traceId },
        'The values should be merged',
      );
    });
  });

  it('should ensure each provider call creates a fresh execution context without side-effects', () => {
    sut.provider(() => {
      sut.setValue('traceId', 'parent');

      sut.provider(() => {
        assert.strictEqual(
          sut.getValue('traceId'),
          undefined,
          'A nested scope must start clean',
        );

        sut.setValue('traceId', 'child');

        assert.strictEqual(
          sut.getValue('traceId'),
          'child',
          'A child scope must have its own context and values',
        );
      });

      assert.strictEqual(
        sut.getValue('traceId'),
        'parent',
        'The parent scope must remain unchanged after the child scope is executed',
      );
    });
  });

  it('should keep business data and infrastructure resources separated', () => {
    sut.provider(() => {
      const key_logger = 'LOGGER';
      const mockLogger = { id: 'child-logger' };

      sut.setValue('userId', 'user-1');
      sut.setResource(key_logger, mockLogger);

      assert.strictEqual(sut.getValue('userId'), 'user-1');
      assert.deepStrictEqual(sut.use(), { userId: 'user-1' });

      const resource = sut.getResource<typeof mockLogger>(key_logger);
      assert.strictEqual(resource?.id, 'child-logger');
      assert.ok(
        !(key_logger in sut.use()),
        'Technical resources should not be leaked to the domain',
      );
    });
  });
});
