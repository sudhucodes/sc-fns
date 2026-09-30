import { describe, it, expect } from "vitest";
import {
    generateUUID,
    generateShortId,
    randomNumber,
    randomBoolean,
    randomHex,
    generateOTP,
} from "../src/id";

describe("id and random utilities", () => {
    describe("generateUUID", () => {
        it("generates a valid RFC 4122 v4 UUID", () => {
            const uuid = generateUUID();
            const uuidV4Regex =
                /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            expect(uuid).toMatch(uuidV4Regex);
        });

        it("generates unique UUIDs", () => {
            const u1 = generateUUID();
            const u2 = generateUUID();
            expect(u1).not.toBe(u2);
        });
    });

    describe("generateShortId", () => {
        it("generates an id of the default length (8)", () => {
            const id = generateShortId();
            expect(id).toHaveLength(8);
            expect(id).toMatch(/^[0-9a-zA-Z]{8}$/);
        });

        it("generates an id of specified custom length and custom alphabet", () => {
            const id = generateShortId(12, "0123456789ABCDEF");
            expect(id).toHaveLength(12);
            expect(id).toMatch(/^[0-9A-F]{12}$/);
        });

        it("returns empty string if length is <= 0", () => {
            expect(generateShortId(0)).toBe("");
        });
    });

    describe("randomNumber", () => {
        it("generates integer within range [min, max]", () => {
            for (let i = 0; i < 50; i++) {
                const num = randomNumber(5, 10);
                expect(Number.isInteger(num)).toBe(true);
                expect(num).toBeGreaterThanOrEqual(5);
                expect(num).toBeLessThanOrEqual(10);
            }
        });

        it("swaps min and max if min > max", () => {
            const num = randomNumber(10, 5);
            expect(num).toBeGreaterThanOrEqual(5);
            expect(num).toBeLessThanOrEqual(10);
        });

        it("supports floating point numbers", () => {
            const num = randomNumber(0, 1, false);
            expect(num).toBeGreaterThanOrEqual(0);
            expect(num).toBeLessThanOrEqual(1);
        });
    });

    describe("randomBoolean", () => {
        it("returns a boolean", () => {
            expect(typeof randomBoolean()).toBe("boolean");
        });

        it("respects 0 and 1 boundaries", () => {
            expect(randomBoolean(0)).toBe(false);
            expect(randomBoolean(1)).toBe(true);
        });
    });

    describe("randomHex", () => {
        it("generates hex string of given length", () => {
            const hex = randomHex(16);
            expect(hex).toHaveLength(16);
            expect(hex).toMatch(/^[0-9a-f]{16}$/);
        });

        it("handles odd and short lengths", () => {
            const hex = randomHex(7);
            expect(hex).toHaveLength(7);
            expect(hex).toMatch(/^[0-9a-f]{7}$/);
            expect(randomHex(0)).toBe("");
        });
    });

    describe("generateOTP", () => {
        it("generates 6-digit numeric OTP by default", () => {
            const otp = generateOTP();
            expect(otp).toHaveLength(6);
            expect(otp).toMatch(/^[0-9]{6}$/);
        });

        it("supports custom length", () => {
            const otp = generateOTP(4);
            expect(otp).toHaveLength(4);
            expect(otp).toMatch(/^[0-9]{4}$/);
        });

        it("returns empty string when length <= 0", () => {
            expect(generateOTP(0)).toBe("");
        });
    });
});
