import { getFileExtension } from "./get-file-extension";

/**
 * Checks whether a filename, file extension, or MIME type represents a PDF document.
 *
 * @param filenameOrMime - The filename, path, extension, or MIME type string.
 * @returns `true` if it represents a PDF, `false` otherwise.
 *
 * @example
 * ```ts
 * isPDF("report.pdf"); // true
 * isPDF("application/pdf"); // true
 * isPDF("pdf"); // true
 * isPDF("file.docx"); // false
 * ```
 */
export function isPDF(filenameOrMime: string): boolean {
    if (!filenameOrMime) return false;

    const trimmed = filenameOrMime.trim().toLowerCase();

    if (trimmed === "application/pdf" || trimmed === "application/x-pdf") {
        return true;
    }

    const ext = getFileExtension(trimmed) || trimmed.replace(/^\./, "");
    return ext === "pdf";
}
