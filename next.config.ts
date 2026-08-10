// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/.ComSolutions', // This tells it to expect the GitHub Pages URL structure
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js image optimization servers
  },
};

export default nextConfig;
