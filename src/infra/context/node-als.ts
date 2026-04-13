import { AsyncLocalStorage } from 'node:async_hooks';
import type {
  Context,
  ContextState,
} from '#domain/context/interfaces/context.interface.js';

interface StorageContainer<T extends ContextState> {
  state: Partial<T>;
  resources: Map<string, unknown>;
}

export class NodeALSContext<T extends ContextState> implements Context<T> {
  readonly #storageContainer = new AsyncLocalStorage<StorageContainer<T>>();

  provider(fn: () => void): void {
    this.#storageContainer.run(
      {
        state: {},
        resources: new Map<string, unknown>(),
      },
      fn,
    );
  }

  getValue<K extends keyof T>(key: K): T[K] | undefined {
    return this.getContainer().state[key];
  }

  setValue<K extends keyof T>(key: K, value: T[K]): void {
    this.getContainer().state[key] = value;
  }

  use(): Partial<T> {
    return { ...this.getContainer().state };
  }

  patch(values: Partial<T>): void {
    const container = this.getContainer();
    container.state = { ...container.state, ...values };
  }

  getResource<R>(key: string): R | undefined {
    return (this.getContainer().resources.get(key) as R) ?? undefined;
  }

  setResource<R>(key: string, resource: R): void {
    this.getContainer().resources.set(key, resource);
  }

  private getContainer(): StorageContainer<T> {
    const container = this.#storageContainer.getStore();
    if (!container) {
      throw new Error(
        '[ExecutionContext] Execution context not found. Ensure it is wrapped in ".provider()".',
      );
    }
    return container;
  }
}
