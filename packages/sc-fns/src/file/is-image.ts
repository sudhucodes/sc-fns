import { getFileExtension } from "./get-file-extension";

const IMAGE_EXTENSIONS = new Set([
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "svg",
    "bmp",
    "ico",
    "tiff",
    "tif",
    "avif",
    "heic",
    "heif",
]);

/**
 * Checks whether a filename, file extension, or MIME type represents an image.
 *
 * @param filenameOrMime - The filename, path, extension, or MIME type string.
 * @returns `true` if it represents an image, `false` otherwise.
 *
 * @example
 * ```ts
 * isImage("avatar.png"); // true
 * isImage("image/jpeg"); // true
 * isImage("webp"); // true
 * isImage("document.pdf"); // false
 * ```
 */
export function isImage(filenameOrMime: string): boolean {
    if (!filenameOrMime) return false;

    const trimmed = filenameOrMime.trim().toLowerCase();

    if (trimmed.startsWith("image/")) {
        return true;
    }

    const ext = getFileExtension(trimmed) || trimmed.replace(/^\./, "");
    return IMAGE_EXTENSIONS.has(ext);
}
