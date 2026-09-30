export interface ThrottleOptions {
    /**
     * Execute on the leading edge of the timeout.
     * @default true
     */
    leading?: boolean;
    /**
     * Execute on the trailing edge of the timeout.
     * @default true
     */
    trailing?: boolean;
}

export interface ThrottledFunction<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): ReturnType<T> | undefined;
    cancel(): void;
    pending(): boolean;
}

/**
 * Creates a throttled function that only invokes `fn` at most once per every `wait` milliseconds.
 *
 * @param fn - The function to throttle.
 * @param wait - Milliseconds to throttle invocations to.
 * @param options - Options for leading/trailing execution.
 * @returns The throttled function equipped with cancel and pending methods.
 *
 * @example
 * ```ts
 * const onScroll = throttle(() => updateScrollIndicator(), 100);
 * window.addEventListener("scroll", onScroll);
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
    fn: T,
    wait: number,
    options: ThrottleOptions = {},
): ThrottledFunction<T> {
    const { leading = true, trailing = true } = options;

    let timerId: ReturnType<typeof setTimeout> | undefined;
    let lastExecTime = 0;
    let lastArgs: Parameters<T> | undefined;
    let lastThis: any;
    let result: ReturnType<T> | undefined;

    function invoke(): ReturnType<T> | undefined {
        if (lastArgs !== undefined) {
            lastExecTime = leading ? Date.now() : 0;
            result = fn.apply(lastThis, lastArgs);
            lastArgs = undefined;
            lastThis = undefined;
        }
        return result;
    }

    const throttled = function (this: any, ...args: Parameters<T>) {
        const now = Date.now();

        if (!lastExecTime && !leading) {
            lastExecTime = now;
        }

        const remaining = wait - (now - lastExecTime);
        lastArgs = args;
        lastThis = this;

        if (remaining <= 0 || remaining > wait) {
            if (timerId !== undefined) {
                clearTimeout(timerId);
                timerId = undefined;
            }
            lastExecTime = now;
            result = invoke();
        } else if (timerId === undefined && trailing) {
            timerId = setTimeout(() => {
                timerId = undefined;
                lastExecTime = leading ? Date.now() : 0;
                result = invoke();
            }, remaining);
        }

        return result;
    } as ThrottledFunction<T>;

    throttled.cancel = () => {
        if (timerId !== undefined) {
            clearTimeout(timerId);
            timerId = undefined;
        }
        lastExecTime = 0;
        lastArgs = undefined;
        lastThis = undefined;
    };

    throttled.pending = () => timerId !== undefined;

    return throttled;
}
