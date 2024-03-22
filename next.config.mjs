/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_URL: process.env.SERVER_URL,
        DB_STORAGE_URL: process.env.DB_STORAGE_URL,
        NEXT_PUBLIC_SUPABASE_BUCKET: process.env.NEXT_PUBLIC_SUPABASE_BUCKET,
        UPSTASH_REDIS_KEY: process.env.UPSTASH_REDIS_KEY,
        UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
    },
    experimental: { optimisticClientCache: false, }
};

export default nextConfig;
