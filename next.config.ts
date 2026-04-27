import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 90],
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

      {
        protocol: 'https',
        hostname: 'tegbe-cdn.b-cdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "tegbe-cdn.b-cdn.net",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Esse é o túnel que evita o CORS/NetworkError
        source: '/api-tegbe/:path*',
        destination: 'https://janus.mavellium.com.br/api/:path*',
      },
    ];
  },
};

export default nextConfig;