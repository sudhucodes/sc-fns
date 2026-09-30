import { describe, it, expect } from "vitest";
import { clamp, formatNumber, roundTo, percentage, isEven, isOdd } from "../src/number";

describe("number utilities", () => {
    describe("clamp", () => {
        it("clamps value within bounds", () => {
            expect(clamp(150, 0, 100)).toBe(100);
            expect(clamp(-5, 0, 100)).toBe(0);
            expect(clamp(42, 0, 100)).toBe(42);
        });

        it("swaps min and max if min > max", () => {
            expect(clamp(50, 100, 0)).toBe(50);
            expect(clamp(-10, 100, 0)).toBe(0);
            expect(clamp(150, 100, 0)).toBe(100);
        });
    });

    describe("formatNumber", () => {
        it("formats standard numbers with separators", () => {
            expect(formatNumber(1234567.89)).toBe("1,234,567.89");
            expect(formatNumber(1000)).toBe("1,000");
        });

        it("supports locale and decimals option", () => {
            expect(formatNumber(1234.5678, { decimals: 2 })).toBe("1,234.57");
            // German uses '.' as thousands separator and ',' as decimal mark
            expect(formatNumber(1234.56, { locale: "de-DE" })).toBe("1.234,56");
        });

        it("supports compact notation", () => {
            expect(formatNumber(1500000, { notation: "compact" })).toBe("1.5M");
            expect(formatNumber(2000, { notation: "compact" })).toBe("2K");
        });
    });

    describe("roundTo", () => {
        it("rounds numbers to specified decimal places", () => {
            expect(roundTo(1.005, 2)).toBe(1.01);
            expect(roundTo(123.456, 1)).toBe(123.5);
            expect(roundTo(123.456, 0)).toBe(123);
            expect(roundTo(123.456, -1)).toBe(123);
        });

        it("handles edge cases: NaN and Infinity", () => {
            expect(roundTo(NaN, 2)).toBeNaN();
            expect(roundTo(Infinity, 2)).toBe(Infinity);
        });
    });

    describe("percentage", () => {
        it("computes percentage accurately", () => {
            expect(percentage(25, 100)).toBe(25);
            expect(percentage(1, 3, 2)).toBe(33.33);
            expect(percentage(50, 200)).toBe(25);
        });

        it("handles zero total gracefully", () => {
            expect(percentage(50, 0)).toBe(0);
            expect(percentage(0, 0)).toBe(0);
        });
    });

    describe("isEven and isOdd", () => {
        it("correctly identifies even integers", () => {
            expect(isEven(4)).toBe(true);
            expect(isEven(0)).toBe(true);
            expect(isEven(-2)).toBe(true);
            expect(isEven(3)).toBe(false);
            expect(isEven(4.5)).toBe(false);
        });

        it("correctly identifies odd integers", () => {
            expect(isOdd(3)).toBe(true);
            expect(isOdd(-5)).toBe(true);
            expect(isOdd(0)).toBe(false);
            expect(isOdd(4)).toBe(false);
            expect(isOdd(3.5)).toBe(false);
        });
    });
});
