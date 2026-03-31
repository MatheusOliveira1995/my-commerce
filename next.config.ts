import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products/page/1",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/products/page/1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
