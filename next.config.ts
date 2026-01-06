import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaaddtqd6pehgldz.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**', // Libera qualquer caminho dentro deste bucket
      },
    ],
  },
};

export default nextConfig;