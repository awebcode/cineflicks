import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: 300 * 1024 * 1024, // Increase to 10 MB (default is 1 MB)
    },
  },
  /* config options here */
};

export default nextConfig;
