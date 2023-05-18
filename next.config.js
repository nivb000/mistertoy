/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true
  },
  images: {
    domains: ['robohash.org'],
  }
}

module.exports = nextConfig