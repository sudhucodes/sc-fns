export interface DebounceOptions {
    /**
     * Execute on the leading edge of the timeout.
     * @default false
     */
    leading?: boolean;
    /**
     * Execute on the trailing edge of the timeout.
     * @default true
     */
    trailing?: boolean;
}

export interface DebouncedFunction<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): ReturnType<T> | undefined;
    cancel(): void;
    flush(): ReturnType<T> | undefined;
    pending(): boolean;
}

/**
 * Creates a debounced function that delays invoking `fn` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param fn - The function to debounce.
 * @param wait - Milliseconds to delay.
 * @param options - Options controlling leading and trailing execution.
 * @returns The debounced function equipped with cancel, flush, and pending methods.
 *
 * @example
 * ```ts
 * const debouncedSearch = debounce((query: string) => fetchResults(query), 300);
 * debouncedSearch("sc");
 * debouncedSearch("sc-fns"); // Only this final call executes after 300ms
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    wait: number,
    options: DebounceOptions = {},
): DebouncedFunction<T> {
    const { leading = false, trailing = true } = options;

    let timerId: ReturnType<typeof setTimeout> | undefined;
    let lastArgs: Parameters<T> | undefined;
    let lastThis: any;
    let result: ReturnType<T> | undefined;

    function invoke(): ReturnType<T> | undefined {
        if (lastArgs !== undefined) {
            result = fn.apply(lastThis, lastArgs);
            lastArgs = undefined;
            lastThis = undefined;
        }
        return result;
    }

    const debounced = function (this: any, ...args: Parameters<T>) {
        lastArgs = args;
        lastThis = this;

        const isFirstCall = timerId === undefined;

        if (timerId !== undefined) {
            clearTimeout(timerId);
        }

        if (leading && isFirstCall) {
            result = invoke();
        }

        timerId = setTimeout(() => {
            timerId = undefined;
            if (trailing && lastArgs !== undefined) {
                result = invoke();
            }
        }, wait);

        return result;
    } as DebouncedFunction<T>;

    debounced.cancel = () => {
        if (timerId !== undefined) {
            clearTimeout(timerId);
            timerId = undefined;
        }
        lastArgs = undefined;
        lastThis = undefined;
    };

    debounced.flush = () => {
        if (timerId !== undefined) {
            clearTimeout(timerId);
            timerId = undefined;
            return invoke();
        }
        return result;
    };

    debounced.pending = () => timerId !== undefined;

    return debounced;
}
