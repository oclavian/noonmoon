/**
 * Polyfill / Guard for environments where fetch has only a getter on Window or prototype.
 * Prevents "TypeError: Cannot set property fetch of #<Window> which has only a getter".
 */
(function setupFetchGuard() {
  if (typeof window === 'undefined' && typeof globalThis === 'undefined') return;
  try {
    const g: any = typeof globalThis !== 'undefined' ? globalThis : window;
    let currentFetch = g.fetch ? (g.fetch.bind ? g.fetch.bind(g) : g.fetch) : undefined;

    const descriptor: PropertyDescriptor = {
      get() {
        return currentFetch;
      },
      set(newFetch: any) {
        currentFetch = newFetch;
      },
      configurable: true,
      enumerable: true
    };

    // 1. Define on Window.prototype if available
    if (typeof Window !== 'undefined' && (Window as any).prototype) {
      try {
        Object.defineProperty((Window as any).prototype, 'fetch', descriptor);
      } catch (_) {}
    }

    // 2. Define on each prototype in the prototype chain
    try {
      let proto = Object.getPrototypeOf(g);
      while (proto && proto !== Object.prototype) {
        try {
          Object.defineProperty(proto, 'fetch', descriptor);
        } catch (_) {}
        proto = Object.getPrototypeOf(proto);
      }
    } catch (_) {}

    // 3. Define directly on the global object
    try {
      Object.defineProperty(g, 'fetch', descriptor);
    } catch (_) {}
  } catch (_) {}
})();

export {};
