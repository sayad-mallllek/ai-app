import { dirname } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        PROJECT_ROOT: dirname
    }
};

export default nextConfig;