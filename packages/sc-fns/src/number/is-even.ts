/**
 * Checks whether a given number is an even integer.
 *
 * @param value - The value to test.
 * @returns `true` if the number is an even integer, `false` otherwise.
 *
 * @example
 * ```ts
 * isEven(4); // true
 * isEven(0); // true
 * isEven(-2); // true
 * isEven(3); // false
 * isEven(4.5); // false
 * ```
 */
export function isEven(value: number): boolean {
    return Number.isInteger(value) && value % 2 === 0;
}
