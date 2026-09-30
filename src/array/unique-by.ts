/**
 * Returns a new array with duplicate elements removed based on a selector key or iteratee function.
 * Preserves the first encountered instance of each key.
 *
 * @param array - The source array.
 * @param iteratee - Property key name or mapping function that computes the uniqueness key.
 * @returns A new array with unique items according to the iteratee.
 *
 * @example
 * ```ts
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 1, name: "Alice Duplicate" },
 * ];
 * uniqueBy(users, "id");
 * // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
 *
 * uniqueBy(users, u => u.id);
 * // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
 * ```
 */
export function uniqueBy<T, K>(array: readonly T[], iteratee: keyof T | ((item: T) => K)): T[] {
    const seen = new Set<unknown>();
    const result: T[] = [];

    const getKey =
        typeof iteratee === "function" ? (item: T) => iteratee(item) : (item: T) => item[iteratee];

    for (const item of array) {
        const key = getKey(item);
        if (!seen.has(key)) {
            seen.add(key);
            result.push(item);
        }
    }

    return result;
}
