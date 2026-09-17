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
        protocol: 'https',
        hostname: 'img.freepik.com',
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
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'date-fns'],
  },
};

export default withNextIntl(nextConfig);
