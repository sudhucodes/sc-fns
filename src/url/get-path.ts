/**
 * Extracts the pathname portion of a URL, excluding protocol, domain, query parameters, and hash.
 *
 * @param url - The input URL string.
 * @returns The pathname (e.g., "/api/v1/users").
 *
 * @example
 * ```ts
 * getPath("https://example.com/api/v1/users?page=1#top"); // "/api/v1/users"
 * getPath("/relative/path?foo=bar"); // "/relative/path"
 * ```
 */
export function getPath(url: string): string {
    if (!url) return "";

    const isAbsolute = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
    const dummyBase = "http://dummy-base.local";

    try {
        const parsed = isAbsolute ? new URL(url) : new URL(url, dummyBase);
        return parsed.pathname;
    } catch {
        return "";
    }
}
