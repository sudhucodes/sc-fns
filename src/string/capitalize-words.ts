/**
 * Capitalizes the first letter of each word in a string.
 *
 * @param str - The string whose words should be capitalized.
 * @returns The string with each word capitalized.
 *
 * @example
 * ```ts
 * capitalizeWords("hello world"); // "Hello World"
 * capitalizeWords("the quick-brown_fox"); // "The Quick-Brown_Fox"
 * ```
 */
export function capitalizeWords(str: string): string {
    if (!str) return "";
    return str.replace(/(?:^|[\s\-_])\p{L}/gu, (match) => match.toUpperCase());
}
