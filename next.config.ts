/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn-images.dzcdn.net',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/deezer/:path*',
                destination: 'https://api.deezer.com/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
