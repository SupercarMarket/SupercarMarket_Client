const { withPlaiceholder } = require('@plaiceholder/next');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      pure: true,
      fileName: true,
    },
  },
  images: {
    domains: [
      'user-images.githubusercontent.com',
      'supercarmarket-bucket.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  experimental: {
    esmExternals: false,
  },
  async rewrites() {
    return [
      {
        source: '/server/:path*',
        destination: 'https://server/:path*',
      },
    ];
  },
  webpack(config, { dev, isServer }) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    if (!dev) config.devtool = isServer ? false : 'nosources-source-map';
    if (!isServer) config.resolve.fallback = { fs: false };

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      plugins,
    };
  },
};

module.exports = withPlaiceholder(nextConfig);
