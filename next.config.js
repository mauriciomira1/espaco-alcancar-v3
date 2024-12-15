/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// filepath: next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({});

module.exports = nextConfig;
