/**
 * Splits an array into chunks of a specified size.
 *
 * @param array - The source array to partition.
 * @param size - The size of each chunk.
 * @returns An array containing chunked arrays.
 *
 * @example
 * ```ts
 * chunkArray([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 * chunkArray(["a", "b", "c"], 1); // [["a"], ["b"], ["c"]]
 * ```
 */
export function chunkArray<T>(array: readonly T[], size: number): T[][] {
    if (size <= 0 || array.length === 0) return [];

    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}
