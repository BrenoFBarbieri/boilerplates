import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import type { BaseRequest, BaseResponse } from '../types.js';
import {
  requestContext,
  requestContextMiddleware,
} from '../request-context.js';

describe('RequestContext Middleware (Type-Safe)', () => {
  it('should reuse the requestId if the header x-request-id header is present', (_, done) => {
    const mockId = '01ARZ3NDEKTSV4RRFFQ69G5FAV';

    const req: BaseRequest = {
      headers: { 'x-request-id': mockId },
    };

    const res: BaseResponse = {
      setHeader: (key: string, value: string) => {
        assert.strictEqual(key, 'x-request-id');
        assert.strictEqual(value, mockId);
      },
    };

    const next = () => {
      const store = requestContext.getStore();
      assert.strictEqual(store?.requestId, mockId);
      done();
    };
    requestContextMiddleware(req, res, next);
  });

  it('should generate a new 26-character ULID if the header is not present', (_, done) => {
    const req: BaseRequest = { headers: {} };
    let capturedId = '';

    const res: BaseResponse = {
      setHeader: (_key: string, value: string) => {
        capturedId = value;
      },
    };

    const next = () => {
      const store = requestContext.getStore();
      assert.ok(store?.requestId, 'There must be a requestId in the context');
      assert.strictEqual(
        store?.requestId,
        capturedId,
        'The ID in the context must be the same as the one sent in the header',
      );
      assert.strictEqual(
        capturedId.length,
        26,
        'The generated ULID must be 26 characters long',
      );
      done();
    };
    requestContextMiddleware(req, res, next);
  });

  it('should ensure context isolation in concurrent calls', (_, done) => {
    const createReq = (id: string): BaseRequest => ({
      headers: { 'x-request-id': id },
    });
    const mockRes: BaseResponse = { setHeader: () => {} };

    let completed = 0;
    const totalRequests = 2;

    const runRequest = (id: string, delay: number) => {
      requestContextMiddleware(createReq(id), mockRes, () => {
        // Simulating an asynchronous operation (e.g.: search in DB)
        setTimeout(() => {
          const store = requestContext.getStore();
          assert.strictEqual(
            store?.requestId,
            id,
            `Corrupted context: expected ${id}`,
          );

          completed++;
          if (completed === totalRequests) done();
        }, delay);
      });
    };

    // Simulating concurrent requests
    runRequest('REQ-ALPHA', 15);
    runRequest('REQ-BETA', 5);
  });
});
