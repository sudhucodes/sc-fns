/**
 * Creates an object composed of the properties not included in the specified keys list.
 * Does not mutate the source object.
 *
 * @param object - The source object.
 * @param keys - Array of property keys to omit.
 * @returns A new object without the omitted properties.
 *
 * @example
 * ```ts
 * const user = { id: 1, name: "Alice", role: "admin", active: true };
 * omit(user, ["role", "active"]); // { id: 1, name: "Alice" }
 * ```
 */
export function omit<T extends object, K extends keyof T>(
    object: T,
    keys: readonly K[],
): Omit<T, K> {
    const result = { ...object };
    if (object == null) return result;

    const keySet = new Set<unknown>(keys);
    for (const key of Object.keys(result)) {
        if (keySet.has(key)) {
            delete (result as Record<string, unknown>)[key];
        }
    }

    return result;
}
