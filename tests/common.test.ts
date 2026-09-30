import { describe, it, expect, vi } from "vitest";
import { sleep, debounce, throttle, retry, timeout, once, noop, identity } from "../src/common";

describe("common utilities", () => {
    describe("sleep", () => {
        it("pauses execution for the specified duration", async () => {
            const start = Date.now();
            await sleep(30);
            const elapsed = Date.now() - start;
            expect(elapsed).toBeGreaterThanOrEqual(25);
        });
    });

    describe("debounce", () => {
        it("debounces rapid successive calls", async () => {
            const fn = vi.fn((x: number) => x * 2);
            const debounced = debounce(fn, 50);

            debounced(1);
            debounced(2);
            debounced(3);

            expect(fn).not.toHaveBeenCalled();

            await sleep(70);

            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn).toHaveBeenCalledWith(3);
        });

        it("supports cancel and flush", () => {
            const fn = vi.fn();
            const debounced = debounce(fn, 100);

            debounced();
            expect(debounced.pending()).toBe(true);

            debounced.cancel();
            expect(debounced.pending()).toBe(false);
            expect(fn).not.toHaveBeenCalled();

            debounced();
            debounced.flush();
            expect(fn).toHaveBeenCalledTimes(1);
        });
    });

    describe("throttle", () => {
        it("throttles calls to at most once per wait interval", async () => {
            const fn = vi.fn();
            const throttled = throttle(fn, 40);

            throttled();
            throttled();
            throttled();

            expect(fn).toHaveBeenCalledTimes(1);

            await sleep(60);
            expect(fn).toHaveBeenCalledTimes(2);
        });

        it("supports cancel", () => {
            const fn = vi.fn();
            const throttled = throttle(fn, 50);

            throttled();
            throttled();
            throttled.cancel();
            expect(throttled.pending()).toBe(false);
        });
    });

    describe("retry", () => {
        it("returns result on first attempt if successful", async () => {
            const fn = vi.fn().mockResolvedValue("success");
            const result = await retry(fn, { retries: 3 });

            expect(result).toBe("success");
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it("retries on failure until success", async () => {
            let attempts = 0;
            const fn = vi.fn(async () => {
                attempts++;
                if (attempts < 3) throw new Error("Temporary error");
                return "recovered";
            });

            const onRetry = vi.fn();
            const result = await retry(fn, { retries: 3, delay: 10, onRetry });

            expect(result).toBe("recovered");
            expect(attempts).toBe(3);
            expect(onRetry).toHaveBeenCalledTimes(2);
        });

        it("throws last error if all attempts fail", async () => {
            const fn = vi.fn().mockRejectedValue(new Error("Fatal failure"));
            await expect(retry(fn, { retries: 2, delay: 5 })).rejects.toThrow("Fatal failure");
            expect(fn).toHaveBeenCalledTimes(2);
        });
    });

    describe("timeout", () => {
        it("resolves if promise completes within time limit", async () => {
            const promise = sleep(10).then(() => "done");
            const result = await timeout(promise, 50);
            expect(result).toBe("done");
        });

        it("rejects if promise exceeds time limit", async () => {
            const promise = sleep(100).then(() => "too late");
            await expect(timeout(promise, 20, "Custom timeout error")).rejects.toThrow(
                "Custom timeout error",
            );
        });
    });

    describe("once", () => {
        it("executes only once and caches result", () => {
            const fn = vi.fn((a: number, b: number) => a + b);
            const onceFn = once(fn);

            expect(onceFn(2, 3)).toBe(5);
            expect(onceFn(4, 5)).toBe(5);
            expect(fn).toHaveBeenCalledTimes(1);
        });
    });

    describe("noop", () => {
        it("returns undefined without error", () => {
            expect(noop()).toBeUndefined();
        });
    });

    describe("identity", () => {
        it("returns input as is", () => {
            const obj = { id: 1 };
            expect(identity(obj)).toBe(obj);
            expect(identity("test")).toBe("test");
        });
    });
});
