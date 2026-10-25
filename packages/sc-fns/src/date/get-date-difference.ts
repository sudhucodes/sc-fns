export type DateDifferenceUnit = "milliseconds" | "seconds" | "minutes" | "hours" | "days";

export interface DateDifferenceOptions {
    /**
     * Whether to return the absolute difference.
     * @default true
     */
    absolute?: boolean;
}

const UNIT_FACTORS: Record<DateDifferenceUnit, number> = {
    milliseconds: 1,
    seconds: 1000,
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
};

/**
 * Calculates the difference between two dates in the specified time unit.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @param unit - The unit of time to measure ("milliseconds" | "seconds" | "minutes" | "hours" | "days"). Defaults to "days".
 * @param options - Options such as whether to return the absolute value.
 * @returns The difference between the dates in the chosen unit.
 *
 * @example
 * ```ts
 * const d1 = new Date("2025-01-10");
 * const d2 = new Date("2025-01-05");
 * getDateDifference(d1, d2); // 5 (days)
 * getDateDifference(d1, d2, "hours"); // 120 (hours)
 * ```
 */
export function getDateDifference(
    date1: Date | number | string,
    date2: Date | number | string,
    unit: DateDifferenceUnit = "days",
    options: DateDifferenceOptions = {},
): number {
    const d1 = date1 instanceof Date ? date1 : new Date(date1);
    const d2 = date2 instanceof Date ? date2 : new Date(date2);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        return NaN;
    }

    const { absolute = true } = options;
    const factor = UNIT_FACTORS[unit] ?? UNIT_FACTORS.days;
    const diffMs = d1.getTime() - d2.getTime();
    const result = diffMs / factor;

    return absolute ? Math.abs(result) : result;
}
