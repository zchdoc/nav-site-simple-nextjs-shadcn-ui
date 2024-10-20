/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: '/api/a2/:path*',
        destination: 'https://a2.4000063966.com:8443/xb/zk/:path*',
      },
      {
        source: '/api/a3/:path*',
        destination: 'https://a3.4000063966.com:8443/xb/zk/:path*',
      },
    ];
  },
};

module.exports = nextConfig;