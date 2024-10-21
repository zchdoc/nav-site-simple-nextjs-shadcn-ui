/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {unoptimized: true},
  async rewrites() {
    // a2.4000063966.com:81  127.0.0.1:8081
    const serverUrl = 'http' + '://' + '127.0.0.1:8081';
    const serverUrlA3 = 'http' + '://' + '127.0.0.1:8081';
    return [
      {
        source: "/api/a2/iclock/attDataCustom",
        destination: serverUrl + "/iclock/attDataCustom",
      },
      {
        source: "/api/a2/:path*",
        destination: serverUrl + "/xb/zk/:path*",
      },
      {
        source: "/api/a3/:path*",
        destination: serverUrlA3 + "/xb/zk/:path*",
      },
    ]
  },
}
module.exports = nextConfig
