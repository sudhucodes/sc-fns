/**
 * Groups elements of an array according to a key or the result of an iteratee function.
 *
 * @param array - The source array.
 * @param iteratee - A property key or function producing the grouping key for each element.
 * @returns An object where keys are the grouping identifiers and values are arrays of matching elements.
 *
 * @example
 * ```ts
 * const words = ["one", "two", "three"];
 * groupBy(words, "length");
 * // { "3": ["one", "two"], "5": ["three"] }
 *
 * const numbers = [6.1, 4.2, 6.3];
 * groupBy(numbers, Math.floor);
 * // { "4": [4.2], "6": [6.1, 6.3] }
 * ```
 */
export function groupBy<T, K extends PropertyKey>(
    array: readonly T[],
    iteratee: keyof T | ((item: T) => K),
): Record<K, T[]> {
    const result = {} as Record<K, T[]>;

    const getKey =
        typeof iteratee === "function"
            ? (item: T) => iteratee(item)
            : (item: T) => item[iteratee] as unknown as K;

    for (const item of array) {
        const key = getKey(item);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
    }

    return result;
}
