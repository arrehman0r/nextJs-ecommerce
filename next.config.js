// next.config.js
module.exports = {
    basePath: '',
    trailingSlash: true,
    images: {
        domains: ['user-images.githubusercontent.com', "admin.partyshope.com","cms.partyshope.com"],
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