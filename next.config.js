/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: false,
    serverActions: true
  },
  images: {
    domains: ['robohash.org'],
  }
}

module.exports = nextConfig