import type { NextConfig } from "next";

const backendBase = (
  process.env.BACKEND_API_BASE_URL ?? "http://localhost:8080"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/spring-api/:path*",
        destination: `${backendBase}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
