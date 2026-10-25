/**
 * Creates a function that is restricted to invoking `fn` once.
 * Subsequent calls to the function return the cached result of the initial invocation.
 *
 * @param fn - The function to restrict.
 * @returns The wrapped function.
 *
 * @example
 * ```ts
 * const initialize = once(() => setupDatabaseConnection());
 * initialize(); // executes setup
 * initialize(); // returns cached connection result without re-executing
 * ```
 */
export function once<T extends (...args: any[]) => any>(
    fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
    let called = false;
    let result: ReturnType<T>;

    return function (this: any, ...args: Parameters<T>): ReturnType<T> {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}
