// generateGitCommitPrompt.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT = path.join(__dirname, 'gitCommandPrompt.txt');
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });

function sh(cmd) {
    return execSync(cmd, { encoding: 'utf-8', maxBuffer: 20 * 1024 * 1024 }).trim();
}

// --- 1) Stage all changes in the repo ---
try {
    sh('git add .');
} catch {
    // If staging fails (not a git repo, etc.), we'll still try to continue;
    // later git commands will make the problem obvious.
}

let stagedNames = '';
let numstat = '';
let diff = '';
let status = '';
let branch = '';

// --- 2) Status + branch info ---
try { status = sh('git status --porcelain=v1'); } catch { }
try { branch = sh('git rev-parse --abbrev-ref HEAD'); } catch { }

const hasStaged = status
    .split('\n')
    .some(l =>
        l.startsWith('A ') ||
        l.startsWith('M ') ||
        l.startsWith('R ') ||
        l.startsWith('C ')
    );

if (hasStaged) {
    // Prefer staged diff when present
    try { stagedNames = sh('git diff --cached --name-only'); } catch { }
    try { numstat = sh('git diff --cached --numstat'); } catch { }
    try { diff = sh('git diff --cached'); } catch { }
} else {
    // Fall back to working tree diff if somehow nothing is staged
    try { stagedNames = sh('git diff --name-only'); } catch { }
    try { numstat = sh('git diff --numstat'); } catch { }
    try { diff = sh('git diff'); } catch { }
}

const files = stagedNames.split('\n').filter(Boolean);

// Areas from file paths (helps scope/scope-name)
const pathAreas = [
    { area: 'Pages', rx: /(page\.tsx|page\.js|layout\.tsx|layout\.js)/i },
    { area: 'Components', rx: /(component|Header|Footer|Hero|ScreenshotGrid|StoreButtons|FeatureCard)/i },
    { area: 'Styling', rx: /(\.module\.css|\.css|styles|theme|globals)/i },
    { area: 'Deployment', rx: /(deploy|github|pages|\.ps1|\.sh|scripts)/i },
    { area: 'Content', rx: /(changelog|privacy|terms|support|content)/i },
    { area: 'Config', rx: /(next\.config|tsconfig|package\.json|constants)/i },
    { area: 'Assets', rx: /(images|icons|public|assets)/i },
    { area: 'SEO/Metadata', rx: /(metadata|sitemap|robots|og:|seo)/i },
];

const areas = Array.from(new Set(
    files.flatMap(f =>
        pathAreas
            .filter(a => a.rx.test(f))
            .map(a => a.area)
    )
)).slice(0, 6);

// Trim noisy files from diff
const NOISE_RX = [
    /package-lock\.json$/, /yarn\.lock$/, /pnpm-lock\.yaml$/,
    /\.next\//, /out\//, /dist\//, /build\//,
    /\.snap$/, /\.map$/, /\.min\.js$/, /\.min\.css$/,
];

const isNoisy = f => NOISE_RX.some(rx => rx.test(f));
const noisyFiles = files.filter(isNoisy);

let trimmedDiff = diff || '';
if (noisyFiles.length && trimmedDiff) {
    const sections = trimmedDiff.split('\ndiff --git ');
    const kept = sections.filter(sec => {
        const head = sec.split('\n', 1)[0] || '';
        return !NOISE_RX.some(rx => rx.test(head));
    });
    trimmedDiff = kept.join('\ndiff --git ');
}

// Guard on size
const MAX_CHARS = 40000;
let truncated = false;
if (trimmedDiff.length > MAX_CHARS) {
    trimmedDiff = trimmedDiff.slice(0, MAX_CHARS) + '\n\n... (diff truncated)\n';
    truncated = true;
}

// Few-shot examples to stabilize format (no ticket/author)
const fewShot = `
# Examples (follow exactly this message format)

feat(pages): add support page with FAQs and contact information

Why This Matters:
Provides users with a dedicated support page to find answers to common questions and contact information, improving user experience and reducing support burden.

## Changes
- Add support page with FAQ section
- Add contact information and data deletion instructions
- Add support page layout with proper navigation
- Update header navigation to include support link
- Add responsive styling for support page content

## Affected Areas
- Pages
- Components
- Styling
- Content
---
fix(components): improve responsive design for mobile devices

Why This Matters:
Ensures the website displays correctly on all screen sizes, providing a better experience for mobile users visiting the site.

## Changes
- Update Hero component with mobile-first breakpoints
- Fix ScreenshotGrid layout on small screens
- Adjust StoreButtons spacing for mobile
- Improve Footer layout on narrow viewports
- Add responsive typography scaling

## Affected Areas
- Components
- Styling
---
feat(deployment): add GitHub Pages deployment automation

Why This Matters:
Streamlines the deployment process and ensures consistent builds, making it easier to publish updates to the live site.

## Changes
- Add deploy.ps1 script for automated deployment
- Add GitHub Actions workflow for CI/CD
- Update next.config.js for static export
- Add deployment documentation
- Configure basePath for GitHub Pages

## Affected Areas
- Deployment
- Config
`;

const prompt = `You are helping draft a single high-quality Conventional Commit message for the **staged changes** in this repo.

## Output format

Respond with **only** the commit message, wrapped in a single fenced code block with \`text\` as the language, like this:

\`\`\`text
<type>(<scope>): <summary>

Why This Matters:
<1–3 sentences explaining impact and rationale, not implementation details.>

## Changes
- <bullet 1>
- <bullet 2>
- <4–10 total bullets describing concrete changes>

## Affected Areas
- <area 1>
- <area 2>
- <1–5 total areas, aligned with the Areas/paths below when possible>
\`\`\`

### Rules

- Use literal \`- \` at the start of each bullet line (as in the example).
- Do not output anything before or after the code block.
- Do not use multiple code blocks.
- Do not describe your reasoning process.

## Repository Snapshot

Branch: ${branch || '(unknown)'}
Staged files: ${files.length}
Noisy files omitted from diff: ${noisyFiles.length}
${truncated ? 'Note: Diff truncated for length.\n' : ''}

## Areas (candidates)
${areas.length ? areas.map(a => `- ${a}`).join('\n') : '- (infer from files/diff)'}

## Numstat (adds\\tdeletes\\tfile)
${numstat || '(none)'}

## Unified Diff (staged only; noisy files removed when possible)
${trimmedDiff || '(no staged diff)'}

## Examples to emulate
${fewShot}
`;

// --- 3) Write prompt to file so it doesn't scroll out of view ---
fs.writeFileSync(OUTPUT, prompt, 'utf-8');
console.log(`Commit prompt written to: ${OUTPUT}`);
