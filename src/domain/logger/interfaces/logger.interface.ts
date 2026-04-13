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

export interface Logger extends Base<Logger> {
  /**
   * Sets the active logger instance in the current context based on the provided bindings.
   * The bindings will be used to create a new logger instance with the same base logger but with the additional context information.
   * @param bindings - The additional context information to be used when creating a new logger instance.
   */
  bind(bindings: object): void;
}
