// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Permet l'affichage des images locales via ReactMarkdown
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
