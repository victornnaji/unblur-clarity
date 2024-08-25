/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "replicate.deliver",
        port: "",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
