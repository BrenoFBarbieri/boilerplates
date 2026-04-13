import type { Context } from '#domain/context/interfaces/context.interface.js';
import type { RequestContextSchema } from '#domain/context/schemas/request-context.schema.js';

type RequestContext = Context<RequestContextSchema>;

export let requestContext: RequestContext;

export function setRequestContext(c: RequestContext) {
  requestContext = c;
}
