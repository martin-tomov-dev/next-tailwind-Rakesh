const baseURL = new URL(":path*", process.env.API_BASE_PATH);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: baseURL.href, // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
