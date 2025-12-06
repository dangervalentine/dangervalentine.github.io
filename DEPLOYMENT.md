# Deploying to GitHub Pages

This Next.js site is configured for static export and can be deployed to GitHub Pages.

## Prerequisites

1. A GitHub repository (can be the same repo or a separate one)
2. GitHub Pages enabled in repository settings

## Deployment Options

### Option 1: GitHub Actions (Recommended - Automatic)

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your site when you push to the `main` branch.

**Steps:**

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will run automatically on push

3. Your site will be available at:
   - `https://yourusername.github.io/your-repo-name/` (if repo name is not `username.github.io`)
   - `https://yourusername.github.io/` (if repo name is `username.github.io`)

### Option 2: Manual Deployment

If you prefer to deploy manually:

1. Build the site:
   ```bash
   npm run build
   ```

2. The static files will be in the `out/` directory

3. Deploy to GitHub Pages:
   - **Option A**: Use the `gh-pages` branch
     ```bash
     npm install -g gh-pages
     gh-pages -d out
     ```

   - **Option B**: Use the `/docs` folder
     - Copy contents of `out/` to `docs/` folder
     - Commit and push
     - In GitHub Settings → Pages, select `/docs` as source

## Important Notes

### Base Path Configuration

If your site is deployed to a subdirectory (e.g., `https://username.github.io/repo-name/`), you need to configure the base path:

1. Update `next.config.js`:
   ```js
   const nextConfig = {
       output: 'export',
       basePath: '/repo-name',  // Replace with your repo name
       images: {
           unoptimized: true,
       },
   };
   ```

2. Rebuild and redeploy

### Custom Domain

If you want to use a custom domain:

1. Add a `CNAME` file to the `public/` folder with your domain:
   ```
   yourdomain.com
   ```

2. Configure DNS settings as per GitHub Pages documentation

3. The site will work at both the custom domain and the GitHub Pages URL

## Troubleshooting

- **404 errors**: Make sure `basePath` is set correctly if deploying to a subdirectory
- **Images not loading**: Ensure all images are in the `public/` folder
- **Styles not loading**: Check that the build completed successfully and all CSS files are in `out/`

## Local Testing

Test the production build locally:

```bash
npm run build
npx serve out
```

Visit `http://localhost:3000` to preview the built site.

