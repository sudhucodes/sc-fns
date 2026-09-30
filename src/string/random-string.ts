const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Generates a random alphanumeric string of a specified length.
 * Uses crypto.getRandomValues() when available for cryptographically strong randomness.
 *
 * @param length - The desired length of the string.
 * @param charset - Custom character set to choose characters from (defaults to alphanumeric).
 * @returns The randomly generated string.
 *
 * @example
 * ```ts
 * randomString(10); // "a8fD2k9L1z"
 * randomString(4, "0123456789"); // "9281"
 * ```
 */
export function randomString(length: number, charset = DEFAULT_CHARSET): string {
    if (length <= 0 || charset.length === 0) return "";

    const charsetLength = charset.length;
    let result = "";

    if (typeof globalThis !== "undefined" && globalThis.crypto?.getRandomValues) {
        const bytes = new Uint8Array(length);
        globalThis.crypto.getRandomValues(bytes);
        for (let i = 0; i < length; i++) {
            result += charset[bytes[i] % charsetLength];
        }
    } else {
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charsetLength);
            result += charset[randomIndex];
        }
    }

    return result;
}
