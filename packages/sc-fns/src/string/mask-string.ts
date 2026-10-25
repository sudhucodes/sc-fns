export interface MaskStringOptions {
    /**
     * The character used for masking.
     * @default "*"
     */
    maskChar?: string;
    /**
     * Number of unmasked characters to leave visible at the start.
     * @default 0
     */
    unmaskedStart?: number;
    /**
     * Number of unmasked characters to leave visible at the end.
     * @default 4
     */
    unmaskedEnd?: number;
}

/**
 * Masks a portion of a string with a masking character.
 * Commonly used for credit card numbers, emails, phone numbers, or tokens.
 *
 * @param str - The string to mask.
 * @param options - Configuration for mask character and visible boundaries.
 * @returns The masked string.
 *
 * @example
 * ```ts
 * maskString("1234567890123456"); // "************3456"
 * maskString("password123", { maskChar: "•", unmaskedStart: 2, unmaskedEnd: 2 }); // "pa•••••••23"
 * ```
 */
export function maskString(str: string, options: MaskStringOptions = {}): string {
    if (!str) return "";

    const { maskChar = "*", unmaskedStart = 0, unmaskedEnd = 4 } = options;

    const start = Math.max(0, unmaskedStart);
    const end = Math.max(0, unmaskedEnd);

    if (start + end >= str.length) {
        return maskChar.repeat(str.length);
    }

    const prefix = str.slice(0, start);
    const suffix = end > 0 ? str.slice(-end) : "";
    const maskedLength = str.length - start - end;

    return prefix + maskChar.repeat(maskedLength) + suffix;
}
