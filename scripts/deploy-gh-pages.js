#!/usr/bin/env node

/**
 * Helper script to deploy Next.js static export to GitHub Pages
 *
 * Usage:
 *   node scripts/deploy-gh-pages.js [repo-name]
 *
 * If repo-name is provided, it will update next.config.js with the basePath
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoName = process.argv[2];

if (repoName) {
    console.log(`Setting basePath to /${repoName}...`);

    const configPath = path.join(process.cwd(), 'next.config.js');
    let config = fs.readFileSync(configPath, 'utf8');

    // Check if basePath already exists
    if (config.includes('basePath:')) {
        config = config.replace(/basePath:\s*['"][^'"]*['"],?/g, `basePath: '/${repoName}',`);
    } else {
        // Add basePath after output
        config = config.replace(
            /output:\s*['"]export['"],/,
            `output: 'export',\n    basePath: '/${repoName}',`
        );
    }

    fs.writeFileSync(configPath, config);
    console.log('✓ Updated next.config.js');
}

console.log('\nBuilding site...');
execSync('npm run build', { stdio: 'inherit' });

console.log('\n✓ Build complete! Static files are in the out/ directory.');
console.log('\nTo deploy:');
console.log('  1. Push your code to GitHub');
console.log('  2. Enable GitHub Pages in repository settings');
console.log('  3. Select "GitHub Actions" as the source');
console.log('\nOr use gh-pages CLI:');
console.log('  npm install -g gh-pages');
console.log('  gh-pages -d out');
