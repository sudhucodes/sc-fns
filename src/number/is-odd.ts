/**
 * Checks whether a given number is an odd integer.
 *
 * @param value - The value to test.
 * @returns `true` if the number is an odd integer, `false` otherwise.
 *
 * @example
 * ```ts
 * isOdd(3); // true
 * isOdd(-5); // true
 * isOdd(0); // false
 * isOdd(4); // false
 * isOdd(3.5); // false
 * ```
 */
export function isOdd(value: number): boolean {
    return Number.isInteger(value) && Math.abs(value % 2) === 1;
}
