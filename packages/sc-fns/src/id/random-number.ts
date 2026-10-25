/**
 * Generates a random number between `min` and `max` (inclusive for integers).
 *
 * @param min - The minimum possible value (defaults to 0).
 * @param max - The maximum possible value (defaults to 100).
 * @param integer - Whether to return an integer (defaults to true).
 * @returns A random number in the range [min, max].
 *
 * @example
 * ```ts
 * randomNumber(1, 10); // 7 (integer between 1 and 10)
 * randomNumber(0, 1, false); // 0.4285917402 (floating point)
 * ```
 */
export function randomNumber(min = 0, max = 100, integer = true): number {
    if (min > max) {
        [min, max] = [max, min];
    }

    if (integer) {
        const floorMin = Math.ceil(min);
        const floorMax = Math.floor(max);
        return Math.floor(Math.random() * (floorMax - floorMin + 1)) + floorMin;
    }

    return Math.random() * (max - min) + min;
}
