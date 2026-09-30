import { describe, it, expect } from "vitest";
import {
    buildURL,
    addQueryParams,
    removeQueryParam,
    getQueryParam,
    getDomain,
    getPath,
} from "../src/url";

describe("url utilities", () => {
    describe("buildURL", () => {
        it("builds absolute URL with path, query params, and hash", () => {
            const url = buildURL("https://api.example.com", {
                path: ["v1", "users"],
                queryParams: { page: 1, limit: 10 },
                hash: "section-2",
            });
            expect(url).toBe("https://api.example.com/v1/users?page=1&limit=10#section-2");
        });

        it("handles trailing and leading slashes smoothly", () => {
            const url = buildURL("https://example.com/", {
                path: ["/subpath/", "/endpoint"],
            });
            expect(url).toBe("https://example.com/subpath/endpoint");
        });

        it("supports relative URLs", () => {
            const url = buildURL("/api", {
                path: "items",
                queryParams: { filter: "active" },
            });
            expect(url).toBe("/api/items?filter=active");
        });
    });

    describe("addQueryParams", () => {
        it("adds query params to absolute URL", () => {
            const url = addQueryParams("https://example.com/search?q=sc-utils", {
                page: 2,
                sort: "desc",
            });
            expect(url).toBe("https://example.com/search?q=sc-utils&page=2&sort=desc");
        });

        it("adds query params to relative URL", () => {
            const url = addQueryParams("/api/users", { active: true });
            expect(url).toBe("/api/users?active=true");
        });

        it("updates existing query params", () => {
            const url = addQueryParams("https://example.com?page=1", { page: 2 });
            expect(url).toBe("https://example.com/?page=2");
        });
    });

    describe("removeQueryParam", () => {
        it("removes a single query param", () => {
            const url = removeQueryParam("https://example.com?a=1&b=2&c=3", "b");
            expect(url).toBe("https://example.com/?a=1&c=3");
        });

        it("removes multiple query params", () => {
            const url = removeQueryParam("https://example.com?a=1&b=2&c=3", ["a", "c"]);
            expect(url).toBe("https://example.com/?b=2");
        });
    });

    describe("getQueryParam", () => {
        it("retrieves param value from URL", () => {
            expect(getQueryParam("https://example.com?search=typescript&page=1", "search")).toBe(
                "typescript",
            );
            expect(getQueryParam("/users?id=123", "id")).toBe("123");
        });

        it("returns null when param is absent", () => {
            expect(getQueryParam("https://example.com", "missing")).toBeNull();
        });
    });

    describe("getDomain", () => {
        it("extracts domain/hostname from URL", () => {
            expect(getDomain("https://sub.example.com:8080/path")).toBe("sub.example.com");
            expect(getDomain("http://localhost:3000")).toBe("localhost");
            expect(getDomain("example.org/test")).toBe("example.org");
        });

        it("returns empty string for invalid URL", () => {
            expect(getDomain("")).toBe("");
        });
    });

    describe("getPath", () => {
        it("extracts pathname excluding query string and hash", () => {
            expect(getPath("https://example.com/api/v1/users?page=1#top")).toBe("/api/v1/users");
            expect(getPath("/relative/path?foo=bar")).toBe("/relative/path");
        });

        it("returns empty string for empty input", () => {
            expect(getPath("")).toBe("");
        });
    });
});
