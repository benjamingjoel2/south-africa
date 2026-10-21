import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The whole stylesheet is ~9 KB, so inlining it removes a render-blocking request.
  experimental: { inlineCss: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
    // Unsplash URLs are immutable, so optimised variants can be cached for a year.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default nextConfig;
