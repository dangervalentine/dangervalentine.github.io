# PowerShell script for setting up GitHub Pages deployment
# Run this from the nextquest-site directory

Write-Host "🚀 Setting up NextQuest site for GitHub Pages deployment" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Check if remote exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "🔗 Updating remote URL..." -ForegroundColor Yellow
    git remote set-url origin https://github.com/dangervalentine/dangervalentine.github.io.git
}
else {
    Write-Host "🔗 Adding remote repository..." -ForegroundColor Yellow
    git remote add origin https://github.com/dangervalentine/dangervalentine.github.io.git
}

# Verify next.config.js doesn't have basePath set
$configContent = Get-Content next.config.js -Raw
if ($configContent -match "basePath:\s*['\`"]" -and $configContent -notmatch "//\s*basePath:") {
    Write-Host "⚠️  Warning: basePath is set in next.config.js" -ForegroundColor Red
    Write-Host "   For username.github.io, basePath should be commented out" -ForegroundColor Red
    Write-Host "   Please check next.config.js" -ForegroundColor Red
}
else {
    Write-Host "✅ next.config.js is correctly configured (no basePath)" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Add and commit your files:"
Write-Host "   git add ."
Write-Host "   git commit -m 'Initial commit: NextQuest marketing site'"
Write-Host ""
Write-Host "2. Push to GitHub:"
Write-Host "   git branch -M main"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "3. Enable GitHub Pages:"
Write-Host "   - Go to https://github.com/dangervalentine/dangervalentine.github.io/settings/pages"
Write-Host "   - Under 'Source', select 'GitHub Actions'"
Write-Host ""
Write-Host "4. Your site will be live at: https://dangervalentine.github.io" -ForegroundColor Green
