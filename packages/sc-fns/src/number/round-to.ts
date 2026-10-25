/**
 * Rounds a number to a specified number of decimal places accurately,
 * mitigating floating-point arithmetic precision errors.
 *
 * @param value - The number to round.
 * @param decimals - The number of decimal places (defaults to 0).
 * @returns The rounded number.
 *
 * @example
 * ```ts
 * roundTo(1.005, 2); // 1.01
 * roundTo(123.456, 1); // 123.5
 * roundTo(123.456, 0); // 123
 * ```
 */
export function roundTo(value: number, decimals = 0): number {
    if (isNaN(value)) return NaN;
    if (!isFinite(value)) return value;
    if (decimals <= 0) return Math.round(value);

    // Using exponential notation to avoid floating point precision quirks
    return Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`);
}
