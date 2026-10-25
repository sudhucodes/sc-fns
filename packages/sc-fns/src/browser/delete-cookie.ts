export interface DeleteCookieOptions {
    /**
     * Cookie path. Defaults to '/'.
     * @default "/"
     */
    path?: string;
    /**
     * Cookie domain.
     */
    domain?: string;
}

/**
 * Deletes a cookie by setting its expiration date to the past.
 *
 * @param name - The cookie name.
 * @param options - Path and domain matching the cookie to delete.
 * @param targetDocument - Optional document target (defaults to global document).
 *
 * @example
 * ```ts
 * deleteCookie("theme");
 * ```
 */
export function deleteCookie(
    name: string,
    options: DeleteCookieOptions = {},
    targetDocument?: { cookie: string },
): void {
    if (!name) return;

    const { path = "/", domain } = options;

    let cookieStr = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0`;

    if (path) {
        cookieStr += `; path=${path}`;
    }

    if (domain) {
        cookieStr += `; domain=${domain}`;
    }

    const target = targetDocument ?? (typeof document !== "undefined" ? document : undefined);
    if (target) {
        target.cookie = cookieStr;
    }
}
