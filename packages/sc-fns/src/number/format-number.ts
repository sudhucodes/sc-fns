export interface FormatNumberOptions {
    /**
     * The BCP 47 language tag (e.g., 'en-US', 'de-DE'). Defaults to system locale or 'en-US'.
     */
    locale?: string;
    /**
     * Exact number of decimal places to display.
     */
    decimals?: number;
    /**
     * The minimum number of fraction digits.
     */
    minimumFractionDigits?: number;
    /**
     * The maximum number of fraction digits.
     */
    maximumFractionDigits?: number;
    /**
     * Formatting notation style (e.g., 'compact' for 1K, 1M).
     */
    notation?: "standard" | "scientific" | "engineering" | "compact";
    /**
     * Number formatting style.
     */
    style?: "decimal" | "percent" | "currency";
    /**
     * The currency code (e.g. 'USD', 'EUR') when style is 'currency'.
     */
    currency?: string;
}

/**
 * Formats a number with locale-aware thousands separators, decimals, and notation options.
 *
 * @param value - The number to format.
 * @param options - Formatting configuration options.
 * @returns The formatted number string.
 *
 * @example
 * ```ts
 * formatNumber(1234567.89); // "1,234,567.89" (in en-US)
 * formatNumber(1234567.89, { locale: "de-DE" }); // "1.234.567,89"
 * formatNumber(1500000, { notation: "compact" }); // "1.5M"
 * ```
 */
export function formatNumber(value: number, options: FormatNumberOptions = {}): string {
    const {
        locale = "en-US",
        decimals,
        minimumFractionDigits,
        maximumFractionDigits,
        notation,
        style = "decimal",
        currency,
    } = options;

    const intlOptions: Intl.NumberFormatOptions = {
        style,
        notation,
    };

    if (currency) {
        intlOptions.currency = currency;
    }

    if (decimals !== undefined) {
        intlOptions.minimumFractionDigits = decimals;
        intlOptions.maximumFractionDigits = decimals;
    } else {
        if (minimumFractionDigits !== undefined) {
            intlOptions.minimumFractionDigits = minimumFractionDigits;
        }
        if (maximumFractionDigits !== undefined) {
            intlOptions.maximumFractionDigits = maximumFractionDigits;
        }
    }

    return new Intl.NumberFormat(locale, intlOptions).format(value);
}
