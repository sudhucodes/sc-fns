const DIGITS = "0123456789";

/**
 * Generates a numeric One-Time Password (OTP) of a specified length.
 * Uses cryptographically secure random values when available.
 *
 * @param length - The number of digits in the OTP (defaults to 6).
 * @returns A numeric OTP string.
 *
 * @example
 * ```ts
 * generateOTP(6); // "481293"
 * generateOTP(4); // "8021"
 * ```
 */
export function generateOTP(length = 6): string {
    if (length <= 0) return "";

    let otp = "";

    if (typeof globalThis !== "undefined" && globalThis.crypto?.getRandomValues) {
        const bytes = new Uint8Array(length);
        globalThis.crypto.getRandomValues(bytes);
        for (let i = 0; i < length; i++) {
            otp += DIGITS[bytes[i] % 10];
        }
    } else {
        for (let i = 0; i < length; i++) {
            otp += DIGITS[Math.floor(Math.random() * 10)];
        }
    }

    return otp;
}
