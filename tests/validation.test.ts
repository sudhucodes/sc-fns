import { describe, it, expect } from "vitest";
import {
    isEmail,
    isURL,
    isUUID,
    isJSON,
    isNumber,
    isString,
    isObject,
    isArray,
} from "../src/validation";

describe("validation utilities", () => {
    describe("isEmail", () => {
        it("validates valid emails", () => {
            expect(isEmail("user@example.com")).toBe(true);
            expect(isEmail("user.name+tag@domain.co.uk")).toBe(true);
            expect(isEmail("first_last@sub.example.org")).toBe(true);
        });

        it("rejects invalid emails", () => {
            expect(isEmail("invalid-email")).toBe(false);
            expect(isEmail("@domain.com")).toBe(false);
            expect(isEmail("user@")).toBe(false);
            expect(isEmail("user@domain..com")).toBe(false);
            expect(isEmail(123)).toBe(false);
            expect(isEmail(null)).toBe(false);
        });
    });

    describe("isURL", () => {
        it("validates URLs with http and https", () => {
            expect(isURL("https://example.com")).toBe(true);
            expect(isURL("http://localhost:3000/api/users?page=1")).toBe(true);
            expect(isURL("https://sub.domain.com/path#hash")).toBe(true);
        });

        it("handles protocol restrictions and options", () => {
            expect(isURL("ftp://ftp.is.co.za/rfc/rfc1808.txt")).toBe(false);
            expect(
                isURL("ftp://ftp.is.co.za/rfc/rfc1808.txt", {
                    protocols: ["ftp", "http", "https"],
                }),
            ).toBe(true);
            expect(isURL("example.com", { requireProtocol: false })).toBe(true);
        });

        it("rejects invalid URLs", () => {
            expect(isURL("not a url")).toBe(false);
            expect(isURL("")).toBe(false);
            expect(isURL(null)).toBe(false);
        });
    });

    describe("isUUID", () => {
        it("validates standard RFC 4122 v4 UUIDs", () => {
            expect(isUUID("123e4567-e89b-42d3-a456-426614174000")).toBe(true);
            expect(isUUID("c9a646d3-9c61-4cd9-bc15-47044d66b8d0")).toBe(true);
        });

        it("validates specific versions", () => {
            const v1 = "e7498c40-3b7d-11eb-adc1-0242ac120002";
            const v4 = "c9a646d3-9c61-4cd9-bc15-47044d66b8d0";

            expect(isUUID(v1, 1)).toBe(true);
            expect(isUUID(v4, 1)).toBe(false);
            expect(isUUID(v4, 4)).toBe(true);
        });

        it("rejects malformed UUIDs", () => {
            expect(isUUID("12345")).toBe(false);
            expect(isUUID("123e4567-e89b-42d3-a456-42661417400Z")).toBe(false);
            expect(isUUID(null)).toBe(false);
        });
    });

    describe("isJSON", () => {
        it("validates JSON structures and primitives", () => {
            expect(isJSON('{"name":"Alice","age":30}')).toBe(true);
            expect(isJSON('[1, 2, "three"]')).toBe(true);
            expect(isJSON('"just a string"')).toBe(true);
            expect(isJSON("12345")).toBe(true);
        });

        it("supports objectsOrArraysOnly option", () => {
            expect(isJSON('"hello"', { objectsOrArraysOnly: true })).toBe(false);
            expect(isJSON('{"ok":true}', { objectsOrArraysOnly: true })).toBe(true);
        });

        it("rejects invalid JSON", () => {
            expect(isJSON("{ invalid: json }")).toBe(false);
            expect(isJSON("")).toBe(false);
            expect(isJSON(null)).toBe(false);
        });
    });

    describe("isNumber", () => {
        it("identifies valid finite numbers", () => {
            expect(isNumber(42)).toBe(true);
            expect(isNumber(0)).toBe(true);
            expect(isNumber(-3.14)).toBe(true);
        });

        it("rejects NaN, Infinity, and non-numbers", () => {
            expect(isNumber(NaN)).toBe(false);
            expect(isNumber(Infinity)).toBe(false);
            expect(isNumber(-Infinity)).toBe(false);
            expect(isNumber("42")).toBe(false);
            expect(isNumber(null)).toBe(false);
        });
    });

    describe("isString", () => {
        it("identifies strings", () => {
            expect(isString("hello")).toBe(true);
            expect(isString("")).toBe(true);
            expect(isString(123)).toBe(false);
            expect(isString(null)).toBe(false);
        });
    });

    describe("isObject", () => {
        it("identifies plain objects", () => {
            expect(isObject({ a: 1 })).toBe(true);
            expect(isObject(Object.create(null))).toBe(true);
        });

        it("rejects non-plain objects, arrays, and null", () => {
            expect(isObject([1, 2])).toBe(false);
            expect(isObject(null)).toBe(false);
            expect(isObject(new Date())).toBe(false);
            expect(isObject(new Date(), { plainOnly: false })).toBe(true);
            expect(isObject("string")).toBe(false);
        });
    });

    describe("isArray", () => {
        it("identifies arrays", () => {
            expect(isArray([1, 2])).toBe(true);
            expect(isArray([])).toBe(true);
            expect(isArray({})).toBe(false);
            expect(isArray("arr")).toBe(false);
            expect(isArray(null)).toBe(false);
        });
    });
});
