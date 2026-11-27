import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  async redirects() {
    // Bin cleaning and junk removal were discontinued in Nov 2026; send their old search traffic to the core service.
    return [
      { source: "/bin-cleaning", destination: "/can-to-curb", permanent: true },
      { source: "/junk-removal", destination: "/can-to-curb", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
