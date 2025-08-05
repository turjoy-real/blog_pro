const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "strapi-cms-tj.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "strapi-cms-tj.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cms.turjoysaha.com",
        pathname: "/uploads/**",
      },
    ],
  },
  optimizeFonts: false,
  reactStrictMode: true,
  experimental: { optimizeCss: true },
  transpilePackages: ["next-mdx-remote"],
};

// module.exports = withBundleAnalyzer(nextConfig);

module.exports = nextConfig;

// module.exports = withCss(withPurgeCss(nextConfig));
