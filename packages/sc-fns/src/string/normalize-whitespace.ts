/**
 * Normalizes whitespace in a string by collapsing multiple consecutive whitespace
 * characters into a single space and trimming leading and trailing whitespace.
 *
 * @param str - The string to normalize.
 * @returns The whitespace-normalized string.
 *
 * @example
 * ```ts
 * normalizeWhitespace("  hello \t\n  world   "); // "hello world"
 * ```
 */
export function normalizeWhitespace(str: string): string {
    if (!str) return "";
    return str.trim().replace(/\s+/g, " ");
}
