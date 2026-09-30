import { deepClone } from "./deep-clone";

function isPlainObject(item: unknown): item is Record<string, unknown> {
    return (
        typeof item === "object" &&
        item !== null &&
        !Array.isArray(item) &&
        Object.prototype.toString.call(item) === "[object Object]"
    );
}

/**
 * Deeply merges multiple objects into a new object without mutating any arguments.
 * Nested plain objects are merged recursively. Arrays and primitives from later objects overwrite earlier ones.
 * Prototype pollution keys (__proto__, prototype, constructor) are safely skipped.
 *
 * @param target - The base object.
 * @param sources - One or more source objects to merge in order.
 * @returns A new deeply merged object.
 *
 * @example
 * ```ts
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * const merged = deepMerge(obj1, obj2);
 * // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * ```
 */
export function deepMerge<T extends Record<string, any>>(
    target: T,
    ...sources: Array<Record<string, any>>
): T {
    const output = deepClone(target);

    for (const source of sources) {
        if (!isPlainObject(source)) continue;

        for (const key of Object.keys(source)) {
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
                continue;
            }

            const sourceValue = source[key];
            const targetValue = (output as Record<string, unknown>)[key];

            if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
                (output as Record<string, unknown>)[key] = deepMerge(targetValue, sourceValue);
            } else if (sourceValue !== undefined) {
                (output as Record<string, unknown>)[key] = deepClone(sourceValue);
            }
        }
    }

    return output;
}
