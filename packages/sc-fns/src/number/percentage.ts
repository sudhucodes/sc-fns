import { roundTo } from "./round-to";

/**
 * Calculates the percentage that `partial` represents of `total`.
 * Handles division by zero gracefully by returning 0.
 *
 * @param partial - The subset amount.
 * @param total - The total amount.
 * @param decimals - Decimal precision of the result (defaults to 0).
 * @returns The calculated percentage (0 to 100+).
 *
 * @example
 * ```ts
 * percentage(25, 100); // 25
 * percentage(1, 3, 2); // 33.33
 * percentage(50, 0); // 0
 * ```
 */
export function percentage(partial: number, total: number, decimals = 0): number {
    if (total === 0 || isNaN(partial) || isNaN(total)) {
        return 0;
    }

    const result = (partial / total) * 100;
    return roundTo(result, decimals);
}
