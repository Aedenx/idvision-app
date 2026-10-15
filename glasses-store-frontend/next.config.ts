import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/idvision/backend/uploads/products/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/idvision/backend/uploads/products/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
