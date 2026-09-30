/**
 * Retrieves the value of a cookie by name.
 * Supports passing a custom cookie string or document context for server-side rendering and testing.
 *
 * @param name - The name of the cookie to retrieve.
 * @param cookieSource - Optional cookie string or object containing a `cookie` property (defaults to document).
 * @returns The decoded cookie value, or `null` if not found.
 *
 * @example
 * ```ts
 * const token = getCookie("auth_token");
 * ```
 */
export function getCookie(name: string, cookieSource?: string | { cookie: string }): string | null {
    if (!name) return null;

    let rawCookies = "";

    if (typeof cookieSource === "string") {
        rawCookies = cookieSource;
    } else if (cookieSource && typeof cookieSource.cookie === "string") {
        rawCookies = cookieSource.cookie;
    } else if (typeof document !== "undefined" && typeof document.cookie === "string") {
        rawCookies = document.cookie;
    }

    if (!rawCookies) return null;

    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?:^|;\\s*)${escapedName}=([^;]*)`);
    const match = rawCookies.match(regex);

    if (!match || !match[1]) return null;

    try {
        return decodeURIComponent(match[1]);
    } catch {
        return match[1];
    }
}
