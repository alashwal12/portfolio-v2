import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
    },
    serverExternalPackages: ['@prisma/client', 'prisma'],
};

export default nextConfig;
