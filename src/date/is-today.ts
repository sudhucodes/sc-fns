function isSameDay(d1: Date, d2: Date): boolean {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

/**
 * Checks if a given date corresponds to today (relative to current date or optional reference).
 *
 * @param date - The date to check.
 * @param referenceDate - The reference date (defaults to current date).
 * @returns `true` if the date is today, `false` otherwise.
 *
 * @example
 * ```ts
 * isToday(new Date()); // true
 * isToday(new Date(2000, 0, 1)); // false
 * ```
 */
export function isToday(
    date: Date | number | string,
    referenceDate: Date | number | string = new Date(),
): boolean {
    const d = date instanceof Date ? date : new Date(date);
    const ref = referenceDate instanceof Date ? referenceDate : new Date(referenceDate);

    if (isNaN(d.getTime()) || isNaN(ref.getTime())) return false;
    return isSameDay(d, ref);
}
