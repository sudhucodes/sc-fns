/**
 * Formats a Date object or timestamp according to a tokenized format string.
 *
 * Supported tokens:
 * - `YYYY`: 4-digit year (e.g. 2025)
 * - `YY`: 2-digit year (e.g. 25)
 * - `MM`: 2-digit month (01-12)
 * - `M`: 1-2 digit month (1-12)
 * - `DD`: 2-digit day of month (01-31)
 * - `D`: 1-2 digit day of month (1-31)
 * - `HH`: 2-digit 24-hour (00-23)
 * - `H`: 1-2 digit 24-hour (0-23)
 * - `hh`: 2-digit 12-hour (01-12)
 * - `h`: 1-2 digit 12-hour (1-12)
 * - `mm`: 2-digit minute (00-59)
 * - `m`: 1-2 digit minute (0-59)
 * - `ss`: 2-digit second (00-59)
 * - `s`: 1-2 digit second (0-59)
 * - `A`: AM / PM
 * - `a`: am / pm
 *
 * @param date - The Date object, timestamp, or date string.
 * @param formatStr - The tokenized string template (defaults to "YYYY-MM-DD").
 * @returns The formatted date string.
 *
 * @example
 * ```ts
 * formatDate(new Date(2025, 0, 15, 9, 5), "YYYY-MM-DD HH:mm:ss");
 * // "2025-01-15 09:05:00"
 *
 * formatDate(new Date(2025, 0, 15, 14, 30), "YYYY/MM/DD hh:mm A");
 * // "2025/01/15 02:30 PM"
 * ```
 */
export function formatDate(date: Date | number | string, formatStr = "YYYY-MM-DD"): string {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return "Invalid Date";

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours24 = d.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const isPM = hours24 >= 12;

    const pad = (n: number) => n.toString().padStart(2, "0");

    const tokens: Record<string, string> = {
        YYYY: year.toString(),
        YY: year.toString().slice(-2),
        MM: pad(month),
        M: month.toString(),
        DD: pad(day),
        D: day.toString(),
        HH: pad(hours24),
        H: hours24.toString(),
        hh: pad(hours12),
        h: hours12.toString(),
        mm: pad(minutes),
        m: minutes.toString(),
        ss: pad(seconds),
        s: seconds.toString(),
        A: isPM ? "PM" : "AM",
        a: isPM ? "pm" : "am",
    };

    return formatStr.replace(
        /\b(YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|A|a)\b/g,
        (match) => tokens[match] ?? match,
    );
}
