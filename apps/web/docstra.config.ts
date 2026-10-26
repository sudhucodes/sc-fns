import { defineDocstraConfig } from "docstra/mdx";

export default defineDocstraConfig({
    collections: {
        docs: "../../docs",
    },
    editOnGithub: {
        repo: "sc-fns",
        owner: "sudhucodes",
        path: "docs",
        branch: "main",
    },
    feedback: {
        formSyncBaseURL: "https://api.formsync.sudhucodes.com",
        enabled: true,
        formSyncFormID: "<form-sync-form-id>",
    },
    navbar: {
        logo: {
            link: "/",
            src: "/brand/logo.svg",
            alt: "sc-fns",
            className: "h-8 w-auto",
        },
        links: [
            { name: "Overview", href: "/docs" },
            { name: "Quick Start", href: "/docs/getting-started/installation" },
            { name: "Modules", href: "/docs/modules/string" },
            { name: "Guides", href: "/docs/guides/best-practices" },
        ],
    },
});
