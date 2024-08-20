/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['m.media-amazon.com']
    },
    async rewrites() {
        return [
            {
                source: '/api/movies/:path*',
                destination: 'http://localhost:8080/movies/:path*',
            },
        ];
    },
};

export default nextConfig;
