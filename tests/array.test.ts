import { describe, it, expect } from "vitest";
import {
    shuffleArray,
    randomItem,
    randomItems,
    chunkArray,
    uniqueArray,
    uniqueBy,
    flattenArray,
    groupBy,
    removeItem,
    moveItem,
} from "../src/array";

describe("array utilities", () => {
    describe("shuffleArray", () => {
        it("shuffles an array without mutating the original", () => {
            const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const copy = [...original];
            const shuffled = shuffleArray(original);

            expect(original).toEqual(copy);
            expect(shuffled).toHaveLength(original.length);
            expect(shuffled.sort()).toEqual(original.sort());
        });

        it("handles empty or 1-element arrays", () => {
            expect(shuffleArray([])).toEqual([]);
            expect(shuffleArray([42])).toEqual([42]);
        });
    });

    describe("randomItem", () => {
        it("returns a random item from the array", () => {
            const items = ["a", "b", "c"];
            const item = randomItem(items);
            expect(items).toContain(item);
        });

        it("returns undefined for an empty array", () => {
            expect(randomItem([])).toBeUndefined();
        });
    });

    describe("randomItems", () => {
        it("picks specified number of unique items by default", () => {
            const list = [1, 2, 3, 4, 5, 6];
            const picked = randomItems(list, 3);
            expect(picked).toHaveLength(3);
            expect(new Set(picked).size).toBe(3);
            picked.forEach((item) => expect(list).toContain(item));
        });

        it("caps count to array length when unique is true", () => {
            const list = [1, 2, 3];
            const picked = randomItems(list, 10);
            expect(picked).toHaveLength(3);
        });

        it("picks with replacement when unique is false", () => {
            const list = ["only"];
            const picked = randomItems(list, 3, { unique: false });
            expect(picked).toEqual(["only", "only", "only"]);
        });

        it("returns empty array when count is <= 0 or list is empty", () => {
            expect(randomItems([], 5)).toEqual([]);
            expect(randomItems([1, 2], 0)).toEqual([]);
        });
    });

    describe("chunkArray", () => {
        it("splits array into chunks of specified size", () => {
            expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
            expect(chunkArray([1, 2, 3, 4], 2)).toEqual([
                [1, 2],
                [3, 4],
            ]);
        });

        it("handles size larger than array length", () => {
            expect(chunkArray([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
        });

        it("handles empty array or invalid size", () => {
            expect(chunkArray([], 2)).toEqual([]);
            expect(chunkArray([1, 2], 0)).toEqual([]);
            expect(chunkArray([1, 2], -1)).toEqual([]);
        });
    });

    describe("uniqueArray", () => {
        it("removes duplicate primitive values while keeping order", () => {
            expect(uniqueArray([1, 2, 2, 3, 1, 4])).toEqual([1, 2, 3, 4]);
            expect(uniqueArray(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
            expect(uniqueArray([])).toEqual([]);
        });
    });

    describe("uniqueBy", () => {
        it("deduplicates objects by a property key", () => {
            const users = [
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" },
                { id: 1, name: "Alice Alt" },
            ];
            expect(uniqueBy(users, "id")).toEqual([
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" },
            ]);
        });

        it("deduplicates using an iteratee function", () => {
            const words = ["Apple", "apPLE", "banana", "BANANA"];
            expect(uniqueBy(words, (w) => w.toLowerCase())).toEqual(["Apple", "banana"]);
        });
    });

    describe("flattenArray", () => {
        it("flattens array to depth 1 by default", () => {
            expect(flattenArray([1, [2, [3, [4]]]])).toEqual([1, 2, [3, [4]]]);
        });

        it("flattens array to specified depth", () => {
            expect(flattenArray([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
            expect(flattenArray([1, [2, [3, [4]]]], Infinity)).toEqual([1, 2, 3, 4]);
        });

        it("returns shallow copy if depth <= 0", () => {
            const arr = [1, [2]];
            expect(flattenArray(arr, 0)).toEqual([1, [2]]);
        });
    });

    describe("groupBy", () => {
        it("groups items by property key", () => {
            const items = [
                { category: "fruit", name: "apple" },
                { category: "fruit", name: "banana" },
                { category: "veggie", name: "carrot" },
            ];
            expect(groupBy(items, "category")).toEqual({
                fruit: [
                    { category: "fruit", name: "apple" },
                    { category: "fruit", name: "banana" },
                ],
                veggie: [{ category: "veggie", name: "carrot" }],
            });
        });

        it("groups items by mapping function", () => {
            const numbers = [6.1, 4.2, 6.3];
            expect(groupBy(numbers, Math.floor)).toEqual({
                "4": [4.2],
                "6": [6.1, 6.3],
            });
        });
    });

    describe("removeItem", () => {
        it("removes the first matching item by value", () => {
            const arr = [1, 2, 3, 2, 4];
            expect(removeItem(arr, 2)).toEqual([1, 3, 2, 4]);
            expect(arr).toEqual([1, 2, 3, 2, 4]); // non-mutating
        });

        it("removes item using predicate function", () => {
            const fruits = ["apple", "banana", "avocado"];
            expect(removeItem(fruits, (f) => f.startsWith("b"))).toEqual(["apple", "avocado"]);
        });

        it("returns a copy of array if item is not found", () => {
            const arr = [1, 2, 3];
            expect(removeItem(arr, 99)).toEqual([1, 2, 3]);
        });
    });

    describe("moveItem", () => {
        it("moves element to another index", () => {
            const list = ["a", "b", "c", "d"];
            expect(moveItem(list, 0, 2)).toEqual(["b", "c", "a", "d"]);
            expect(list).toEqual(["a", "b", "c", "d"]); // non-mutating
        });

        it("supports negative indices", () => {
            const list = ["a", "b", "c", "d"];
            expect(moveItem(list, -1, 0)).toEqual(["d", "a", "b", "c"]);
        });

        it("handles boundary clamping and no-op moves", () => {
            const list = ["a", "b", "c"];
            expect(moveItem(list, 1, 1)).toEqual(["a", "b", "c"]);
            expect(moveItem(list, 0, 10)).toEqual(["b", "c", "a"]);
            expect(moveItem(["a"], 0, 0)).toEqual(["a"]);
        });
    });
});
