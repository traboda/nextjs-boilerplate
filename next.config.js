/** @type {import('next').NextConfig} */

const SecurityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
];

const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  optimizeFonts: false,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: SecurityHeaders
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/signin',
        destination: '/login',
        permanent: true
      }
    ];
  }
}

module.exports = nextConfig
