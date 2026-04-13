export type ContextState = object;

export interface Context<T extends ContextState> {
  /**
   * Executes a callback within a new, isolated execution context.
   * All operations inside this scope will share the same state and resources.
   * @param callback - The closure to be executed within the context.
   */
  provider(callback: () => void): void;

  /**
   * Retrieves a specific value from the current context state.
   * @param key - The property name defined in the generic type T.
   * @returns The stored value for the given key, or `undefined` if not set.
   * @throws {Error} If invoked outside an active execution context.
   */
  getValue<K extends keyof T>(key: K): T[K] | undefined;

  /**
   * Updates or sets a specific value in the current context state.
   * @param key - The property name defined in the generic type T.
   * @param value - The new value to be associated with the key.
   * @throws {Error} If invoked outside an active execution context.
   */
  setValue<K extends keyof T>(key: K, value: T[K]): void;

  /**
   * Function that returns the current context state object
   * @returns The current context object
   * @throws {Error} If invoked outside an active execution context.
   */
  use(): Partial<T>;

  /**
   * Updates multiple values in the current context state.
   * Performs a shallow merge with the existing state.
   * @param values Object containing the keys and values to be updated
   * @throws {Error} If invoked outside an active execution context.
   */
  patch(values: Partial<T>): void;

  /**
   * Retrieves a typed resource stored in the context by its unique key.
   * Unlike state values, resources are intended for complex objects like loggers or database connections.
   * @template R The expected type of the resource to be retrieved.
   * @param key The unique string identifier for the resource.
   * @returns The resource instance of type R, or undefined if not found.
   * @throws {Error} If invoked outside an active execution context.
   */
  getResource<R>(key: string): R | undefined;

  /**
   * Stores a typed resource in the current context.
   * Use this for dependency injection or sharing instances within the same execution scope.
   * @template R The type of the resource being stored.
   * @param key Unique identifier for the resource.
   * @param resource The instance/value to be stored.
   * @throws {Error} If invoked outside an active execution context.
   */
  setResource<R>(key: string, resource: R): void;
}
