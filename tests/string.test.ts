import { describe, it, expect } from "vitest";
import {
    slugify,
    capitalize,
    capitalizeWords,
    truncate,
    removeWhitespace,
    normalizeWhitespace,
    randomString,
    maskString,
} from "../src/string";

describe("string utilities", () => {
    describe("slugify", () => {
        it("converts strings to url-friendly slugs", () => {
            expect(slugify("Hello World!")).toBe("hello-world");
            expect(slugify("  Multiple   Spaces  ")).toBe("multiple-spaces");
            expect(slugify("Special #$% Characters & Symbols")).toBe("special-characters-symbols");
        });

        it("handles accented unicode characters", () => {
            expect(slugify("Café & Crème Brûlée")).toBe("cafe-creme-brulee");
            expect(slugify("Héllo Wörld")).toBe("hello-world");
        });

        it("supports custom options", () => {
            expect(slugify("Hello World", { separator: "_" })).toBe("hello_world");
            expect(slugify("Hello World", { lowercase: false })).toBe("Hello-World");
            expect(slugify("-leading-and-trailing-", { preserveLeadingTrailing: true })).toBe(
                "-leading-and-trailing-",
            );
        });

        it("handles empty or falsy strings", () => {
            expect(slugify("")).toBe("");
            expect(slugify("---")).toBe("");
        });
    });

    describe("capitalize", () => {
        it("capitalizes the first character", () => {
            expect(capitalize("hello world")).toBe("Hello world");
            expect(capitalize("javaScript")).toBe("JavaScript");
            expect(capitalize("a")).toBe("A");
        });

        it("handles empty strings", () => {
            expect(capitalize("")).toBe("");
        });
    });

    describe("capitalizeWords", () => {
        it("capitalizes the first letter of each word", () => {
            expect(capitalizeWords("hello world")).toBe("Hello World");
            expect(capitalizeWords("the quick brown fox")).toBe("The Quick Brown Fox");
            expect(capitalizeWords("dash-separated_word")).toBe("Dash-Separated_Word");
        });

        it("handles empty string", () => {
            expect(capitalizeWords("")).toBe("");
        });
    });

    describe("truncate", () => {
        it("truncates string to given length with suffix", () => {
            expect(truncate("Hello World!", 8)).toBe("Hello...");
            expect(truncate("Short", 10)).toBe("Short");
            expect(truncate("Exact length", 12)).toBe("Exact length");
        });

        it("supports custom suffix", () => {
            expect(truncate("Hello World!", 8, " [more]")).toBe("H [more]");
            expect(truncate("sc-utils library", 8, "…")).toBe("sc-util…");
        });

        it("handles edge cases with short lengths and empty strings", () => {
            expect(truncate("", 5)).toBe("");
            expect(truncate("Hello", 0)).toBe("");
            expect(truncate("Hello", 2, "...")).toBe("..");
        });
    });

    describe("removeWhitespace", () => {
        it("removes all whitespace characters", () => {
            expect(removeWhitespace("  hello   world  \n\t")).toBe("helloworld");
            expect(removeWhitespace("no_space")).toBe("no_space");
            expect(removeWhitespace("")).toBe("");
        });
    });

    describe("normalizeWhitespace", () => {
        it("collapses consecutive spaces and trims edges", () => {
            expect(normalizeWhitespace("  hello \t\n  world   ")).toBe("hello world");
            expect(normalizeWhitespace("single space")).toBe("single space");
            expect(normalizeWhitespace("")).toBe("");
        });
    });

    describe("randomString", () => {
        it("generates a string with the exact requested length", () => {
            expect(randomString(10)).toHaveLength(10);
            expect(randomString(0)).toBe("");
            expect(randomString(32)).toHaveLength(32);
        });

        it("uses custom charset when provided", () => {
            const digitsOnly = randomString(20, "0123456789");
            expect(digitsOnly).toMatch(/^[0-9]{20}$/);
        });

        it("generates distinct random strings", () => {
            const str1 = randomString(16);
            const str2 = randomString(16);
            expect(str1).not.toBe(str2);
        });
    });

    describe("maskString", () => {
        it("masks string keeping default last 4 chars unmasked", () => {
            expect(maskString("1234567890123456")).toBe("************3456");
        });

        it("respects unmaskedStart and unmaskedEnd", () => {
            expect(
                maskString("secretpassword", {
                    unmaskedStart: 2,
                    unmaskedEnd: 2,
                    maskChar: "*",
                }),
            ).toBe("se**********rd");
        });

        it("handles strings shorter than or equal to start + end", () => {
            expect(maskString("1234", { unmaskedStart: 2, unmaskedEnd: 2 })).toBe("****");
            expect(maskString("12", { unmaskedStart: 2, unmaskedEnd: 2 })).toBe("**");
        });

        it("handles empty strings", () => {
            expect(maskString("")).toBe("");
        });
    });
});
