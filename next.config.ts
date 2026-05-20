import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "cakrivfwiwmormnfpdyi.supabase.co",
      },
    ],
  },
};

export default nextConfig;
