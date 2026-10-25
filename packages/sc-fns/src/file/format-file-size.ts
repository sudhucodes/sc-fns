const SIZE_UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];

/**
 * Converts a numeric file size in bytes to a human-readable formatted string (B, KB, MB, GB, TB, PB).
 *
 * @param bytes - Size in bytes.
 * @param decimals - Maximum decimal places to display (defaults to 2).
 * @returns Human-readable file size string.
 *
 * @example
 * ```ts
 * formatFileSize(1024 * 1024); // "1 MB"
 * formatFileSize(1536); // "1.5 KB"
 * formatFileSize(0); // "0 B"
 * ```
 */
export function formatFileSize(bytes: number, decimals = 2): string {
    if (isNaN(bytes) || bytes <= 0) return "0 B";

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const safeIndex = Math.min(i, SIZE_UNITS.length - 1);
    const value = bytes / Math.pow(1024, safeIndex);

    // Format and strip unnecessary trailing zeros
    const formatted = parseFloat(value.toFixed(decimals));
    return `${formatted} ${SIZE_UNITS[safeIndex]}`;
}
