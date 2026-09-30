export interface IsJSONOptions {
    /**
     * If true, only JSON objects ({...}) and arrays ([...]) are accepted.
     * @default false
     */
    objectsOrArraysOnly?: boolean;
}

/**
 * Validates whether a value is a valid JSON string without throwing errors.
 *
 * @param value - The value to test.
 * @param options - Options to enforce object or array structures.
 * @returns `true` if valid JSON, `false` otherwise.
 *
 * @example
 * ```ts
 * isJSON('{"a":1,"b":2}'); // true
 * isJSON('[1, 2, 3]'); // true
 * isJSON('{ invalid json }'); // false
 * ```
 */
export function isJSON(value: unknown, options: IsJSONOptions = {}): value is string {
    if (typeof value !== "string") return false;

    const trimmed = value.trim();
    if (!trimmed) return false;

    const { objectsOrArraysOnly = false } = options;

    if (objectsOrArraysOnly) {
        const firstChar = trimmed[0];
        const lastChar = trimmed[trimmed.length - 1];
        const isObject = firstChar === "{" && lastChar === "}";
        const isArray = firstChar === "[" && lastChar === "]";
        if (!isObject && !isArray) return false;
    }

    try {
        JSON.parse(trimmed);
        return true;
    } catch {
        return false;
    }
}
