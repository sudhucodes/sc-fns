/**
 * Flattens nested arrays up to a specified depth.
 * Does not mutate the source array.
 *
 * @param array - The array to flatten.
 * @param depth - The maximum recursion depth (defaults to 1).
 * @returns A flattened array.
 *
 * @example
 * ```ts
 * flattenArray([1, [2, [3, [4]]]]); // [1, 2, [3, [4]]]
 * flattenArray([1, [2, [3, [4]]]], 2); // [1, 2, 3, [4]]
 * flattenArray([1, [2, [3, [4]]]], Infinity); // [1, 2, 3, 4]
 * ```
 */
export function flattenArray<T>(array: readonly any[], depth = 1): T[] {
    if (depth <= 0) {
        return [...array] as T[];
    }
    return array.flat(depth) as T[];
}
