/**
 * Checks if a value is empty.
 * Returns `true` for `null`, `undefined`, empty strings, empty arrays, empty Sets,
 * empty Maps, and objects with no own enumerable string-keyed properties.
 *
 * @param value - The value to inspect.
 * @returns `true` if empty, `false` otherwise.
 *
 * @example
 * ```ts
 * isEmpty(null); // true
 * isEmpty(""); // true
 * isEmpty([]); // true
 * isEmpty({}); // true
 * isEmpty(new Map()); // true
 * isEmpty("hello"); // false
 * isEmpty([1, 2]); // false
 * isEmpty({ a: 1 }); // false
 * ```
 */
export function isEmpty(value: unknown): boolean {
    if (value == null) return true;

    if (typeof value === "string" || Array.isArray(value)) {
        return value.length === 0;
    }

    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }

    if (typeof value === "object") {
        return Object.keys(value).length === 0;
    }

    return false;
}
