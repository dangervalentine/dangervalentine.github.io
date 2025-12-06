#!/bin/bash

# Setup script for deploying to dangervalentine.github.io
# This script helps set up the repository for GitHub Pages deployment

echo "🚀 Setting up NextQuest site for GitHub Pages deployment"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Check if remote exists
if git remote get-url origin &>/dev/null; then
    echo "🔗 Updating remote URL..."
    git remote set-url origin https://github.com/dangervalentine/dangervalentine.github.io.git
else
    echo "🔗 Adding remote repository..."
    git remote add origin https://github.com/dangervalentine/dangervalentine.github.io.git
fi

# Verify next.config.js doesn't have basePath set
if grep -q "basePath:" next.config.js && ! grep -q "// basePath:" next.config.js; then
    echo "⚠️  Warning: basePath is set in next.config.js"
    echo "   For username.github.io, basePath should be commented out"
    echo "   Please check next.config.js"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add and commit your files:"
echo "   git add ."
echo "   git commit -m 'Initial commit: NextQuest marketing site'"
echo ""
echo "2. Push to GitHub:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to https://github.com/dangervalentine/dangervalentine.github.io/settings/pages"
echo "   - Under 'Source', select 'GitHub Actions'"
echo ""
echo "4. Your site will be live at: https://dangervalentine.github.io"

