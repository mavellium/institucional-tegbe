import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaaddtqd6pehgldz.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      // Adicionei este aqui também por segurança, caso a API use o domínio raiz
      {
        protocol: 'https',
        hostname: 'public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Esse é o túnel que evita o CORS/NetworkError
        source: '/api-tegbe/:path*',
        destination: 'https://tegbe-dashboard.vercel.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;