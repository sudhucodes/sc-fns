export interface BuildURLOptions {
    /**
     * Path segment or array of segments to append to base URL.
     */
    path?: string | string[];
    /**
     * Query parameters to append to the URL.
     */
    queryParams?: Record<string, unknown>;
    /**
     * Optional fragment identifier (hash) without the '#'.
     */
    hash?: string;
}

/**
 * Builds a URL from a base URL, optional path segments, query parameters, and hash.
 * Handles relative and absolute URLs, automatically cleaning duplicate slashes.
 *
 * @param base - Base URL or path.
 * @param options - Additional URL parts: path, queryParams, and hash.
 * @returns The fully constructed URL string.
 *
 * @example
 * ```ts
 * buildURL("https://api.example.com", {
 *   path: ["v1", "users"],
 *   queryParams: { page: 1, limit: 10 },
 *   hash: "section-2",
 * });
 * // "https://api.example.com/v1/users?page=1&limit=10#section-2"
 * ```
 */
export function buildURL(base: string, options: BuildURLOptions = {}): string {
    if (!base) return "";

    const { path, queryParams, hash } = options;

    let urlStr = base;

    // Append path segments
    if (path) {
        const segments = Array.isArray(path) ? path : [path];
        const cleanedSegments = segments
            .map((s) => s.replace(/^\/+|\/+$/g, ""))
            .filter((s) => s.length > 0);

        if (cleanedSegments.length > 0) {
            const hasTrailingSlash = urlStr.endsWith("/");
            urlStr = `${hasTrailingSlash ? urlStr.slice(0, -1) : urlStr}/${cleanedSegments.join("/")}`;
        }
    }

    // Parse using URL object if absolute, or fallback for relative
    const isAbsolute = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(urlStr);
    const dummyBase = "http://dummy-base.local";
    const url = isAbsolute ? new URL(urlStr) : new URL(urlStr, dummyBase);

    // Append query params
    if (queryParams) {
        for (const [key, val] of Object.entries(queryParams)) {
            if (val !== undefined && val !== null) {
                if (Array.isArray(val)) {
                    for (const item of val) {
                        url.searchParams.append(key, String(item));
                    }
                } else {
                    url.searchParams.set(key, String(val));
                }
            }
        }
    }

    // Set hash
    if (hash !== undefined) {
        url.hash = hash.replace(/^#/, "");
    }

    if (isAbsolute) {
        return url.toString();
    }

    return url.toString().replace(dummyBase, "");
}
