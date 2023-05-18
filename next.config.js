/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    serverActions: true
  },
  images: {
    domains: ['robohash.org'],
  }
}

module.exports = nextConfig