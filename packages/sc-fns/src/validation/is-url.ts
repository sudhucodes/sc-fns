export interface IsURLOptions {
    /**
     * Allowed protocols without the colon.
     * @default ["http", "https"]
     */
    protocols?: string[];
    /**
     * Whether to require a protocol prefix (e.g., http:// or https://).
     * @default true
     */
    requireProtocol?: boolean;
}

/**
 * Validates whether a value is a valid URL string using the native URL API.
 *
 * @param value - The value to test.
 * @param options - Protocol configuration options.
 * @returns `true` if valid URL, `false` otherwise.
 *
 * @example
 * ```ts
 * isURL("https://example.com/path?foo=bar"); // true
 * isURL("ftp://files.example.com", { protocols: ["ftp", "http", "https"] }); // true
 * isURL("not a url"); // false
 * ```
 */
export function isURL(value: unknown, options: IsURLOptions = {}): value is string {
    if (typeof value !== "string" || value.trim().length === 0) return false;

    const { protocols = ["http", "https"], requireProtocol = true } = options;

    try {
        const url = new URL(value);
        const protocol = url.protocol.replace(/:$/, "").toLowerCase();
        return protocols.map((p) => p.toLowerCase()).includes(protocol);
    } catch {
        if (!requireProtocol) {
            try {
                const url = new URL(`http://${value}`);
                return url.hostname.includes(".");
            } catch {
                return false;
            }
        }
        return false;
    }
}
