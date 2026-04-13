import type {
  Logger,
  BaseLogger,
  LogLevel,
} from './interfaces/logger.interface.js';
import type {
  Context,
  ContextState,
} from '#domain/context/interfaces/context.interface.js';

export class ContextualLogger implements Logger {
  private readonly CONTEXT_KEY = 'ACTIVE_LOGGER';

  constructor(
    private readonly baseLogger: BaseLogger,
    private readonly context: Context<ContextState>,
  ) {}

  info(msg: string): void;
  info(obj: object, msg: string): void;
  info(p1: string | object, p2?: string): void {
    this.emitLog('info', p1, p2);
  }

  error(msg: string): void;
  error(obj: object, msg: string): void;
  error(p1: string | object, p2?: string): void {
    this.emitLog('error', p1, p2);
  }

  warn(msg: string): void;
  warn(obj: object, msg: string): void;
  warn(p1: string | object, p2?: string): void {
    this.emitLog('warn', p1, p2);
  }

  debug(msg: string): void;
  debug(obj: object, msg: string): void;
  debug(p1: string | object, p2?: string): void {
    this.emitLog('debug', p1, p2);
  }

  trace(msg: string): void;
  trace(obj: object, msg: string): void;
  trace(p1: string | object, p2?: string): void {
    this.emitLog('trace', p1, p2);
  }

  fatal(msg: string): void;
  fatal(obj: object, msg: string): void;
  fatal(p1: string | object, p2?: string): void {
    this.emitLog('fatal', p1, p2);
  }

  child(bindings: object) {
    const ctx = this.context.getResource<ContextualLogger>(this.CONTEXT_KEY);
    const baseLogger = ctx ? ctx.baseLogger : this.baseLogger;
    const child = baseLogger.child(bindings);
    return new ContextualLogger(child, this.context);
  }

  bind(bindings: object): void {
    this.context.setResource(this.CONTEXT_KEY, this.child(bindings));
  }

  private emitLog(
    level: Exclude<LogLevel, 'silent'>,
    p1: string | object,
    p2?: string,
  ): void {
    const ctx = this.context.getResource<ContextualLogger>(this.CONTEXT_KEY);
    const baseLogger = ctx?.baseLogger ?? this.baseLogger;

    if (p1 && typeof p1 === 'object') {
      baseLogger[level](p1, p2 ?? '');
      return;
    }
    baseLogger[level](p1);
  }
}
