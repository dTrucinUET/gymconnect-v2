/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    // experimental: {
    //   appDir: true, 
    // },
    reactStrictMode: true,
    async rewrites() {
      return [
        {
            source: '/api/v1/:path*',
            destination: 'http://localhost:8080/api/v1/:path*', 
        },
      ];
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
};

export default nextConfig;