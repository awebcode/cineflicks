import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "300mb", // Increase to 300 MB
    },
  },

  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Remove the invalid 'api' configuration
};

export default nextConfig;
