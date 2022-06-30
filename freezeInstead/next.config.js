/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  webpack(config) {
    // we depend on nextjs switching to webpack 4 by default. Probably they will
    // change this behavior at some future major version.
    config.node = {
      fs: "empty", // webpack4 era solution
    };

    return config;
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
