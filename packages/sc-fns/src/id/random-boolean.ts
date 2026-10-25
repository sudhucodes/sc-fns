/**
 * Generates a random boolean with an optional probability weight.
 *
 * @param chance - Probability of returning `true`, between 0 and 1 (defaults to 0.5).
 * @returns A random boolean value.
 *
 * @example
 * ```ts
 * randomBoolean(); // true (50% chance)
 * randomBoolean(0.8); // 80% chance of true, 20% chance of false
 * ```
 */
export function randomBoolean(chance = 0.5): boolean {
    if (chance <= 0) return false;
    if (chance >= 1) return true;
    return Math.random() < chance;
}
