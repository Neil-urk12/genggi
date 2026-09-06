import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/u/:username",
                destination: "/:username",
                permanent: true,
            },
        ];
    },

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin-allow-popups",
                    },
                ],
            },
        ];
    },

    experimental: {
        serverActions: {
            bodySizeLimit: "4mb",
            // The production site is served through a proxy that can report a
            // different host to Next.js than the browser's public origin.
            allowedOrigins: ["genggi.com", "www.genggi.com"],
        },
    },
};

export default nextConfig;
