import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cursor port-forward / local preview hosts to load Next.js assets in dev.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
