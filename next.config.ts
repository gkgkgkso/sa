import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'your-s3-bucket.s3.ap-northeast-2.amazonaws.com',
      'localhost'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  }
};

export default nextConfig;
