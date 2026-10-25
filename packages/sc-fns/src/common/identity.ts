/**
 * Identity function that returns the first argument it receives.
 *
 * @param value - Any value.
 * @returns The exact value passed in.
 *
 * @example
 * ```ts
 * identity(42); // 42
 * [1, 2, 3].map(identity); // [1, 2, 3]
 * ```
 */
export function identity<T>(value: T): T {
    return value;
}
