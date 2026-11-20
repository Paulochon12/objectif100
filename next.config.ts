import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Page 404 commune : le site a deux mises en page racine (français et anglais).
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      { source: "/suivi", destination: "/suivi/histoire", permanent: false },
      { source: "/en/suivi", destination: "/en/suivi/histoire", permanent: false },
    ];
  },
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
