export type UUIDVersion = 1 | 2 | 3 | 4 | 5 | "all";

const UUID_PATTERNS: Record<UUIDVersion, RegExp> = {
    1: /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    2: /^[0-9a-f]{8}-[0-9a-f]{4}-2[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    3: /^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    5: /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    all: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
};

/**
 * Validates whether a string is a valid RFC 4122 UUID.
 *
 * @param value - The value to test.
 * @param version - The specific UUID version to validate against (defaults to "all").
 * @returns `true` if valid UUID, `false` otherwise.
 *
 * @example
 * ```ts
 * isUUID("123e4567-e89b-12d3-a456-426614174000"); // true
 * isUUID("not-a-uuid"); // false
 * ```
 */
export function isUUID(value: unknown, version: UUIDVersion = "all"): value is string {
    if (typeof value !== "string") return false;
    const pattern = UUID_PATTERNS[version] ?? UUID_PATTERNS.all;
    return pattern.test(value);
}
