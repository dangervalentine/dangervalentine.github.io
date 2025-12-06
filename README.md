# NextQuest Marketing Website

A static marketing and support website for NextQuest, built with Next.js and styled to match the mobile app's theme.

## Features

- **Landing Page**: Hero section, features showcase, screenshots, and call-to-action
- **Support Page**: FAQs, contact information, and data deletion info
- **Privacy Policy**: Comprehensive privacy policy page
- **Terms of Service**: Terms and conditions page
- **Changelog**: Version history and release notes
- **Theme Support**: Dark and light mode matching the mobile app
- **Responsive Design**: Mobile-first, works on all devices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules with CSS Variables
- **Deployment**: Static export (ready for Vercel, Netlify, Cloudflare Pages)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

This creates a static export in the `out/` directory.

### Deployment

The site is configured for static export and can be deployed to:

- **GitHub Pages** (Recommended): Deploy to `dangervalentine.github.io`
  - **Quick Deploy**: Run `powershell -ExecutionPolicy Bypass -File deploy.ps1` from this directory
  - **Manual Steps**: See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for step-by-step instructions
  - Automatic deployment via GitHub Actions on every push
  - Site will be live at: **https://dangervalentine.github.io**
- **Vercel**: Connect your GitHub repository and deploy automatically
- **Netlify**: Drag and drop the `out/` folder or connect via Git
- **Cloudflare Pages**: Connect repository or upload `out/` folder

### Quick GitHub Pages Setup

**Option 1: Automated Script**
```powershell
powershell -ExecutionPolicy Bypass -File deploy.ps1
```

**Option 2: Manual Steps**
1. `git init` (if not already done)
2. `git remote add origin https://github.com/dangervalentine/dangervalentine.github.io.git`
3. `git add .`
4. `git commit -m "Deploy NextQuest site"`
5. `git branch -M main`
6. `git push -u origin main`
7. Go to Settings → Pages → Source: Select "GitHub Actions"

**Note**: No `basePath` needed for `username.github.io` repositories - they deploy to the root domain.

## Project Structure

```
nextquest-site/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── support/           # Support page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   └── changelog/          # Changelog
├── src/
│   ├── components/        # React components
│   ├── styles/            # Global styles and theme
│   └── utils/             # Utility functions
└── public/                # Static assets
    └── fonts/             # Font files
```

## Theme System

The website uses CSS custom properties to match the mobile app's theme:

- **Dark Mode**: Default theme matching the app's dark mode
- **Light Mode**: Alternative theme matching the app's light mode
- **Colors**: Extracted from `app/src/constants/theme/colors.ts`
- **Typography**: Outfit for headings, FiraCode for body text

## Customization

### Adding Screenshots

Place screenshot images in `public/images/` and update the `ScreenshotGrid` component.

### Updating Store Links

Edit `src/components/StoreButtons.tsx` with your actual App Store and Play Store URLs.

### Modifying Content

- Landing page: `src/app/page.tsx`
- Support page: `src/app/support/page.tsx`
- Privacy policy: `src/app/privacy/page.tsx`
- Terms: `src/app/terms/page.tsx`
- Changelog: `src/app/changelog/page.tsx`

## License

All Rights Reserved - Victor Danger Valentine

