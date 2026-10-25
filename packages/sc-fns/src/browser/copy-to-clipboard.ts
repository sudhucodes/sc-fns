/**
 * Copies a given text string to the system clipboard.
 * Uses the modern `navigator.clipboard.writeText` API when available,
 * falling back to `document.execCommand('copy')` in older browser environments.
 *
 * @param text - The text to copy to the clipboard.
 * @returns A promise resolving to `true` if copying succeeded, `false` otherwise.
 *
 * @example
 * ```ts
 * const success = await copyToClipboard("Hello, world!");
 * if (success) {
 *   console.log("Copied to clipboard!");
 * }
 * ```
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    if (typeof text !== "string") return false;

    // Modern Async Clipboard API
    if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
    ) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // Fall through to fallback method if permission denied or unsupported
        }
    }

    // Fallback for older browsers or insecure contexts
    if (typeof document !== "undefined" && typeof document.createElement === "function") {
        try {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.top = "0";
            textarea.style.left = "0";
            textarea.style.width = "2em";
            textarea.style.height = "2em";
            textarea.style.padding = "0";
            textarea.style.border = "none";
            textarea.style.outline = "none";
            textarea.style.boxShadow = "none";
            textarea.style.background = "transparent";
            textarea.setAttribute("readonly", "");

            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);

            const successful = document.execCommand("copy");
            document.body.removeChild(textarea);
            return successful;
        } catch {
            return false;
        }
    }

    return false;
}
