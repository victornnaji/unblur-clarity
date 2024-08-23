/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "replicate.deliver",
      "replicate.delivery",
    ],
  },
};

module.exports = nextConfig;
