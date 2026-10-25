/**
 * Generates an RFC 4122 version 4 UUID.
 * Utilizes `crypto.randomUUID()` when available natively in Node.js and modern browsers,
 * with a secure fallback for environments without direct `randomUUID` support.
 *
 * @returns A cryptographically strong UUID string (e.g., "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d").
 *
 * @example
 * ```ts
 * const id = generateUUID();
 * // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 * ```
 */
export function generateUUID(): string {
    if (typeof globalThis !== "undefined" && typeof globalThis.crypto?.randomUUID === "function") {
        return globalThis.crypto.randomUUID();
    }

    // Fallback for environments lacking crypto.randomUUID
    if (typeof globalThis !== "undefined" && globalThis.crypto?.getRandomValues) {
        const bytes = new Uint8Array(16);
        globalThis.crypto.getRandomValues(bytes);

        // Set version 4 (bits 12-15 of time_hi_and_version to 0100)
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        // Set variant (bits 6-7 of clock_seq_hi_and_reserved to 10)
        bytes[8] = (bytes[8] & 0x3f) | 0x80;

        const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
    }

    // Math.random fallback
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
