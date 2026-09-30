/**
 * Appends or updates query parameters in a given URL string.
 * Supports both absolute and relative URLs while preserving hash fragments.
 *
 * @param url - The input URL string.
 * @param params - Object containing key-value query parameters to set or append.
 * @returns The updated URL string with query parameters added.
 *
 * @example
 * ```ts
 * addQueryParams("https://example.com/search?q=sc-utils", { page: 2, sort: "desc" });
 * // "https://example.com/search?q=sc-utils&page=2&sort=desc"
 *
 * addQueryParams("/api/users", { active: true });
 * // "/api/users?active=true"
 * ```
 */
export function addQueryParams(url: string, params: Record<string, unknown>): string {
    if (!url) return "";

    const isAbsolute = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
    const dummyBase = "http://dummy-base.local";
    const parsed = isAbsolute ? new URL(url) : new URL(url, dummyBase);

    for (const [key, val] of Object.entries(params)) {
        if (val === undefined || val === null) {
            continue;
        }
        if (Array.isArray(val)) {
            parsed.searchParams.delete(key);
            for (const item of val) {
                parsed.searchParams.append(key, String(item));
            }
        } else {
            parsed.searchParams.set(key, String(val));
        }
    }

    if (isAbsolute) {
        return parsed.toString();
    }

    return parsed.toString().replace(dummyBase, "");
}
