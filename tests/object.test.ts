import { describe, it, expect } from "vitest";
import {
    isEmpty,
    pick,
    omit,
    deepClone,
    deepMerge,
    removeUndefined,
    removeNull,
} from "../src/object";

describe("object utilities", () => {
    describe("isEmpty", () => {
        it("identifies empty values correctly", () => {
            expect(isEmpty(null)).toBe(true);
            expect(isEmpty(undefined)).toBe(true);
            expect(isEmpty("")).toBe(true);
            expect(isEmpty([])).toBe(true);
            expect(isEmpty({})).toBe(true);
            expect(isEmpty(new Map())).toBe(true);
            expect(isEmpty(new Set())).toBe(true);
        });

        it("identifies non-empty values correctly", () => {
            expect(isEmpty("hello")).toBe(false);
            expect(isEmpty([1])).toBe(false);
            expect(isEmpty({ a: 1 })).toBe(false);
            expect(isEmpty(new Set([1]))).toBe(false);
            const map = new Map();
            map.set("key", "val");
            expect(isEmpty(map)).toBe(false);
        });
    });

    describe("pick", () => {
        it("picks specified keys from object", () => {
            const user = { id: 1, name: "Alice", role: "admin", active: true };
            expect(pick(user, ["id", "name"])).toEqual({ id: 1, name: "Alice" });
            expect(user).toEqual({ id: 1, name: "Alice", role: "admin", active: true }); // non-mutating
        });

        it("ignores keys that do not exist on target", () => {
            const user = { id: 1, name: "Alice" };
            expect(pick(user, ["id", "unknown" as any])).toEqual({ id: 1 });
        });
    });

    describe("omit", () => {
        it("omits specified keys from object", () => {
            const user = { id: 1, name: "Alice", role: "admin", active: true };
            expect(omit(user, ["role", "active"])).toEqual({ id: 1, name: "Alice" });
            expect(user).toEqual({ id: 1, name: "Alice", role: "admin", active: true }); // non-mutating
        });
    });

    describe("deepClone", () => {
        it("deeply clones nested objects and arrays", () => {
            const original = {
                num: 42,
                str: "test",
                arr: [1, { nestedArr: 2 }],
                sub: { date: new Date("2025-01-01"), regex: /abc/gi },
            };
            const copy = deepClone(original);

            expect(copy).toEqual(original);
            expect(copy).not.toBe(original);
            expect(copy.arr).not.toBe(original.arr);
            expect(copy.sub).not.toBe(original.sub);
            expect(copy.sub.date).not.toBe(original.sub.date);
            expect(copy.sub.date.getTime()).toBe(original.sub.date.getTime());
            expect(copy.sub.regex).not.toBe(original.sub.regex);
        });

        it("handles circular references cleanly", () => {
            const obj: any = { a: 1 };
            obj.self = obj;

            const clone = deepClone(obj);
            expect(clone.a).toBe(1);
            expect(clone.self).toBe(clone);
            expect(clone.self).not.toBe(obj);
        });

        it("clones Maps and Sets", () => {
            const set = new Set([1, 2, { a: 3 }]);
            const clonedSet = deepClone(set);
            expect(clonedSet).toEqual(set);
            expect(clonedSet).not.toBe(set);

            const map = new Map<string, any>([["key", { b: 4 }]]);
            const clonedMap = deepClone(map);
            expect(clonedMap).toEqual(map);
            expect(clonedMap.get("key")).not.toBe(map.get("key"));
        });
    });

    describe("deepMerge", () => {
        it("merges deeply nested objects into a new object", () => {
            const target = { a: 1, b: { c: 2, d: 3 } };
            const source = { b: { d: 4, e: 5 }, f: 6 };

            const merged = deepMerge(target, source);
            expect(merged).toEqual({
                a: 1,
                b: { c: 2, d: 4, e: 5 },
                f: 6,
            });

            // Immuntability check
            expect(target.b.d).toBe(3);
        });

        it("does not allow prototype pollution", () => {
            const payload = JSON.parse('{"__proto__": {"polluted": true}}');
            const cleanObj = {};
            deepMerge(cleanObj, payload);
            expect((cleanObj as any).polluted).toBeUndefined();
            expect(({} as any).polluted).toBeUndefined();
        });
    });

    describe("removeUndefined", () => {
        it("removes undefined keys from object", () => {
            const obj = { a: 1, b: undefined, c: "hello", d: null };
            expect(removeUndefined(obj)).toEqual({ a: 1, c: "hello", d: null });
        });

        it("supports deep removal of undefined", () => {
            const obj = { a: 1, nested: { b: undefined, c: 2 } };
            expect(removeUndefined(obj, true)).toEqual({
                a: 1,
                nested: { c: 2 },
            });
        });
    });

    describe("removeNull", () => {
        it("removes null keys from object", () => {
            const obj = { a: 1, b: null, c: "hello", d: undefined };
            expect(removeNull(obj)).toEqual({ a: 1, c: "hello", d: undefined });
        });

        it("supports deep removal of null", () => {
            const obj = { a: 1, nested: { b: null, c: 2 } };
            expect(removeNull(obj, true)).toEqual({
                a: 1,
                nested: { c: 2 },
            });
        });
    });
});
