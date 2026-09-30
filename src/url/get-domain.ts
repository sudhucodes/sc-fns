/**
 * Extracts the domain name (hostname) from a URL string.
 *
 * @param url - The input URL string.
 * @returns The hostname/domain, or an empty string if invalid.
 *
 * @example
 * ```ts
 * getDomain("https://sub.example.com:8080/path"); // "sub.example.com"
 * getDomain("example.com/test"); // "example.com"
 * ```
 */
export function getDomain(url: string): string {
    if (!url) return "";

    try {
        const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
        const parsed = new URL(hasProtocol ? url : `http://${url}`);
        return parsed.hostname;
    } catch {
        return "";
    }
}
