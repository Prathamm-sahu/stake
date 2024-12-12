/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "probo.in"
      },
      {
        protocol: "https",
        hostname: "probo.gumlet.io"
      }
    ]
  }
};

export default nextConfig;
