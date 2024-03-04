/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_URL: process.env.SERVER_URL,
        DB_STORAGE_URL: process.env.DB_STORAGE_URL,
    }
};

export default nextConfig;
