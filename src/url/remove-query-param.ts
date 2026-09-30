/**
 * Removes one or more query parameters from a URL string.
 * Preserves the remaining query parameters and hash fragments.
 *
 * @param url - The input URL string.
 * @param params - A parameter key or array of parameter keys to remove.
 * @returns The updated URL string.
 *
 * @example
 * ```ts
 * removeQueryParam("https://example.com?a=1&b=2&c=3", "b");
 * // "https://example.com/?a=1&c=3"
 *
 * removeQueryParam("https://example.com?a=1&b=2", ["a", "b"]);
 * // "https://example.com/"
 * ```
 */
export function removeQueryParam(url: string, params: string | string[]): string {
    if (!url) return "";

    const isAbsolute = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
    const dummyBase = "http://dummy-base.local";
    const parsed = isAbsolute ? new URL(url) : new URL(url, dummyBase);

    const keysToRemove = Array.isArray(params) ? params : [params];
    for (const key of keysToRemove) {
        parsed.searchParams.delete(key);
    }

    if (isAbsolute) {
        return parsed.toString();
    }

    return parsed.toString().replace(dummyBase, "");
}
