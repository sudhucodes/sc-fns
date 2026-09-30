/**
 * Creates a deep copy of a value, cloning nested objects, arrays, Dates, RegExps, Maps, Sets,
 * while correctly preserving circular references and prototype chains.
 *
 * @param value - The value to clone.
 * @param seen - Internal map for tracking circular references.
 * @returns A deep clone of the value.
 *
 * @example
 * ```ts
 * const original = { a: 1, nested: { b: 2 }, date: new Date() };
 * const cloned = deepClone(original);
 * cloned.nested.b = 99;
 * console.log(original.nested.b); // 2
 * ```
 */
export function deepClone<T>(value: T, seen = new WeakMap<object, any>()): T {
    if (value === null || typeof value !== "object") {
        return value;
    }

    if (seen.has(value)) {
        return seen.get(value);
    }

    if (value instanceof Date) {
        return new Date(value.getTime()) as unknown as T;
    }

    if (value instanceof RegExp) {
        return new RegExp(value.source, value.flags) as unknown as T;
    }

    if (value instanceof Map) {
        const cloneMap = new Map();
        seen.set(value, cloneMap);
        for (const [k, v] of value.entries()) {
            cloneMap.set(deepClone(k, seen), deepClone(v, seen));
        }
        return cloneMap as unknown as T;
    }

    if (value instanceof Set) {
        const cloneSet = new Set();
        seen.set(value, cloneSet);
        for (const v of value.values()) {
            cloneSet.add(deepClone(v, seen));
        }
        return cloneSet as unknown as T;
    }

    if (Array.isArray(value)) {
        const cloneArr: any[] = [];
        seen.set(value, cloneArr);
        for (let i = 0; i < value.length; i++) {
            cloneArr[i] = deepClone(value[i], seen);
        }
        return cloneArr as unknown as T;
    }

    const cloneObj = Object.create(Object.getPrototypeOf(value));
    seen.set(value, cloneObj);

    for (const key of Reflect.ownKeys(value)) {
        const desc = Object.getOwnPropertyDescriptor(value, key);
        if (desc) {
            if ("value" in desc) {
                desc.value = deepClone(desc.value, seen);
            }
            Object.defineProperty(cloneObj, key, desc);
        }
    }

    return cloneObj as T;
}
