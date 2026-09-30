export interface FormatRelativeTimeOptions {
    /**
     * Locale string for internationalization.
     * @default "en-US"
     */
    locale?: string;
    /**
     * Whether to format with words like "yesterday" or numeric like "1 day ago".
     * @default "auto"
     */
    numeric?: "always" | "auto";
}

/**
 * Formats the relative time between a date and a reference date (defaults to now)
 * into a human-readable phrase (e.g., "5 minutes ago", "in 2 hours", "yesterday").
 *
 * @param date - The target date.
 * @param baseDate - The reference baseline date (defaults to current date).
 * @param options - Locale and numeric formatting options.
 * @returns Human-readable relative time string.
 *
 * @example
 * ```ts
 * formatRelativeTime(Date.now() - 60000); // "1 minute ago"
 * formatRelativeTime(Date.now() + 3600000); // "in 1 hour"
 * ```
 */
export function formatRelativeTime(
    date: Date | number | string,
    baseDate: Date | number | string = new Date(),
    options: FormatRelativeTimeOptions = {},
): string {
    const d = date instanceof Date ? date : new Date(date);
    const base = baseDate instanceof Date ? baseDate : new Date(baseDate);

    if (isNaN(d.getTime()) || isNaN(base.getTime())) {
        return "Invalid Date";
    }

    const { locale = "en-US", numeric = "auto" } = options;
    const diffInSeconds = Math.round((d.getTime() - base.getTime()) / 1000);

    // If difference is within 5 seconds and numeric is "auto", show "just now"
    if (Math.abs(diffInSeconds) < 10 && numeric === "auto") {
        return "just now";
    }

    const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
        ["year", 31536000],
        ["month", 2592000],
        ["week", 604800],
        ["day", 86400],
        ["hour", 3600],
        ["minute", 60],
        ["second", 1],
    ];

    if (typeof Intl !== "undefined" && Intl.RelativeTimeFormat) {
        const rtf = new Intl.RelativeTimeFormat(locale, { numeric });

        for (const [unit, secondsInUnit] of units) {
            if (Math.abs(diffInSeconds) >= secondsInUnit || unit === "second") {
                const count = Math.round(diffInSeconds / secondsInUnit);
                return rtf.format(count, unit);
            }
        }
    }

    // Fallback if Intl.RelativeTimeFormat is unavailable
    const absDiff = Math.abs(diffInSeconds);
    const isPast = diffInSeconds < 0;

    let unitStr = "second";
    let count = absDiff;

    for (const [unit, secondsInUnit] of units) {
        if (absDiff >= secondsInUnit) {
            count = Math.round(absDiff / secondsInUnit);
            unitStr = unit;
            break;
        }
    }

    const plural = count === 1 ? unitStr : `${unitStr}s`;
    return isPast ? `${count} ${plural} ago` : `in ${count} ${plural}`;
}
