# Deployment script for NextQuest site to dangervalentine.github.io
# Run this from the nextquest-site directory

Write-Host "🚀 Deploying NextQuest site to GitHub Pages" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "next.config.js")) {
    Write-Host "❌ Error: next.config.js not found. Please run this from the nextquest-site directory." -ForegroundColor Red
    exit 1
}

# Initialize git if needed
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Set up remote
$remoteUrl = git remote get-url origin 2>$null
if ($remoteUrl) {
    if ($remoteUrl -ne "https://github.com/dangervalentine/dangervalentine.github.io.git") {
        Write-Host "🔗 Updating remote URL..." -ForegroundColor Yellow
        git remote set-url origin https://github.com/dangervalentine/dangervalentine.github.io.git
    }
    else {
        Write-Host "✅ Remote already configured correctly" -ForegroundColor Green
    }
}
else {
    Write-Host "🔗 Adding remote repository..." -ForegroundColor Yellow
    git remote add origin https://github.com/dangervalentine/dangervalentine.github.io.git
}

# Verify basePath is not set
$configContent = Get-Content next.config.js -Raw
if ($configContent -match "^\s*basePath:" -and $configContent -notmatch "//\s*basePath:") {
    Write-Host "⚠️  WARNING: basePath is uncommented in next.config.js" -ForegroundColor Red
    Write-Host "   For username.github.io, basePath should be commented out!" -ForegroundColor Red
    Write-Host "   Please edit next.config.js and comment out the basePath line" -ForegroundColor Red
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit 1
    }
}
else {
    Write-Host "✅ next.config.js is correctly configured" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Staging files..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "📋 Files to commit:" -ForegroundColor Cyan
git status --short

Write-Host ""
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Deploy NextQuest marketing site"
}

Write-Host ""
Write-Host "💾 Creating commit..." -ForegroundColor Yellow
git commit -m $commitMessage

Write-Host ""
Write-Host "🌿 Setting branch to main..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "   (You may be prompted for credentials)" -ForegroundColor Gray
git push -u origin main

Write-Host ""
Write-Host "✅ Push complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/dangervalentine/dangervalentine.github.io/settings/pages" -ForegroundColor White
Write-Host "2. Under 'Source', select 'GitHub Actions'" -ForegroundColor White
Write-Host "3. Save the settings" -ForegroundColor White
Write-Host "4. Check the Actions tab to see the deployment progress" -ForegroundColor White
Write-Host ""
Write-Host "Your site will be live at: https://dangervalentine.github.io" -ForegroundColor Green
