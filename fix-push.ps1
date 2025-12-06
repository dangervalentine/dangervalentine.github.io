# Quick fix script for push conflicts
# This helps resolve the "remote contains work" error

Write-Host "🔧 Fixing push conflict..." -ForegroundColor Cyan
Write-Host ""

Write-Host "The remote repository has content that doesn't exist locally." -ForegroundColor Yellow
Write-Host ""

Write-Host "Option 1: Pull and merge (keeps existing content)" -ForegroundColor Cyan
Write-Host "Option 2: Force push (replaces everything with your local version)" -ForegroundColor Cyan
Write-Host ""

$choice = Read-Host "Choose option (1 or 2)"

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "📥 Pulling and merging..." -ForegroundColor Yellow
    git pull origin main --allow-unrelated-histories --no-edit

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Merge successful!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📤 Pushing merged changes..." -ForegroundColor Yellow
        git push origin main
        Write-Host "✅ Done!" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️  Merge conflicts detected!" -ForegroundColor Red
        Write-Host "   Please resolve conflicts manually, then:" -ForegroundColor Yellow
        Write-Host "   git add ." -ForegroundColor White
        Write-Host "   git commit" -ForegroundColor White
        Write-Host "   git push origin main" -ForegroundColor White
    }
}
elseif ($choice -eq "2") {
    Write-Host ""
    Write-Host "⚠️  WARNING: This will DELETE all existing content on the remote!" -ForegroundColor Red
    Write-Host "   The remote repository will be replaced with your local version." -ForegroundColor Red
    Write-Host ""
    $confirm = Read-Host "Type 'yes' to force push (overwrite remote)"

    if ($confirm -eq "yes") {
        Write-Host ""
        Write-Host "📤 Force pushing..." -ForegroundColor Yellow
        git push -u origin main --force
        Write-Host "✅ Force push complete!" -ForegroundColor Green
    }
    else {
        Write-Host "❌ Cancelled" -ForegroundColor Yellow
    }
}
else {
    Write-Host "❌ Invalid choice" -ForegroundColor Red
}

