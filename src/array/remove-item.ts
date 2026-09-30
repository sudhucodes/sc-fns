/**
 * Removes the first matching element from an array based on equality or a predicate function.
 * Does not mutate the source array.
 *
 * @param array - The source array.
 * @param itemOrPredicate - The element to remove or a predicate function `(item, index) => boolean`.
 * @returns A new array with the element removed.
 *
 * @example
 * ```ts
 * removeItem([1, 2, 3, 2, 4], 2); // [1, 3, 2, 4]
 * removeItem(["apple", "banana", "cherry"], item => item.startsWith("b")); // ["apple", "cherry"]
 * ```
 */
export function removeItem<T>(
    array: readonly T[],
    itemOrPredicate: T | ((item: T, index: number) => boolean),
): T[] {
    const index =
        typeof itemOrPredicate === "function"
            ? array.findIndex(itemOrPredicate as (item: T, index: number) => boolean)
            : array.indexOf(itemOrPredicate);

    if (index === -1) {
        return [...array];
    }

    const result = [...array];
    result.splice(index, 1);
    return result;
}
