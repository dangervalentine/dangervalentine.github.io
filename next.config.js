/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // If deploying to GitHub Pages subdirectory (e.g., /repo-name), uncomment and set:
    // basePath: '/repo-name',
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
