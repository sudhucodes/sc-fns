import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        "string/index": "src/string/index.ts",
        "id/index": "src/id/index.ts",
        "array/index": "src/array/index.ts",
        "number/index": "src/number/index.ts",
        "object/index": "src/object/index.ts",
        "date/index": "src/date/index.ts",
        "validation/index": "src/validation/index.ts",
        "url/index": "src/url/index.ts",
        "common/index": "src/common/index.ts",
        "file/index": "src/file/index.ts",
        "browser/index": "src/browser/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    splitting: false,
    sourcemap: false,
    minify: false,
    treeshake: true,
});
