/**
 * Creates a new array with its elements shuffled in random order using the Fisher-Yates algorithm.
 * Does NOT mutate the input array.
 *
 * @param array - The source array to shuffle.
 * @returns A new shuffled array.
 *
 * @example
 * ```ts
 * const original = [1, 2, 3, 4, 5];
 * const shuffled = shuffleArray(original);
 * // original is unchanged: [1, 2, 3, 4, 5]
 * // shuffled is e.g. [3, 1, 5, 2, 4]
 * ```
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = result[i]!;
        result[i] = result[j]!;
        result[j] = temp;
    }
    return result;
}
