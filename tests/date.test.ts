import { describe, it, expect } from "vitest";
import {
    formatDate,
    formatRelativeTime,
    isToday,
    isYesterday,
    isTomorrow,
    addDays,
    subtractDays,
    getDateDifference,
} from "../src/date";

describe("date utilities", () => {
    describe("formatDate", () => {
        it("formats date with default format YYYY-MM-DD", () => {
            const d = new Date(2025, 0, 15);
            expect(formatDate(d)).toBe("2025-01-15");
        });

        it("formats date with tokens: YYYY, MM, DD, HH, mm, ss, A", () => {
            const d = new Date(2025, 4, 3, 14, 5, 9);
            expect(formatDate(d, "YYYY-MM-DD HH:mm:ss")).toBe("2025-05-03 14:05:09");
            expect(formatDate(d, "YY/M/D hh:mm A")).toBe("25/5/3 02:05 PM");
        });

        it("handles invalid dates", () => {
            expect(formatDate("invalid-date-string")).toBe("Invalid Date");
        });
    });

    describe("formatRelativeTime", () => {
        it("formats recent past times", () => {
            const now = new Date(2025, 0, 15, 12, 0, 0);
            const fiveMinsAgo = new Date(2025, 0, 15, 11, 55, 0);
            expect(formatRelativeTime(fiveMinsAgo, now)).toBe("5 minutes ago");
        });

        it("formats future times", () => {
            const now = new Date(2025, 0, 15, 12, 0, 0);
            const twoHoursLater = new Date(2025, 0, 15, 14, 0, 0);
            expect(formatRelativeTime(twoHoursLater, now)).toBe("in 2 hours");
        });

        it("formats just now for very small differences", () => {
            const now = new Date(2025, 0, 15, 12, 0, 0);
            const twoSecsAgo = new Date(2025, 0, 15, 11, 59, 57);
            expect(formatRelativeTime(twoSecsAgo, now)).toBe("just now");
        });

        it("handles invalid dates", () => {
            expect(formatRelativeTime("invalid", "invalid")).toBe("Invalid Date");
        });
    });

    describe("isToday, isYesterday, isTomorrow", () => {
        const base = new Date(2025, 5, 15, 10, 0, 0);
        const yesterday = new Date(2025, 5, 14, 22, 0, 0);
        const tomorrow = new Date(2025, 5, 16, 2, 0, 0);
        const other = new Date(2025, 5, 20);

        it("isToday checks if date is on same day", () => {
            expect(isToday(new Date(2025, 5, 15, 23, 59), base)).toBe(true);
            expect(isToday(yesterday, base)).toBe(false);
            expect(isToday(tomorrow, base)).toBe(false);
        });

        it("isYesterday checks if date is on previous day", () => {
            expect(isYesterday(yesterday, base)).toBe(true);
            expect(isYesterday(base, base)).toBe(false);
            expect(isYesterday(tomorrow, base)).toBe(false);
        });

        it("isTomorrow checks if date is on next day", () => {
            expect(isTomorrow(tomorrow, base)).toBe(true);
            expect(isTomorrow(base, base)).toBe(false);
            expect(isTomorrow(other, base)).toBe(false);
        });
    });

    describe("addDays and subtractDays", () => {
        it("adds days to date without mutating original", () => {
            const start = new Date(2025, 0, 1);
            const result = addDays(start, 5);
            expect(result.getDate()).toBe(6);
            expect(start.getDate()).toBe(1); // non-mutating
        });

        it("subtracts days to date without mutating original", () => {
            const start = new Date(2025, 0, 10);
            const result = subtractDays(start, 5);
            expect(result.getDate()).toBe(5);
            expect(start.getDate()).toBe(10); // non-mutating
        });
    });

    describe("getDateDifference", () => {
        const d1 = new Date(2025, 0, 10, 12, 0, 0);
        const d2 = new Date(2025, 0, 5, 12, 0, 0);

        it("calculates difference in days", () => {
            expect(getDateDifference(d1, d2, "days")).toBe(5);
            expect(getDateDifference(d2, d1, "days")).toBe(5); // absolute by default
        });

        it("calculates difference in hours, minutes, seconds", () => {
            expect(getDateDifference(d1, d2, "hours")).toBe(120);
            expect(getDateDifference(d1, d2, "minutes")).toBe(7200);
            expect(getDateDifference(d1, d2, "seconds")).toBe(432000);
        });

        it("supports directional (non-absolute) calculation", () => {
            expect(getDateDifference(d2, d1, "days", { absolute: false })).toBe(-5);
        });
    });
});
