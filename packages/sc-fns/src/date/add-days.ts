/**
 * Adds a specified number of days to a date, returning a new Date object.
 * Does not mutate the source date.
 *
 * @param date - The starting date.
 * @param days - The number of days to add.
 * @returns A new Date with the days added.
 *
 * @example
 * ```ts
 * const today = new Date("2025-01-01");
 * const nextWeek = addDays(today, 7); // 2025-01-08
 * ```
 */
export function addDays(date: Date | number | string, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
