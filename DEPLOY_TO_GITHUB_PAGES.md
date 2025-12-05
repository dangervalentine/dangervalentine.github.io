# Deploy NextQuest Site to GitHub Pages

This guide will help you deploy the NextQuest marketing site to `https://dangervalentine.github.io`.

## Prerequisites

- Git installed
- GitHub account with access to `dangervalentine/dangervalentine.github.io` repository
- Node.js 18+ installed

## Step-by-Step Deployment

### 1. Initialize Git (if not already done)

```bash
cd nextquest-site
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: NextQuest marketing site"
```

### 4. Add Remote Repository

```bash
git remote add origin https://github.com/dangervalentine/dangervalentine.github.io.git
```

**Note**: If you already have a remote, you can update it:
```bash
git remote set-url origin https://github.com/dangervalentine/dangervalentine.github.io.git
```

### 5. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

### 6. Enable GitHub Pages

1. Go to https://github.com/dangervalentine/dangervalentine.github.io
2. Click **Settings** (in the repository menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically run and deploy your site

### 7. Wait for Deployment

- Go to the **Actions** tab in your repository
- You should see a workflow run called "Deploy to GitHub Pages"
- Wait for it to complete (usually 1-2 minutes)
- Once it shows a green checkmark, your site is live!

### 8. Access Your Site

Your site will be available at:
**https://dangervalentine.github.io**

## Important Notes

### No BasePath Needed

Since this is a `username.github.io` repository, the site deploys to the root domain. The `next.config.js` does NOT need a `basePath` setting - leave it commented out.

### Automatic Updates

Every time you push to the `main` branch, the site will automatically rebuild and redeploy via GitHub Actions.

### Local Testing

Before pushing, test the build locally:

```bash
npm run build
npx serve out
```

Visit `http://localhost:3000` to preview.

## Troubleshooting

### Workflow Fails

- Check the **Actions** tab for error messages
- Ensure Node.js version in workflow matches your local version
- Verify all dependencies are in `package.json`

### Site Not Updating

- Check that GitHub Pages is set to use "GitHub Actions" as source
- Verify the workflow completed successfully
- Wait a few minutes for DNS propagation

### 404 Errors

- Since this is a user page (not a project page), no basePath is needed
- Ensure `next.config.js` does NOT have `basePath` uncommented

## Manual Deployment (Alternative)

If you prefer to deploy manually without GitHub Actions:

1. Build the site:
   ```bash
   npm run build
   ```

2. Install gh-pages:
   ```bash
   npm install -g gh-pages
   ```

3. Deploy:
   ```bash
   gh-pages -d out
   ```

4. In GitHub Settings → Pages, select the `gh-pages` branch as source

## Updating the Site

To update the site after making changes:

```bash
git add .
git commit -m "Update site content"
git push origin main
```

The GitHub Actions workflow will automatically rebuild and redeploy.
