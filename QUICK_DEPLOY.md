# Quick Deploy to dangervalentine.github.io

## One-Time Setup

Run these commands in the `nextquest-site` directory:

```powershell
# 1. Initialize git (if not already done)
git init

# 2. Add the remote repository
git remote add origin https://github.com/dangervalentine/dangervalentine.github.io.git
# OR if remote already exists:
git remote set-url origin https://github.com/dangervalentine/dangervalentine.github.io.git

# 3. Add all files
git add .

# 4. Create initial commit
git commit -m "Initial commit: NextQuest marketing site"

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

## Enable GitHub Pages

1. Go to: https://github.com/dangervalentine/dangervalentine.github.io/settings/pages
2. Under **Source**, select **GitHub Actions**
3. Save the settings

## Your Site Will Be Live At

**https://dangervalentine.github.io**

The GitHub Actions workflow will automatically build and deploy your site.

## Future Updates

Whenever you make changes, just:

```powershell
git add .
git commit -m "Update site"
git push origin main
```

The site will automatically rebuild and redeploy!
