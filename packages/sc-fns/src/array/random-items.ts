import { shuffleArray } from "./shuffle-array";

export interface RandomItemsOptions {
    /**
     * Whether the picked elements must be distinct (without replacement).
     * @default true
     */
    unique?: boolean;
}

/**
 * Picks multiple random elements from an array.
 *
 * @param array - The source array.
 * @param count - The number of elements to pick.
 * @param options - Options for distinct picking (without replacement).
 * @returns An array of randomly picked elements.
 *
 * @example
 * ```ts
 * randomItems([1, 2, 3, 4, 5], 2); // [3, 1]
 * randomItems(["a", "b"], 3, { unique: false }); // ["a", "b", "a"]
 * ```
 */
export function randomItems<T>(
    array: readonly T[],
    count: number,
    options: RandomItemsOptions = {},
): T[] {
    if (count <= 0 || array.length === 0) return [];

    const { unique = true } = options;

    if (unique) {
        const safeCount = Math.min(count, array.length);
        const shuffled = shuffleArray(array);
        return shuffled.slice(0, safeCount);
    }

    const result: T[] = [];
    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * array.length);
        result.push(array[index]!);
    }
    return result;
}
