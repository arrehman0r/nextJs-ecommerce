// next.config.js
module.exports = {
    basePath: '',
    trailingSlash: true,
    images: {
        domains: ['user-images.githubusercontent.com', "admin.partyshope.com"],
    },
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap',
            },
        ];
    },
}