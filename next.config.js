// next.config.js
module.exports = {
    basePath: '',
    trailingSlash: true,
    
    // Performance optimizations
    swcMinify: true, // Use SWC for faster minification
    
    // Compile modern JavaScript for smaller bundles
    compiler: {
        // Remove console.log in production
        removeConsole: process.env.NODE_ENV === 'production',
    },
    
    images: {
        domains: ['user-images.githubusercontent.com', "admin.partyshope.com", "cms.partyshope.com"],
        // Optimize image loading
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
        formats: ['image/webp', 'image/avif'],
    },
    
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap',
            },
            // Proxy WooCommerce API requests to avoid CORS issues
            {
                source: '/api/wc/:path*',
                destination: 'https://cms.partyshope.com/wp-json/wc/v3/:path*',
            },
        ];
    },
}