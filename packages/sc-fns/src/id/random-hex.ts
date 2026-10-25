/**
 * Generates a random hexadecimal string of a specified character length.
 *
 * @param length - The number of hex characters to generate (defaults to 16).
 * @returns A random hex string.
 *
 * @example
 * ```ts
 * randomHex(); // "3f8a19b2c04e57d1"
 * randomHex(6); // "fa0b2c"
 * ```
 */
export function randomHex(length = 16): string {
    if (length <= 0) return "";

    const byteLength = Math.ceil(length / 2);
    let hex = "";

    if (typeof globalThis !== "undefined" && globalThis.crypto?.getRandomValues) {
        const bytes = new Uint8Array(byteLength);
        globalThis.crypto.getRandomValues(bytes);
        hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    } else {
        for (let i = 0; i < byteLength; i++) {
            const b = Math.floor(Math.random() * 256);
            hex += b.toString(16).padStart(2, "0");
        }
    }

    return hex.slice(0, length);
}
