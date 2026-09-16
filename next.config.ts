import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'umrah.azmy.aait-d.com',
      },
      {
        protocol: 'https',
        hostname: 'umrah.azmy.aait-d.com',
      },
      {
        protocol: 'http',
        hostname: 'umrah.backend.aait-d.com',
      },
      {
        protocol: 'https',
        hostname: 'umrah.backend.aait-d.com',
      }
    ],
  },
};

export default withNextIntl(nextConfig);
