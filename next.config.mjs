/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Forces static HTML export (No SSR, No APIs)
  reactStrictMode: true,
};

export default nextConfig;
