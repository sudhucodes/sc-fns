/**
 * A no-operation function that does nothing and returns undefined.
 * Useful as a default callback or placeholder.
 *
 * @example
 * ```ts
 * const callback = options.onClick ?? noop;
 * callback();
 * ```
 */
export function noop(): void {
    // Intentionally empty
}
