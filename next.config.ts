import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> deploys to GitHub Pages, keeps SEO + the .github.io URL.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
