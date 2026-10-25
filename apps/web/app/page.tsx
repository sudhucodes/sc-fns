"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [copied, setCopied] = useState(false);
    const installCmd = "pnpm add sc-fns";

    const handleCopy = () => {
        navigator.clipboard.writeText(installCmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const modules = [
        {
            name: "sc-fns/string",
            desc: "slugify, capitalize, maskString, truncate, whitespace helpers",
            href: "/docs/modules/string",
        },
        {
            name: "sc-fns/id",
            desc: "generateUUID, generateShortId, generateOTP, random helpers",
            href: "/docs/modules/id",
        },
        {
            name: "sc-fns/array",
            desc: "shuffleArray, chunkArray, uniqueArray, groupBy, flattenArray",
            href: "/docs/modules/array",
        },
        {
            name: "sc-fns/number",
            desc: "clamp, formatNumber, roundTo, percentage, parity guards",
            href: "/docs/modules/number",
        },
        {
            name: "sc-fns/object",
            desc: "pick, omit, deepClone, deepMerge, removeUndefined, isEmpty",
            href: "/docs/modules/object",
        },
        {
            name: "sc-fns/date",
            desc: "formatDate, formatRelativeTime, addDays, isToday, date diffs",
            href: "/docs/modules/date",
        },
        {
            name: "sc-fns/validation",
            desc: "isEmail, isURL, isUUID, isJSON, runtime type guards",
            href: "/docs/modules/validation",
        },
        {
            name: "sc-fns/url",
            desc: "buildURL, addQueryParams, removeQueryParam, getDomain, getPath",
            href: "/docs/modules/url",
        },
        {
            name: "sc-fns/common",
            desc: "debounce, throttle, retry, timeout, sleep, once, noop",
            href: "/docs/modules/common",
        },
        {
            name: "sc-fns/file",
            desc: "formatFileSize, getFileExtension, isImage, isPDF, isVideo",
            href: "/docs/modules/file",
        },
        {
            name: "sc-fns/browser",
            desc: "copyToClipboard, getCookie, setCookie, deleteCookie",
            href: "/docs/modules/browser",
        },
    ];

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased flex flex-col justify-between">
            {/* Top Navigation */}
            <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.svg"
                                alt="sc-fns"
                                width={105}
                                height={28}
                                priority
                                className="h-6 w-auto"
                            />
                        </Link>
                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded border border-zinc-200 bg-zinc-50 text-zinc-600">
                            v0.0.1
                        </span>
                    </div>

                    <nav className="flex items-center gap-5 text-sm">
                        <Link
                            href="/docs"
                            className="text-zinc-600 hover:text-zinc-900 transition-colors"
                        >
                            Docs
                        </Link>
                        <Link
                            href="/docs/modules/string"
                            className="text-zinc-600 hover:text-zinc-900 transition-colors"
                        >
                            Modules
                        </Link>
                        <a
                            href="https://github.com/sudhucodes/sc-fns"
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-600 hover:text-zinc-900 transition-colors"
                        >
                            GitHub
                        </a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 pt-16 pb-20 w-full flex-1">
                {/* Hero Section */}
                <section className="mb-14">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 mb-3">
                        Standard utilities for TypeScript.
                    </h1>
                    <p className="text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed mb-6">
                        Zero runtime dependencies. Tree-shakeable subpath imports. Pure functions
                        with strict type definitions.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Terminal Install Box */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-200 bg-zinc-50 font-mono text-xs text-zinc-700">
                            <span className="text-zinc-400 select-none">$</span>
                            <span>{installCmd}</span>
                            <button
                                onClick={handleCopy}
                                className="ml-1 text-[11px] text-zinc-500 hover:text-zinc-900 transition-colors"
                                aria-label="Copy installation command"
                            >
                                {copied ? "copied" : "copy"}
                            </button>
                        </div>

                        <Link
                            href="/docs"
                            className="px-3.5 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition"
                        >
                            Read Documentation →
                        </Link>
                    </div>
                </section>

                {/* Code Example Preview */}
                <section className="mb-16">
                    <div className="rounded-lg border border-zinc-200 bg-zinc-50/70 overflow-hidden text-xs font-mono">
                        <div className="px-4 py-2 border-b border-zinc-200/80 bg-zinc-100/60 text-zinc-500 flex items-center justify-between text-[11px]">
                            <span>example.ts</span>
                            <span className="text-zinc-400">TypeScript</span>
                        </div>
                        <pre className="p-4 text-zinc-800 leading-relaxed overflow-x-auto">
                            <code>{`import { slugify } from "sc-fns/string";
import { generateUUID } from "sc-fns/id";
import { chunkArray } from "sc-fns/array";
import { formatDate } from "sc-fns/date";

const slug = slugify("TypeScript Utility Library"); // "typescript-utility-library"
const id = generateUUID();                          // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
const chunks = chunkArray([1, 2, 3, 4], 2);        // [[1, 2], [3, 4]]
const today = formatDate(new Date(), "YYYY-MM-DD"); // "2026-03-15"`}</code>
                        </pre>
                    </div>
                </section>

                {/* Key Properties */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 border-y border-zinc-200/80 py-8">
                    <div>
                        <h2 className="text-sm font-semibold text-zinc-900 mb-1">0 Dependencies</h2>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                            No external runtime packages. Zero supply-chain risk and zero transitive
                            dependency bloat.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-zinc-900 mb-1">
                            Subpath Imports
                        </h2>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                            Direct entry points for each module. Your bundler only ships the code
                            your app actually calls.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-zinc-900 mb-1">Strict Types</h2>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                            Written natively in strict TypeScript. Built-in declaration maps with
                            precise generics.
                        </p>
                    </div>
                </section>

                {/* Modules Directory */}
                <section>
                    <div className="flex items-baseline justify-between mb-4">
                        <h2 className="text-sm font-semibold text-zinc-900">Modules</h2>
                        <Link
                            href="/docs/modules/string"
                            className="text-xs text-zinc-500 hover:text-zinc-900"
                        >
                            View full reference →
                        </Link>
                    </div>

                    <div className="divide-y divide-zinc-200/80 border-y border-zinc-200/80">
                        {modules.map((m) => (
                            <Link
                                key={m.name}
                                href={m.href}
                                className="py-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-zinc-50 -mx-2 rounded transition group"
                            >
                                <span className="font-mono text-xs font-medium text-zinc-900 group-hover:text-black">
                                    {m.name}
                                </span>
                                <span className="text-xs text-zinc-500 font-mono truncate max-w-md">
                                    {m.desc}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            {/* Clean Footer */}
            <footer className="border-t border-zinc-200/80 bg-white py-6">
                <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
                    <p>MIT License • © SudhuCodes</p>
                    <div className="flex items-center gap-4">
                        <Link href="/docs" className="hover:text-zinc-800 transition">
                            Documentation
                        </Link>
                        <Link href="/docs/help" className="hover:text-zinc-800 transition">
                            Help &amp; Issues
                        </Link>
                        <a
                            href="https://github.com/sudhucodes/sc-fns"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-zinc-800 transition"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
