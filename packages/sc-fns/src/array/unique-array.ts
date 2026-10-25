/**
 * Returns a new array with duplicate primitive values removed, preserving original order.
 *
 * @param array - The source array.
 * @returns A new array with unique elements.
 *
 * @example
 * ```ts
 * uniqueArray([1, 2, 2, 3, 1, 4]); // [1, 2, 3, 4]
 * uniqueArray(["a", "b", "a", "c"]); // ["a", "b", "c"]
 * ```
 */
export function uniqueArray<T>(array: readonly T[]): T[] {
    return Array.from(new Set(array));
}
