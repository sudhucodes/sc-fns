export interface SlugifyOptions {
    /**
     * Character used to replace whitespace and special characters.
     * @default "-"
     */
    separator?: string;
    /**
     * Whether to convert the string to lower case.
     * @default true
     */
    lowercase?: boolean;
    /**
     * Whether to preserve leading/trailing separator.
     * @default false
     */
    preserveLeadingTrailing?: boolean;
}

/**
 * Converts a string into a URL-friendly slug.
 * Normalizes Unicode diacritics, removes non-alphanumeric characters, and collapses separators.
 *
 * @param text - The string to convert.
 * @param options - Configuration options for separator and casing.
 * @returns The slugified string.
 *
 * @example
 * ```ts
 * slugify("Hello World!"); // "hello-world"
 * slugify("Déjà Vu", { separator: "_" }); // "deja_vu"
 * ```
 */
export function slugify(text: string, options: SlugifyOptions = {}): string {
    if (!text) return "";

    const { separator = "-", lowercase = true, preserveLeadingTrailing = false } = options;

    let result = text
        .normalize("NFKD") // split accented characters into base letters + diacritic marks
        .replace(/[\u0300-\u036f]/g, ""); // remove accents

    if (lowercase) {
        result = result.toLowerCase();
    }

    // Replace invalid characters with separator
    // Keep letters, digits, and underscores
    result = result.replace(/[^a-zA-Z0-9_-]+/g, separator);

    // Collapse consecutive separators
    if (separator) {
        const escapedSep = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regexMulti = new RegExp(`(?:${escapedSep})+`, "g");
        result = result.replace(regexMulti, separator);

        if (!preserveLeadingTrailing) {
            const regexTrim = new RegExp(`^${escapedSep}+|${escapedSep}+$`, "g");
            result = result.replace(regexTrim, "");
        }
    }

    return result;
}
