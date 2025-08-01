/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /pdf\.worker\.min\.js$/,
      use: [
        {
          loader: "worker-loader",
          options: {
            filename: "static/pdf.worker.js",
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
