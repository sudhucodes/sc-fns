/**
 * Returns a new object with all keys whose value is `null` removed.
 * Does not mutate the input object.
 *
 * @param object - The source object.
 * @param deep - Whether to recursively clean nested objects (defaults to false).
 * @returns A new object without `null` properties.
 *
 * @example
 * ```ts
 * removeNull({ a: 1, b: null, c: "hello" });
 * // { a: 1, c: "hello" }
 * ```
 */
export function removeNull<T extends Record<string, any>>(object: T, deep = false): Partial<T> {
    if (object == null || typeof object !== "object") {
        return object;
    }

    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(object)) {
        if (value !== null) {
            if (deep && typeof value === "object" && !Array.isArray(value)) {
                result[key] = removeNull(value, true);
            } else {
                result[key] = value;
            }
        }
    }

    return result as Partial<T>;
}
