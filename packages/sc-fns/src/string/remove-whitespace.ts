/**
 * Removes all whitespace characters (spaces, tabs, newlines) from a string.
 *
 * @param str - The string to remove whitespace from.
 * @returns The string without any whitespace.
 *
 * @example
 * ```ts
 * removeWhitespace("  hello   world  \n\t"); // "helloworld"
 * ```
 */
export function removeWhitespace(str: string): string {
    if (!str) return "";
    return str.replace(/\s+/g, "");
}
