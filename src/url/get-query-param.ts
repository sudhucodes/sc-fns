/**
 * Retrieves the value of a specific query parameter from a URL string.
 *
 * @param url - The input URL string.
 * @param param - The name of the query parameter to retrieve.
 * @returns The parameter value if found, or `null` if not found.
 *
 * @example
 * ```ts
 * getQueryParam("https://example.com?search=typescript&page=1", "search");
 * // "typescript"
 *
 * getQueryParam("/users?id=123", "id");
 * // "123"
 *
 * getQueryParam("/users", "missing");
 * // null
 * ```
 */
export function getQueryParam(url: string, param: string): string | null {
    if (!url || !param) return null;

    const isAbsolute = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
    const dummyBase = "http://dummy-base.local";

    try {
        const parsed = isAbsolute ? new URL(url) : new URL(url, dummyBase);
        return parsed.searchParams.get(param);
    } catch {
        return null;
    }
}
