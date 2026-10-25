/**
 * Checks whether a value is an Array.
 *
 * @param value - The value to test.
 * @returns `true` if the value is an array, `false` otherwise.
 *
 * @example
 * ```ts
 * isArray([1, 2, 3]); // true
 * isArray([]); // true
 * isArray({}); // false
 * isArray("array"); // false
 * ```
 */
export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}
