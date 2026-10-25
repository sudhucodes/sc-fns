/**
 * Rejects a promise if it does not settle within a specified duration.
 * Properly cleans up the internal timer when the target promise settles first.
 *
 * @param promise - The promise to monitor.
 * @param ms - Timeout limit in milliseconds.
 * @param fallbackError - Optional custom error or message to throw on timeout.
 * @returns The resolved value of the input promise.
 *
 * @example
 * ```ts
 * try {
 *   const data = await timeout(fetchData(), 5000, "Request timed out");
 * } catch (err) {
 *   console.error(err);
 * }
 * ```
 */
export function timeout<T>(
    promise: Promise<T>,
    ms: number,
    fallbackError?: string | Error,
): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const timer = setTimeout(() => {
            const err =
                fallbackError instanceof Error
                    ? fallbackError
                    : new Error(
                          typeof fallbackError === "string"
                              ? fallbackError
                              : `Operation timed out after ${ms}ms`,
                      );
            reject(err);
        }, ms);

        promise
            .then((res) => {
                clearTimeout(timer);
                resolve(res);
            })
            .catch((err) => {
                clearTimeout(timer);
                reject(err);
            });
    });
}
