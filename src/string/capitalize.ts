/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 *
 * @example
 * ```ts
 * capitalize("hello world"); // "Hello world"
 * capitalize("JavaScript"); // "JavaScript"
 * capitalize(""); // ""
 * ```
 */
export function capitalize(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}
