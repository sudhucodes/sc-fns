/**
 * Checks whether a value is a valid, finite number (excludes `NaN`, `Infinity`, and `-Infinity`).
 *
 * @param value - The value to test.
 * @returns `true` if the value is a valid finite number, `false` otherwise.
 *
 * @example
 * ```ts
 * isNumber(42); // true
 * isNumber(3.14); // true
 * isNumber(0); // true
 * isNumber(NaN); // false
 * isNumber(Infinity); // false
 * isNumber("42"); // false
 * ```
 */
export function isNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value);
}
