/**
 * Extracts the file extension from a file path, URL, or file name.
 * Returns the extension in lowercase without the leading dot.
 * Returns an empty string if there is no extension.
 *
 * @param filename - The filename, path, or URL.
 * @returns The lowercase file extension (e.g., "png", "ts"), or empty string.
 *
 * @example
 * ```ts
 * getFileExtension("photo.JPEG"); // "jpeg"
 * getFileExtension("/path/to/script.min.js"); // "js"
 * getFileExtension("README"); // ""
 * getFileExtension(".gitignore"); // ""
 * ```
 */
export function getFileExtension(filename: string): string {
    if (!filename) return "";

    // Strip query parameters and hash if input is a URL
    const clean = filename.split(/[?#]/)[0] ?? "";
    // Get base file name by stripping directories
    const base = clean.split(/[/\\]/).pop() ?? "";

    // If no dot or dot is at the very beginning with no other dots (hidden file like .gitignore)
    const dotIndex = base.lastIndexOf(".");
    if (dotIndex <= 0 || dotIndex === base.length - 1) {
        return "";
    }

    return base.slice(dotIndex + 1).toLowerCase();
}
