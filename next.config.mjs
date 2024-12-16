/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['mui-tel-input'],
    eslint: {
        ignoreDuringBuilds: true,
    },
    
};


export default nextConfig;