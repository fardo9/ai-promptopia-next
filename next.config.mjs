import path from 'path'
import { fileURLToPath } from 'url'

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // appDir: true,
        serverComponentsExternalPackages: ['mongoose'],
        // dangerouslyAllowHtmlAttributes: true,
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    webpack: config => {
        const __dirname = path.dirname(fileURLToPath(import.meta.url))
        config.resolve.alias['@'] = path.resolve(__dirname)
        return config
    },
    async headers() {
        return [
            {
                source: '/assets/images/:path*', // Adjust this to match your image path
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                    {
                        key: 'Content-Type',
                        value: 'image/png', // Adjust according to your image type
                    },
                ],
            },
        ]
    },
}

export default nextConfig
