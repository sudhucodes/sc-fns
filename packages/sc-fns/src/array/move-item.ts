/**
 * Moves an element within an array from one index position to another.
 * Supports negative indices (relative to the end of the array).
 * Does not mutate the source array.
 *
 * @param array - The source array.
 * @param fromIndex - The current index of the item to move.
 * @param toIndex - The target index to move the item to.
 * @returns A new array with the item moved.
 *
 * @example
 * ```ts
 * moveItem(["a", "b", "c", "d"], 0, 2); // ["b", "c", "a", "d"]
 * moveItem(["a", "b", "c", "d"], -1, 0); // ["d", "a", "b", "c"]
 * ```
 */
export function moveItem<T>(array: readonly T[], fromIndex: number, toIndex: number): T[] {
    const len = array.length;
    if (len <= 1) return [...array];

    let from = fromIndex < 0 ? len + fromIndex : fromIndex;
    let to = toIndex < 0 ? len + toIndex : toIndex;

    // Clamp indices within array boundaries
    from = Math.max(0, Math.min(len - 1, from));
    to = Math.max(0, Math.min(len - 1, to));

    if (from === to) return [...array];

    const result = [...array];
    const [item] = result.splice(from, 1);
    result.splice(to, 0, item!);
    return result;
}
