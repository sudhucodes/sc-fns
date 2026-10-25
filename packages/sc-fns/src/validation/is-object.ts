export interface IsObjectOptions {
    /**
     * If true, only plain objects created by {} or Object.create(null) return true.
     * Excludes class instances, Dates, RegExps, etc.
     * @default true
     */
    plainOnly?: boolean;
}

/**
 * Checks whether a value is an object (non-null, non-array).
 * By default checks for plain objects.
 *
 * @param value - The value to test.
 * @param options - Options to enforce plain objects only.
 * @returns `true` if the value is an object, `false` otherwise.
 *
 * @example
 * ```ts
 * isObject({ a: 1 }); // true
 * isObject(Object.create(null)); // true
 * isObject([1, 2]); // false
 * isObject(null); // false
 * isObject("str"); // false
 * ```
 */
export function isObject(
    value: unknown,
    options: IsObjectOptions = {},
): value is Record<PropertyKey, unknown> {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        return false;
    }

    const { plainOnly = true } = options;

    if (plainOnly) {
        const proto = Object.getPrototypeOf(value);
        return proto === null || proto === Object.prototype;
    }

    return true;
}
