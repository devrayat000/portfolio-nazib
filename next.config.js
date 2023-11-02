/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "media.graphassets.com" },
      { hostname: "i.ytimg.com" },
    ],
  },
};

module.exports = nextConfig;
