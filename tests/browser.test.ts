import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { copyToClipboard, getCookie, setCookie, deleteCookie } from "../src/browser";

describe("browser utilities", () => {
    describe("copyToClipboard", () => {
        const originalNavigator = globalThis.navigator;

        afterEach(() => {
            Object.defineProperty(globalThis, "navigator", {
                value: originalNavigator,
                configurable: true,
            });
        });

        it("copies text using navigator.clipboard when available", async () => {
            const writeTextMock = vi.fn().mockResolvedValue(undefined);
            Object.defineProperty(globalThis, "navigator", {
                value: {
                    clipboard: {
                        writeText: writeTextMock,
                    },
                },
                configurable: true,
            });

            const success = await copyToClipboard("test clipboard content");
            expect(success).toBe(true);
            expect(writeTextMock).toHaveBeenCalledWith("test clipboard content");
        });

        it("returns false for non-string input", async () => {
            const success = await copyToClipboard(null as any);
            expect(success).toBe(false);
        });
    });

    describe("cookie utilities", () => {
        let mockDoc: { cookie: string };

        beforeEach(() => {
            mockDoc = { cookie: "" };
        });

        it("sets, reads, and deletes cookie", () => {
            // Set cookie
            setCookie("user_id", "42", { days: 7, path: "/" }, mockDoc);
            expect(mockDoc.cookie).toContain("user_id=42");

            // Read cookie
            const val = getCookie("user_id", mockDoc);
            expect(val).toBe("42");

            // Delete cookie
            deleteCookie("user_id", { path: "/" }, mockDoc);
            expect(mockDoc.cookie).toContain("user_id=");
            expect(mockDoc.cookie).toContain("expires=Thu, 01 Jan 1970 00:00:00 GMT");
        });

        it("handles complex and URI-encoded cookie values", () => {
            const complex = "hello world & special=true";
            setCookie("test_data", complex, {}, mockDoc);

            const retrieved = getCookie("test_data", mockDoc);
            expect(retrieved).toBe(complex);
        });

        it("returns null when cookie does not exist", () => {
            expect(getCookie("non_existent", "a=1; b=2")).toBeNull();
            expect(getCookie("", mockDoc)).toBeNull();
        });
    });
});
