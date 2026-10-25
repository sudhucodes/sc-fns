export interface SetCookieOptions {
    /**
     * Number of days until the cookie expires.
     */
    days?: number;
    /**
     * Max-Age in seconds.
     */
    maxAge?: number;
    /**
     * Cookie path. Defaults to '/'.
     * @default "/"
     */
    path?: string;
    /**
     * Cookie domain.
     */
    domain?: string;
    /**
     * SameSite policy.
     * @default "Lax"
     */
    sameSite?: "Strict" | "Lax" | "None";
    /**
     * Whether the cookie requires an HTTPS connection.
     */
    secure?: boolean;
}

/**
 * Sets a client-side browser cookie with customizable options (expires, max-age, path, domain, sameSite, secure).
 *
 * @param name - The cookie name.
 * @param value - The cookie value.
 * @param options - Cookie attribute configuration.
 * @param targetDocument - Optional document target (defaults to global document).
 * @returns The generated cookie string.
 *
 * @example
 * ```ts
 * setCookie("theme", "dark", { days: 30, sameSite: "Lax" });
 * ```
 */
export function setCookie(
    name: string,
    value: string,
    options: SetCookieOptions = {},
    targetDocument?: { cookie: string },
): string {
    if (!name) return "";

    const { path = "/", domain, days, maxAge, sameSite = "Lax", secure } = options;

    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (path) {
        cookieStr += `; path=${path}`;
    }

    if (domain) {
        cookieStr += `; domain=${domain}`;
    }

    if (days !== undefined) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        cookieStr += `; expires=${expires}`;
    }

    if (maxAge !== undefined) {
        cookieStr += `; max-age=${maxAge}`;
    }

    if (sameSite) {
        cookieStr += `; SameSite=${sameSite}`;
    }

    if (secure || sameSite === "None") {
        cookieStr += "; Secure";
    }

    const target = targetDocument ?? (typeof document !== "undefined" ? document : undefined);
    if (target) {
        target.cookie = cookieStr;
    }

    return cookieStr;
}
