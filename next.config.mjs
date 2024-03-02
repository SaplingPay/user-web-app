/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PROXY_URL: process.env.PROXY_URL,
    }
};

export default nextConfig;
