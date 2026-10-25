const DEFAULT_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Generates a compact, URL-safe random identifier.
 *
 * @param length - The length of the identifier to generate (defaults to 8).
 * @param alphabet - Custom alphabet to pick characters from.
 * @returns A unique short identifier string.
 *
 * @example
 * ```ts
 * generateShortId(); // "7kG8x2b1"
 * generateShortId(12); // "mK9p2L0vQ5w1"
 * ```
 */
export function generateShortId(length = 8, alphabet = DEFAULT_ALPHABET): string {
    if (length <= 0 || alphabet.length === 0) return "";

    const alphabetLen = alphabet.length;
    let id = "";

    if (typeof globalThis !== "undefined" && globalThis.crypto?.getRandomValues) {
        const bytes = new Uint8Array(length);
        globalThis.crypto.getRandomValues(bytes);
        for (let i = 0; i < length; i++) {
            id += alphabet[bytes[i] % alphabetLen];
        }
    } else {
        for (let i = 0; i < length; i++) {
            id += alphabet[Math.floor(Math.random() * alphabetLen)];
        }
    }

    return id;
}
