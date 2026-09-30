import { sleep } from "./sleep";

export interface RetryOptions {
    /**
     * Maximum number of attempts before throwing the last error.
     * @default 3
     */
    retries?: number;
    /**
     * Base delay between retries in milliseconds.
     * @default 100
     */
    delay?: number;
    /**
     * Backoff strategy: 'fixed' or 'exponential'.
     * @default "fixed"
     */
    backoff?: "fixed" | "exponential";
    /**
     * Callback invoked before each retry attempt.
     */
    onRetry?: (error: unknown, attempt: number) => void;
}

/**
 * Retries an asynchronous operation upon failure with customizable attempts, delay, and backoff.
 *
 * @param fn - The async function to execute.
 * @param options - Retry configuration options.
 * @returns The resolved value of the successful function call.
 *
 * @example
 * ```ts
 * const data = await retry(() => fetchUserData(userId), {
 *   retries: 3,
 *   delay: 500,
 *   backoff: "exponential",
 *   onRetry: (err, attempt) => console.warn(`Attempt ${attempt} failed:`, err),
 * });
 * ```
 */
export async function retry<T>(fn: () => Promise<T> | T, options: RetryOptions = {}): Promise<T> {
    const { retries = 3, delay = 100, backoff = "fixed", onRetry } = options;

    let lastError: unknown;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (attempt >= retries) {
                break;
            }

            if (onRetry) {
                onRetry(error, attempt);
            }

            const waitTime = backoff === "exponential" ? delay * Math.pow(2, attempt - 1) : delay;

            if (waitTime > 0) {
                await sleep(waitTime);
            }
        }
    }

    throw lastError;
}
