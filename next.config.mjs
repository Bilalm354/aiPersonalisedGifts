/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "images-api.printify.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
};

export default nextConfig;
