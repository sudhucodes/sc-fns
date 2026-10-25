/**
 * Clamps a number within the inclusive bounds [min, max].
 *
 * @param value - The number to clamp.
 * @param min - The lower bound.
 * @param max - The upper bound.
 * @returns The clamped number.
 *
 * @example
 * ```ts
 * clamp(150, 0, 100); // 100
 * clamp(-5, 0, 100); // 0
 * clamp(42, 0, 100); // 42
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.min(Math.max(value, min), max);
}
