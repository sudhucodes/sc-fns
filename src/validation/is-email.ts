/**
 * Validates whether a value is a valid email address string.
 *
 * @param value - The value to test.
 * @returns `true` if valid email, `false` otherwise.
 *
 * @example
 * ```ts
 * isEmail("user@example.com"); // true
 * isEmail("invalid-email"); // false
 * isEmail("@example.com"); // false
 * ```
 */
export function isEmail(value: unknown): value is string {
    if (typeof value !== "string" || value.length > 254) return false;

    // Standard pragmatic regex for email validation
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    return emailRegex.test(value);
}
