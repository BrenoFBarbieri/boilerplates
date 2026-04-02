import { AsyncLocalStorage } from 'node:async_hooks';
import { ulid } from 'ulid';

import type { BaseRequest, Middleware } from './types.js';

function getHeader(
  headers: BaseRequest['headers'],
  key: string,
): string | undefined {
  const value = headers[key.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

const requestContext = new AsyncLocalStorage<{ requestId: string }>();

const requestContextMiddleware: Middleware = (req, res, next) => {
  const keyHeader = 'x-request-id';

  const requestId = getHeader(req.headers, keyHeader) || ulid();

  // Ensures that the ID is sent back in the header to the client
  res.setHeader(keyHeader, requestId);

  requestContext.run({ requestId }, () => {
    next();
  });
};

export { requestContext, requestContextMiddleware };
