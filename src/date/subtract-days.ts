import { addDays } from "./add-days";

/**
 * Subtracts a specified number of days from a date, returning a new Date object.
 * Does not mutate the source date.
 *
 * @param date - The starting date.
 * @param days - The number of days to subtract.
 * @returns A new Date with the days subtracted.
 *
 * @example
 * ```ts
 * const date = new Date("2025-01-08");
 * const lastWeek = subtractDays(date, 7); // 2025-01-01
 * ```
 */
export function subtractDays(date: Date | number | string, days: number): Date {
    return addDays(date, -days);
}
