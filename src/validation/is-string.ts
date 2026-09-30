/**
 * Checks whether a value is a string primitive.
 *
 * @param value - The value to test.
 * @returns `true` if the value is a string, `false` otherwise.
 *
 * @example
 * ```ts
 * isString("hello"); // true
 * isString(""); // true
 * isString(123); // false
 * isString(null); // false
 * ```
 */
export function isString(value: unknown): value is string {
    return typeof value === "string";
}
