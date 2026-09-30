import { describe, it, expect } from "vitest";
import * as ScUtils from "../src";

describe("root exports", () => {
    it("exports all expected utilities from root index", () => {
        // STRING
        expect(typeof ScUtils.slugify).toBe("function");
        expect(typeof ScUtils.capitalize).toBe("function");
        expect(typeof ScUtils.capitalizeWords).toBe("function");
        expect(typeof ScUtils.truncate).toBe("function");
        expect(typeof ScUtils.removeWhitespace).toBe("function");
        expect(typeof ScUtils.normalizeWhitespace).toBe("function");
        expect(typeof ScUtils.randomString).toBe("function");
        expect(typeof ScUtils.maskString).toBe("function");

        // ID / RANDOM
        expect(typeof ScUtils.generateUUID).toBe("function");
        expect(typeof ScUtils.generateShortId).toBe("function");
        expect(typeof ScUtils.randomNumber).toBe("function");
        expect(typeof ScUtils.randomBoolean).toBe("function");
        expect(typeof ScUtils.randomHex).toBe("function");
        expect(typeof ScUtils.generateOTP).toBe("function");

        // ARRAY
        expect(typeof ScUtils.shuffleArray).toBe("function");
        expect(typeof ScUtils.randomItem).toBe("function");
        expect(typeof ScUtils.randomItems).toBe("function");
        expect(typeof ScUtils.chunkArray).toBe("function");
        expect(typeof ScUtils.uniqueArray).toBe("function");
        expect(typeof ScUtils.uniqueBy).toBe("function");
        expect(typeof ScUtils.flattenArray).toBe("function");
        expect(typeof ScUtils.groupBy).toBe("function");
        expect(typeof ScUtils.removeItem).toBe("function");
        expect(typeof ScUtils.moveItem).toBe("function");

        // NUMBER
        expect(typeof ScUtils.clamp).toBe("function");
        expect(typeof ScUtils.formatNumber).toBe("function");
        expect(typeof ScUtils.roundTo).toBe("function");
        expect(typeof ScUtils.percentage).toBe("function");
        expect(typeof ScUtils.isEven).toBe("function");
        expect(typeof ScUtils.isOdd).toBe("function");

        // OBJECT
        expect(typeof ScUtils.isEmpty).toBe("function");
        expect(typeof ScUtils.pick).toBe("function");
        expect(typeof ScUtils.omit).toBe("function");
        expect(typeof ScUtils.deepClone).toBe("function");
        expect(typeof ScUtils.deepMerge).toBe("function");
        expect(typeof ScUtils.removeUndefined).toBe("function");
        expect(typeof ScUtils.removeNull).toBe("function");

        // DATE
        expect(typeof ScUtils.formatDate).toBe("function");
        expect(typeof ScUtils.formatRelativeTime).toBe("function");
        expect(typeof ScUtils.isToday).toBe("function");
        expect(typeof ScUtils.isYesterday).toBe("function");
        expect(typeof ScUtils.isTomorrow).toBe("function");
        expect(typeof ScUtils.addDays).toBe("function");
        expect(typeof ScUtils.subtractDays).toBe("function");
        expect(typeof ScUtils.getDateDifference).toBe("function");

        // VALIDATION
        expect(typeof ScUtils.isEmail).toBe("function");
        expect(typeof ScUtils.isURL).toBe("function");
        expect(typeof ScUtils.isUUID).toBe("function");
        expect(typeof ScUtils.isJSON).toBe("function");
        expect(typeof ScUtils.isNumber).toBe("function");
        expect(typeof ScUtils.isString).toBe("function");
        expect(typeof ScUtils.isObject).toBe("function");
        expect(typeof ScUtils.isArray).toBe("function");

        // URL
        expect(typeof ScUtils.buildURL).toBe("function");
        expect(typeof ScUtils.addQueryParams).toBe("function");
        expect(typeof ScUtils.removeQueryParam).toBe("function");
        expect(typeof ScUtils.getQueryParam).toBe("function");
        expect(typeof ScUtils.getDomain).toBe("function");
        expect(typeof ScUtils.getPath).toBe("function");

        // COMMON
        expect(typeof ScUtils.sleep).toBe("function");
        expect(typeof ScUtils.debounce).toBe("function");
        expect(typeof ScUtils.throttle).toBe("function");
        expect(typeof ScUtils.retry).toBe("function");
        expect(typeof ScUtils.timeout).toBe("function");
        expect(typeof ScUtils.once).toBe("function");
        expect(typeof ScUtils.noop).toBe("function");
        expect(typeof ScUtils.identity).toBe("function");

        // FILE
        expect(typeof ScUtils.getFileExtension).toBe("function");
        expect(typeof ScUtils.getFileName).toBe("function");
        expect(typeof ScUtils.formatFileSize).toBe("function");
        expect(typeof ScUtils.isImage).toBe("function");
        expect(typeof ScUtils.isVideo).toBe("function");
        expect(typeof ScUtils.isPDF).toBe("function");

        // BROWSER
        expect(typeof ScUtils.copyToClipboard).toBe("function");
        expect(typeof ScUtils.getCookie).toBe("function");
        expect(typeof ScUtils.setCookie).toBe("function");
        expect(typeof ScUtils.deleteCookie).toBe("function");
    });
});
