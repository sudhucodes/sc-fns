# sc-utils ⚡

A lightweight, production-ready, dependency-free TypeScript utility library for JavaScript and TypeScript developers.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)]()
[![Tree Shakeable](https://img.shields.io/badge/tree--shakeable-yes-success.svg)]()

---

## Features

- 🚀 **Zero Runtime Dependencies**: Zero bloat, zero dependency supply-chain headaches.
- 💎 **TypeScript-First**: Strict type safety, rich generics, and built-in `.d.ts` declaration maps.
- 📦 **Dual ESM & CJS**: Full support for modern `import` and legacy `require`.
- 🌲 **Tree-Shakeable**: Import only the utilities you need without pulling in unused code.
- 🗂️ **Subpath Imports**: Direct category imports (`sc-utils/string`, `sc-utils/array`, etc.).
- 🌐 **Web Standards**: Leverages modern Web APIs (`crypto.randomUUID`, `Intl`, `URL`, `navigator.clipboard`) with cross-platform fallbacks.
- 🧪 **100% Tested**: Comprehensive unit test suite covering normal scenarios and edge cases.
- 🛡️ **Non-Mutating**: Pure functions that never mutate your input arrays or objects.

---

## Installation

```bash
# pnpm
pnpm add sc-utils

# npm
npm install sc-utils

# yarn
yarn add sc-utils
```

---

## Quick Start

You can import utilities directly from the root package or via modular subpath imports for maximum tree-shaking efficiency:

```ts
// Root import
import { slugify, shuffleArray, generateUUID, clamp } from "sc-utils";

// Subpath imports
import { slugify, capitalizeWords } from "sc-utils/string";
import { shuffleArray, chunkArray } from "sc-utils/array";
import { generateUUID, generateOTP } from "sc-utils/id";
import { clamp, percentage } from "sc-utils/number";
import { deepClone, pick } from "sc-utils/object";
import { formatDate, formatRelativeTime } from "sc-utils/date";
import { isEmail, isURL } from "sc-utils/validation";
import { buildURL, addQueryParams } from "sc-utils/url";
import { debounce, retry, sleep } from "sc-utils/common";
import { formatFileSize, getFileExtension } from "sc-utils/file";
import { copyToClipboard, getCookie } from "sc-utils/browser";
```

---

## API Reference

### 🔤 String (`sc-utils/string`)

| Function | Description | Example |
| :--- | :--- | :--- |
| `slugify(str, options?)` | Converts text to URL-friendly slug, stripping accents and special characters | `slugify("Hello World!")` → `"hello-world"` |
| `capitalize(str)` | Capitalizes the first character of a string | `capitalize("hello world")` → `"Hello world"` |
| `capitalizeWords(str)` | Capitalizes the first letter of each word in a string | `capitalizeWords("hello world")` → `"Hello World"` |
| `truncate(str, length, suffix?)` | Truncates string to a maximum length with suffix | `truncate("Hello World!", 8)` → `"Hello..."` |
| `removeWhitespace(str)` | Removes all whitespace (spaces, tabs, newlines) | `removeWhitespace(" a  b \n")` → `"ab"` |
| `normalizeWhitespace(str)` | Collapses consecutive whitespace into a single space and trims | `normalizeWhitespace(" a   b ")` → `"a b"` |
| `randomString(length, charset?)` | Generates a cryptographically strong random string | `randomString(8)` → `"a8F2k9L1"` |
| `maskString(str, options?)` | Masks sensitive characters with custom character | `maskString("1234567890123456")` → `"************3456"` |

---

### 🆔 ID & Random (`sc-utils/id`)

| Function | Description | Example |
| :--- | :--- | :--- |
| `generateUUID()` | Generates RFC 4122 v4 UUID with crypto support | `generateUUID()` → `"f47ac10b-58cc-4372-a567-0e02b2c3d479"` |
| `generateShortId(length?, alphabet?)` | Generates compact URL-safe random identifier | `generateShortId(8)` → `"7kG8x2b1"` |
| `randomNumber(min?, max?, integer?)` | Generates random number (integer or float) within range | `randomNumber(1, 10)` → `7` |
| `randomBoolean(chance?)` | Generates boolean with optional probability weighting | `randomBoolean(0.7)` → `true` (70% probability) |
| `randomHex(length?)` | Generates random hexadecimal string | `randomHex(8)` → `"a1b2c3d4"` |
| `generateOTP(length?)` | Generates numeric One-Time Password of given length | `generateOTP(6)` → `"481293"` |

---

### 📚 Array (`sc-utils/array`)

| Function | Description | Example |
| :--- | :--- | :--- |
| `shuffleArray(array)` | Fisher-Yates array shuffle (non-mutating) | `shuffleArray([1, 2, 3])` → `[3, 1, 2]` |
| `randomItem(array)` | Picks a single random element from an array | `randomItem(["a", "b", "c"])` → `"b"` |
| `randomItems(array, count, options?)` | Picks multiple random elements (with or without replacement) | `randomItems([1, 2, 3, 4], 2)` → `[3, 1]` |
| `chunkArray(array, size)` | Splits array into chunks of specified size | `chunkArray([1, 2, 3, 4, 5], 2)` → `[[1, 2], [3, 4], [5]]` |
| `uniqueArray(array)` | Removes duplicate primitives while preserving order | `uniqueArray([1, 2, 3])` → `[1, 2, 3]` |
| `uniqueBy(array, iteratee)` | Deduplicates objects by key or mapping function | `uniqueBy(users, "id")` |
| `flattenArray(array, depth?)` | Flattens nested arrays to specified depth | `flattenArray([1, [2, [3]]], 2)` → `[1, 2, 3]` |
| `groupBy(array, iteratee)` | Groups array items by key or mapping function | `groupBy(words, "length")` |
| `removeItem(array, itemOrPredicate)` | Removes first matching item (non-mutating) | `removeItem([1, 2, 3], 2)` → `[1, 3]` |
| `moveItem(array, fromIndex, toIndex)` | Moves item within array (non-mutating) | `moveItem(["a", "b", "c"], 0, 2)` → `["b", "c", "a"]` |

---

### 🔢 Number (`sc-utils/number`)

| Function | Description | Example |
| :--- | :--- | :--- |
| `clamp(value, min, max)` | Clamps a number within bounds | `clamp(150, 0, 100)` → `100` |
| `formatNumber(value, options?)` | Formats numbers with locale, decimals, and compact notation | `formatNumber(1500000, { notation: "compact" })` → `"1.5M"` |
| `roundTo(value, decimals?)` | Accurately rounds numbers to N decimals | `roundTo(1.005, 2)` → `1.01` |
| `percentage(partial, total, decimals?)` | Computes percentage, handling zero division gracefully | `percentage(25, 100)` → `25` |
| `isEven(value)` | Tests if number is an even integer | `isEven(4)` → `true` |
| `isOdd(value)` | Tests if number is an odd integer | `isOdd(3)` → `true` |

---

### 📦 Object (`sc-utils/object`)

| Function | Description | Example |
| :--- | :--- | :--- |
| `isEmpty(value)` | Checks if null, empty string, empty array, Set, Map, or object | `isEmpty({})` → `true` |
| `pick(object, keys)` | Creates an object containing only the picked keys | `pick(user, ["id", "name"])` |
| `omit(object, keys)` | Creates an object excluding the specified keys | `omit(user, ["password"])` |
| `deepClone(value)` | Deeply clones objects, arrays, Dates, RegExps, Maps, Sets | `deepClone(data)` |
| `deepMerge(target, ...sources)` | Recursively merges objects without prototype pollution | `deepMerge({ a: 1 }, { b: 2 })` |
| `removeUndefined(object, deep?)` | Creates object with `undefined` values removed | `removeUndefined({ a: 1, b: undefined })` → `{ a: 1 }` |
| `removeNull(object, deep?)` | Creates object with `null` values removed | `removeNull({ a: 1, b: null })` → `{ a: 1 }` |

---

### 📅 Date (`sc-utils/date`)

| Function | Description | Example |
| :--- | :--- | :--- |
| `formatDate(date, formatStr?)` | Formats date with tokens (`YYYY`, `MM`, `DD`, `HH`, `mm`, `ss`, `A`) | `formatDate(new Date(), "YYYY-MM-DD")` |
| `formatRelativeTime(date, baseDate?, options?)` | Formats relative time ("just now", "5 minutes ago", "in 2 hours") | `formatRelativeTime(Date.now() - 60000)` → `"1 minute ago"` |
| `isToday(date, ref?)` | Tests if date matches today | `isToday(new Date())` → `true` |
| `isYesterday(date, ref?)` | Tests if date matches yesterday | `isYesterday(yesterday)` → `true` |
| `isTomorrow(date, ref?)` | Tests if date matches tomorrow | `isTomorrow(tomorrow)` → `true` |
| `addDays(date, days)` | Returns a new Date with days added | `addDays(new Date(), 7)` |
| `subtractDays(date, days)` | Returns a new Date with days subtracted | `subtractDays(new Date(), 7)` |
| `getDateDifference(d1, d2, unit?, options?)` | Computes difference in ms, seconds, minutes, hours, days | `getDateDifference(d1, d2, "days")` → `5` |

---

### 🛡️ Validation (`sc-utils/validation`)

| Function | Description | Example |
| :--- | :--- | :--- |
| `isEmail(value)` | Validates email address format | `isEmail("user@example.com")` → `true` |
| `isURL(value, options?)` | Validates URL format with allowed protocols | `isURL("https://example.com")` → `true` |
| `isUUID(value, version?)` | Validates RFC 4122 UUID (versions 1-5 or all) | `isUUID(id)` → `true` |
| `isJSON(value, options?)` | Validates JSON string syntax | `isJSON('{"a":1}')` → `true` |
| `isNumber(value)` | Type guard for finite numbers (excludes NaN and Infinity) | `isNumber(42)` → `true` |
| `isString(value)` | Type guard for string primitives | `isString("hello")` → `true` |
| `isObject(value, options?)` | Type guard for plain objects (excludes arrays, null) | `isObject({ a: 1 })` → `true` |
| `isArray(value)` | Type guard for arrays | `isArray([1, 2])` → `true` |

---

### 🔗 URL (`sc-utils/url`)

| Function | Description | Example |
| :--- | :--- | :--- |
| `buildURL(base, options?)` | Assembles URL with path segments, query params, and hash | `buildURL("https://api.com", { path: "users", queryParams: { page: 1 } })` |
| `addQueryParams(url, params)` | Appends or updates query parameters in URL | `addQueryParams("/users", { page: 2 })` → `"/users?page=2"` |
| `removeQueryParam(url, params)` | Removes one or more query parameters | `removeQueryParam("?a=1&b=2", "b")` → `"?a=1"` |
| `getQueryParam(url, param)` | Extracts parameter value from URL | `getQueryParam("?search=test", "search")` → `"test"` |
| `getDomain(url)` | Extracts hostname/domain from URL | `getDomain("https://sub.domain.com:8080")` → `"sub.domain.com"` |
| `getPath(url)` | Extracts pathname without query string or hash | `getPath("https://domain.com/api?a=1")` → `"/api"` |

---

### ⚡ Common & Async (`sc-utils/common`)

| Function | Description | Example |
| :--- | :--- | :--- |
| `sleep(ms)` | Returns a Promise that resolves after `ms` | `await sleep(1000)` |
| `debounce(fn, wait, options?)` | Debounces function with `cancel`, `flush`, and `pending` | `const debounced = debounce(search, 300)` |
| `throttle(fn, wait, options?)` | Throttles function invocations with `cancel` and `pending` | `const throttled = throttle(onScroll, 100)` |
| `retry(fn, options?)` | Retries async operation with attempts, delay, and backoff | `await retry(fetchData, { retries: 3 })` |
| `timeout(promise, ms, error?)` | Rejects if promise takes longer than `ms` | `await timeout(fetchData(), 5000)` |
| `once(fn)` | Restricts function to a single execution, caching result | `const init = once(setup)` |
| `noop()` | No-operation empty function `() => {}` | `const cb = options.onComplete ?? noop` |
| `identity(value)` | Identity function returning its argument | `[1, 2, 3].map(identity)` |

---

### 📁 File (`sc-utils/file`)

| Function | Description | Example |
| :--- | :--- | :--- |
| `getFileExtension(filename)` | Extracts lowercase file extension without dot | `getFileExtension("document.PDF")` → `"pdf"` |
| `getFileName(path, includeExt?)` | Extracts filename with or without extension | `getFileName("/docs/report.pdf", false)` → `"report"` |
| `formatFileSize(bytes, decimals?)` | Formats byte size to B, KB, MB, GB, TB, PB | `formatFileSize(1024 * 1024)` → `"1 MB"` |
| `isImage(filenameOrMime)` | Tests if extension or MIME is an image | `isImage("photo.png")` → `true` |
| `isVideo(filenameOrMime)` | Tests if extension or MIME is a video | `isVideo("movie.mp4")` → `true` |
| `isPDF(filenameOrMime)` | Tests if extension or MIME is a PDF | `isPDF("document.pdf")` → `true` |

---

### 🌐 Browser (`sc-utils/browser`)

| Function | Description | Example |
| :--- | :--- | :--- |
| `copyToClipboard(text)` | Copies text to clipboard via Clipboard API or fallback | `await copyToClipboard("Hello!")` |
| `getCookie(name, context?)` | Retrieves cookie value by name | `getCookie("session_token")` |
| `setCookie(name, value, options?, context?)` | Sets browser cookie with expiration, domain, path, SameSite | `setCookie("theme", "dark", { days: 30 })` |
| `deleteCookie(name, options?, context?)` | Deletes browser cookie | `deleteCookie("theme")` |

---

## Development

```bash
# Install dependencies
pnpm install

# Run test suite
pnpm test

# Run tests in watch mode
pnpm run test:watch

# Type check
pnpm run typecheck

# Lint source files
pnpm run lint

# Format code
pnpm run format

# Production build
pnpm run build
```

---

## License

[MIT](LICENSE) © SudhuCodes
