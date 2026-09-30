/**
 * Creates an object composed of the picked object properties.
 * Does not mutate the source object.
 *
 * @param object - The source object.
 * @param keys - Array of property keys to pick.
 * @returns A new object with the picked properties.
 *
 * @example
 * ```ts
 * const user = { id: 1, name: "Alice", role: "admin", active: true };
 * pick(user, ["id", "name"]); // { id: 1, name: "Alice" }
 * ```
 */
export function pick<T extends object, K extends keyof T>(
    object: T,
    keys: readonly K[],
): Pick<T, K> {
    const result = {} as Pick<T, K>;
    if (object == null) return result;

    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            result[key] = object[key];
        }
    }

    return result;
}
