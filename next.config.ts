import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "300mb", // Increase to 10 MB (default is 1 MB)
    },
  },
  /* config options here */
};

export default nextConfig;
