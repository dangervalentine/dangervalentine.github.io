# Enable GitHub Pages - Step by Step

Your code is pushed, but GitHub Pages needs to be configured to serve the built site instead of just the README.

## Steps to Enable GitHub Pages

1. **Go to your repository settings:**
   - Visit: https://github.com/dangervalentine/dangervalentine.github.io
   - Click on **Settings** (top menu bar)

2. **Navigate to Pages:**
   - In the left sidebar, scroll down and click **Pages**

3. **Configure the Source:**
   - Under **Source**, you'll see a dropdown
   - **IMPORTANT**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - This tells GitHub to use the workflow to build and deploy your site

4. **Save:**
   - Click **Save** (if there's a save button)

5. **Check the Actions tab:**
   - Go to the **Actions** tab in your repository
   - You should see a workflow run called "Deploy to GitHub Pages"
   - Wait for it to complete (usually 1-2 minutes)
   - It should show a green checkmark when done

6. **Your site will be live:**
   - After the workflow completes, wait 1-2 minutes
   - Visit: **https://dangervalentine.github.io**
   - You should see your NextQuest site!

## Troubleshooting

### If you don't see "GitHub Actions" as an option:
- Make sure the `.github/workflows/deploy.yml` file was pushed
- Check that you're on the `main` branch
- Try refreshing the Settings page

### If the workflow fails:
- Click on the failed workflow run
- Check the error messages
- Common issues:
  - Missing dependencies (check package.json)
  - Build errors (check the build step logs)

### If the site still shows README:
- Wait a few minutes for DNS/propagation
- Clear your browser cache
- Try visiting in an incognito/private window
- Check that the workflow completed successfully

## What Should Happen

1. GitHub Actions workflow runs automatically
2. It builds your Next.js site (`npm run build`)
3. Creates static files in the `out/` directory
4. Deploys those files to GitHub Pages
5. Your site becomes available at `https://dangervalentine.github.io`

The README will still be visible in the repository, but the website will serve your built Next.js site!

