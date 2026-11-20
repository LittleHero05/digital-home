import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    // Substack post covers, shown on the blog page.
    remotePatterns: [
      { protocol: "https", hostname: "substack-post-media.s3.amazonaws.com" },
      { protocol: "https", hostname: "substackcdn.com" },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
