/**
 * Truncates a string to a specified length, appending an ellipsis or custom suffix.
 *
 * @param str - The string to truncate.
 * @param length - The maximum allowed length of the resulting string, including the suffix.
 * @param suffix - The suffix to append if truncated (defaults to "...").
 * @returns The truncated string.
 *
 * @example
 * ```ts
 * truncate("Hello World!", 8); // "Hello..."
 * truncate("Short", 10); // "Short"
 * truncate("sc-utils library", 7, "…"); // "sc-uti…"
 * ```
 */
export function truncate(str: string, length: number, suffix = "..."): string {
    if (!str) return "";
    if (length <= 0) return "";
    if (str.length <= length) return str;
    if (length <= suffix.length) return suffix.slice(0, length);

    return str.slice(0, length - suffix.length) + suffix;
}
