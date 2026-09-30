/**
 * Extracts the file name from a path or URL.
 *
 * @param pathOrUrl - File path or URL string.
 * @param includeExtension - Whether to include the file extension in the output (defaults to true).
 * @returns The extracted filename.
 *
 * @example
 * ```ts
 * getFileName("/docs/reports/annual-2025.pdf"); // "annual-2025.pdf"
 * getFileName("https://example.com/images/avatar.png?v=2", false); // "avatar"
 * getFileName("C:\\Users\\User\\archive.zip"); // "archive.zip"
 * ```
 */
export function getFileName(pathOrUrl: string, includeExtension = true): string {
    if (!pathOrUrl) return "";

    // Strip query parameters and fragment identifier
    const clean = pathOrUrl.split(/[?#]/)[0] ?? "";
    const name = clean.split(/[/\\]/).pop() ?? "";

    if (includeExtension) {
        return name;
    }

    const dotIndex = name.lastIndexOf(".");
    if (dotIndex <= 0) {
        return name;
    }

    return name.slice(0, dotIndex);
}
