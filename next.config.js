/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: "/api/a2/:path*",
        destination: "http://a2.4000063966.com:81/xb/zk/:path*",
      },
      {
        source: "/api/a3/:path*",
        destination: "http://a3c.4000063966.com/xb/zk/:path*",
      },
    ]
  },
}

module.exports = nextConfig
