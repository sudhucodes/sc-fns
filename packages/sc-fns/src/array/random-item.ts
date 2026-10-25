/**
 * Picks a single random element from an array.
 * Returns `undefined` if the array is empty.
 *
 * @param array - The source array.
 * @returns A random element from the array, or `undefined` if empty.
 *
 * @example
 * ```ts
 * randomItem(["a", "b", "c"]); // "b"
 * randomItem([]); // undefined
 * ```
 */
export function randomItem<T>(array: readonly T[]): T | undefined {
    if (array.length === 0) return undefined;
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}
