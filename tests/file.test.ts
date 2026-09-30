import { describe, it, expect } from "vitest";
import {
    getFileExtension,
    getFileName,
    formatFileSize,
    isImage,
    isVideo,
    isPDF,
} from "../src/file";

describe("file utilities", () => {
    describe("getFileExtension", () => {
        it("extracts file extension in lowercase", () => {
            expect(getFileExtension("photo.JPEG")).toBe("jpeg");
            expect(getFileExtension("/path/to/script.min.js")).toBe("js");
            expect(getFileExtension("archive.tar.gz")).toBe("gz");
            expect(getFileExtension("https://example.com/asset.png?v=123#hash")).toBe("png");
        });

        it("handles files without extension or dotfiles", () => {
            expect(getFileExtension("README")).toBe("");
            expect(getFileExtension(".gitignore")).toBe("");
            expect(getFileExtension("/folder/subfolder/")).toBe("");
            expect(getFileExtension("")).toBe("");
        });
    });

    describe("getFileName", () => {
        it("extracts file name with extension", () => {
            expect(getFileName("/docs/reports/annual-2025.pdf")).toBe("annual-2025.pdf");
            expect(getFileName("C:\\Users\\User\\archive.zip")).toBe("archive.zip");
            expect(getFileName("https://example.com/images/avatar.png?v=2")).toBe("avatar.png");
        });

        it("extracts file name without extension", () => {
            expect(getFileName("/docs/reports/annual-2025.pdf", false)).toBe("annual-2025");
            expect(getFileName("image.png", false)).toBe("image");
            expect(getFileName("README", false)).toBe("README");
            expect(getFileName(".gitignore", false)).toBe(".gitignore");
        });

        it("handles empty input", () => {
            expect(getFileName("")).toBe("");
        });
    });

    describe("formatFileSize", () => {
        it("formats byte sizes to human-readable strings", () => {
            expect(formatFileSize(0)).toBe("0 B");
            expect(formatFileSize(500)).toBe("500 B");
            expect(formatFileSize(1024)).toBe("1 KB");
            expect(formatFileSize(1536)).toBe("1.5 KB");
            expect(formatFileSize(1024 * 1024)).toBe("1 MB");
            expect(formatFileSize(1024 * 1024 * 1024)).toBe("1 GB");
            expect(formatFileSize(1024 * 1024 * 1024 * 1024)).toBe("1 TB");
        });

        it("handles negative and NaN values", () => {
            expect(formatFileSize(-100)).toBe("0 B");
            expect(formatFileSize(NaN)).toBe("0 B");
        });
    });

    describe("isImage", () => {
        it("identifies image files and mime types", () => {
            expect(isImage("photo.jpg")).toBe(true);
            expect(isImage("avatar.png")).toBe(true);
            expect(isImage("graphic.svg")).toBe(true);
            expect(isImage("image/webp")).toBe(true);
            expect(isImage("webp")).toBe(true);
        });

        it("rejects non-images", () => {
            expect(isImage("document.pdf")).toBe(false);
            expect(isImage("movie.mp4")).toBe(false);
            expect(isImage("")).toBe(false);
        });
    });

    describe("isVideo", () => {
        it("identifies video files and mime types", () => {
            expect(isVideo("clip.mp4")).toBe(true);
            expect(isVideo("video.webm")).toBe(true);
            expect(isVideo("movie.mkv")).toBe(true);
            expect(isVideo("video/quicktime")).toBe(true);
        });

        it("rejects non-videos", () => {
            expect(isVideo("sound.mp3")).toBe(false);
            expect(isVideo("photo.png")).toBe(false);
            expect(isVideo("")).toBe(false);
        });
    });

    describe("isPDF", () => {
        it("identifies PDF files and mime types", () => {
            expect(isPDF("contract.pdf")).toBe(true);
            expect(isPDF("application/pdf")).toBe(true);
            expect(isPDF("pdf")).toBe(true);
        });

        it("rejects non-PDFs", () => {
            expect(isPDF("document.docx")).toBe(false);
            expect(isPDF("image.png")).toBe(false);
            expect(isPDF("")).toBe(false);
        });
    });
});
