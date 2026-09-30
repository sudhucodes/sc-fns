function isSameDay(d1: Date, d2: Date): boolean {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

/**
 * Checks if a given date corresponds to tomorrow (relative to current date or optional reference).
 *
 * @param date - The date to check.
 * @param referenceDate - The reference date (defaults to current date).
 * @returns `true` if the date is tomorrow, `false` otherwise.
 *
 * @example
 * ```ts
 * const tomorrow = new Date();
 * tomorrow.setDate(tomorrow.getDate() + 1);
 * isTomorrow(tomorrow); // true
 * ```
 */
export function isTomorrow(
    date: Date | number | string,
    referenceDate: Date | number | string = new Date(),
): boolean {
    const d = date instanceof Date ? date : new Date(date);
    const ref = referenceDate instanceof Date ? referenceDate : new Date(referenceDate);

    if (isNaN(d.getTime()) || isNaN(ref.getTime())) return false;

    const tomorrow = new Date(ref);
    tomorrow.setDate(ref.getDate() + 1);

    return isSameDay(d, tomorrow);
}
