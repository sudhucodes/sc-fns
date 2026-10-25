/**
 * Pauses execution for a specified number of milliseconds.
 *
 * @param ms - The duration to sleep in milliseconds.
 * @returns A Promise that resolves after `ms` milliseconds.
 *
 * @example
 * ```ts
 * await sleep(1000); // waits for 1 second
 * ```
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
}
