import { getFileExtension } from "./get-file-extension";

const VIDEO_EXTENSIONS = new Set([
    "mp4",
    "webm",
    "mkv",
    "mov",
    "avi",
    "wmv",
    "flv",
    "m4v",
    "3gp",
    "ogv",
]);

/**
 * Checks whether a filename, file extension, or MIME type represents a video.
 *
 * @param filenameOrMime - The filename, path, extension, or MIME type string.
 * @returns `true` if it represents a video, `false` otherwise.
 *
 * @example
 * ```ts
 * isVideo("movie.mp4"); // true
 * isVideo("video/webm"); // true
 * isVideo("avi"); // true
 * isVideo("song.mp3"); // false
 * ```
 */
export function isVideo(filenameOrMime: string): boolean {
    if (!filenameOrMime) return false;

    const trimmed = filenameOrMime.trim().toLowerCase();

    if (trimmed.startsWith("video/")) {
        return true;
    }

    const ext = getFileExtension(trimmed) || trimmed.replace(/^\./, "");
    return VIDEO_EXTENSIONS.has(ext);
}
