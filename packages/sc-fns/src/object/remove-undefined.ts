/**
 * Returns a new object with all keys whose value is `undefined` removed.
 * Does not mutate the input object.
 *
 * @param object - The source object.
 * @param deep - Whether to recursively clean nested objects (defaults to false).
 * @returns A new object without `undefined` properties.
 *
 * @example
 * ```ts
 * removeUndefined({ a: 1, b: undefined, c: "hello" });
 * // { a: 1, c: "hello" }
 * ```
 */
export function removeUndefined<T extends Record<string, any>>(
    object: T,
    deep = false,
): Partial<T> {
    if (object == null || typeof object !== "object") {
        return object;
    }

    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(object)) {
        if (value !== undefined) {
            if (deep && typeof value === "object" && value !== null && !Array.isArray(value)) {
                result[key] = removeUndefined(value, true);
            } else {
                result[key] = value;
            }
        }
    }

    return result as Partial<T>;
}
