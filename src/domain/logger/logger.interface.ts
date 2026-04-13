export type LogLevel =
  | 'fatal'
  | 'error'
  | 'warn'
  | 'info'
  | 'debug'
  | 'trace'
  | 'silent';

export interface LogMethod {
  (msg: string): void;
  (obj: object, msg: string): void;
}

interface Base<T> {
  // Log Methods
  trace: LogMethod;
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  fatal: LogMethod;

  /**
   * Method the creation of stateful loggers
   * @param bindings information object for dissemination in logs
   */
  child(bindings: object): T;
}

export type BaseLogger = Base<BaseLogger>;
