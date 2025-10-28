# Quickstart Guide: FE Engineer Portfolio

**Date**: October 29, 2025  
**Feature**: FE Engineer Portfolio  
**Status**: Phase 1 Complete

## Overview

This guide provides setup instructions, environment configuration, and development workflow for the FE Engineer Portfolio built with Next.js 14+, Sanity CMS, TailwindCSS, and Motion (Framer Motion).

---

## Prerequisites

Ensure you have the following installed:

- **Node.js**: 18.17+ or 20.0+ (LTS recommended)
- **npm**: 9.0+ or **pnpm**: 8.0+ (preferred for faster installs)
- **Git**: 2.30+
- **Code Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Sanity.io

---

## Project Structure

```text
jason-fe-portfolio/
├── app/                      # Next.js App Router pages
├── components/               # React components
├── lib/                      # Business logic & utilities
├── styles/                   # Global styles & SCSS modules
├── sanity/                   # Sanity CMS schemas & config
├── public/                   # Static assets
├── specs/                    # Feature specifications
├── .github/                  # CI/CD workflows
├── .specify/                 # Project constitution & templates
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # TailwindCSS configuration
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.json            # ESLint configuration
├── .prettierrc               # Prettier configuration
└── package.json              # Dependencies & scripts
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/sonbuiGFD/jason-fe-portfolio.git
cd jason-fe-portfolio
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using pnpm (recommended):

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_TOKEN=your_read_write_token

# Sanity Studio Configuration (for /admin route)
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production

# ISR Revalidation Secret (for webhook endpoint)
REVALIDATION_SECRET=your_random_secret_string

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**How to get Sanity credentials**:

1. Sign up at [sanity.io](https://www.sanity.io/)
2. Create a new project via Sanity CLI or dashboard
3. Copy `Project ID` from project settings
4. Generate an API token with `Editor` permissions (Settings → API → Tokens)

### 4. Initialize Sanity Studio

Navigate to the `sanity/` directory and initialize:

```bash
cd sanity
npm install -g @sanity/cli  # Install Sanity CLI globally (if not already installed)
sanity init                 # Follow prompts to link to your Sanity project
cd ..
```

Alternatively, if schemas are already defined in `sanity/schemas/`, deploy them:

```bash
cd sanity
sanity deploy              # Deploy Sanity Studio to <your-project>.sanity.studio
cd ..
```

### 5. Seed Initial Content (Optional)

If you have sample content, import it:

```bash
cd sanity
sanity dataset import <path-to-dataset>.ndjson production --replace
cd ..
```

---

## Development Workflow

### Start Development Server

Run the Next.js development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Access Sanity Studio Locally

If Sanity Studio is embedded at `/admin`:

```bash
# Already running with Next.js dev server
# Navigate to http://localhost:3000/admin
```

If Sanity Studio is separate:

```bash
cd sanity
sanity start
# Studio runs at http://localhost:3333
```

### Run Linting & Type Checking

```bash
# ESLint
npm run lint

# TypeScript type checking
npm run type-check
```

### Format Code

```bash
npm run format
```

---

## Build & Deployment

### Build for Production

```bash
npm run build
```

This generates an optimized production build in `.next/` directory.

### Preview Production Build Locally

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to preview.

### Deploy to Vercel

1. **Connect Repository to Vercel**:

   - Sign up at [vercel.com](https://vercel.com/)
   - Import GitHub repository
   - Vercel auto-detects Next.js configuration

2. **Configure Environment Variables** in Vercel dashboard:

   - Add all variables from `.env.local` (except `NEXT_PUBLIC_SITE_URL` which auto-populates)

3. **Deploy**:
   - Push to `main` branch triggers automatic deployment
   - Preview deployments created for all branches

### Configure ISR Revalidation Webhook

In Sanity project settings:

1. Go to **API** → **Webhooks**
2. Create a new webhook:
   - **Name**: ISR Revalidation
   - **URL**: `https://yourdomain.com/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type in ["workCaseStudy", "labProject", "blogPost"]`
   - **HTTP method**: POST
   - **Secret**: (same as `REVALIDATION_SECRET` in `.env.local`)

---

## Key Scripts

| Script            | Command              | Description                               |
| ----------------- | -------------------- | ----------------------------------------- |
| `dev`             | `next dev`           | Start development server                  |
| `build`           | `next build`         | Build production bundle                   |
| `start`           | `next start`         | Start production server (after build)     |
| `lint`            | `next lint`          | Run ESLint                                |
| `lint:fix`        | `next lint --fix`    | Auto-fix ESLint errors                    |
| `type-check`      | `tsc --noEmit`       | TypeScript type checking (no compilation) |
| `format`          | `prettier --write .` | Format all files with Prettier            |
| `format:check`    | `prettier --check .` | Check formatting without modifying        |
| `test:lighthouse` | `lhci autorun`       | Run Lighthouse CI audits                  |

---

## Development Guidelines

### Branch Strategy

- **`main`**: Production-ready code (protected, requires PR + review)
- **Feature branches**: `###-feature-name` (e.g., `000-fe-portfolio`, `001-work-case-studies`)
- **Hotfix branches**: `hotfix/issue-description`

### Commit Conventions

Follow Conventional Commits format:

```text
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples**:

```bash
git commit -m "feat(work): add case study filtering by tech stack"
git commit -m "fix(blog): resolve reading time calculation for code blocks"
git commit -m "docs(quickstart): update Sanity setup instructions"
```

### Pull Request Workflow

1. Create feature branch from `main`:

   ```bash
   git checkout -b 001-work-case-studies
   ```

2. Implement feature (commit frequently with conventional commits)

3. Push branch to GitHub:

   ```bash
   git push origin 001-work-case-studies
   ```

4. Open Pull Request on GitHub:

   - Add description with context and screenshots
   - Link to feature spec (e.g., `specs/001-work-case-studies/spec.md`)
   - Request code review

5. Wait for CI checks to pass:

   - ESLint (no warnings)
   - TypeScript (no errors)
   - Lighthouse CI (Performance ≥90, Accessibility ≥95, SEO ≥90)

6. Address review feedback

7. Merge to `main` (squash merge preferred)

### Code Style

- **TypeScript Strict Mode**: No `any` types, explicit types for function params/returns
- **Component Structure**: Functional components with hooks, no class components
- **Styling**: TailwindCSS utilities in JSX, SCSS modules for complex styles (BEM naming)
- **Imports**: Absolute imports from `@/` alias (e.g., `import { Button } from '@/components/ui/Button'`)
- **File Naming**: PascalCase for components (`Button.tsx`), camelCase for utilities (`readingTime.ts`)

---

## Testing Strategy

### Manual Testing Checklist

Before opening a PR, test the following:

- [ ] **Functionality**: All features work as expected (happy paths + edge cases)
- [ ] **Responsive Design**: Test on mobile (375px), tablet (768px), desktop (1440px) viewports
- [ ] **Keyboard Navigation**: All interactive elements accessible via Tab, Enter, Escape
- [ ] **Dark/Light Mode**: Toggle theme and verify no visual regressions
- [ ] **Performance**: Check Lighthouse Performance score ≥90 (run `npm run test:lighthouse`)
- [ ] **Accessibility**: Check Lighthouse Accessibility score ≥95, no ARIA violations
- [ ] **Cross-Browser**: Test on Chrome, Firefox, Safari (macOS/iOS), Edge

### Lighthouse CI Audits

Lighthouse audits run automatically in CI on every PR. To run locally:

```bash
npm run test:lighthouse
```

**Budgets (must pass)**:

- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: ≥90

---

## Common Tasks

### Add a New Page

1. Create page file in `app/<route>/page.tsx`:

   ```tsx
   // app/about/page.tsx
   import { Metadata } from "next";

   export const metadata: Metadata = {
     title: "About | Jason Bui",
     description: "Learn more about Jason Bui, Senior Frontend Engineer",
   };

   export default function AboutPage() {
     return (
       <main>
         <h1>About</h1>
       </main>
     );
   }
   ```

2. Add navigation link in `components/layout/Header.tsx`

### Add a New Component

1. Create component file in `components/<category>/<ComponentName>.tsx`:

   ```tsx
   // components/ui/Button.tsx
   import { ButtonHTMLAttributes } from "react";

   interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: "primary" | "secondary";
   }

   export function Button({
     variant = "primary",
     children,
     ...props
   }: ButtonProps) {
     return (
       <button className={`button button--${variant}`} {...props}>
         {children}
       </button>
     );
   }
   ```

2. Add SCSS styles in `styles/components/_button.scss` (if needed):

   ```scss
   .button {
     @apply px-4 py-2 rounded-md font-medium transition-colors;

     &--primary {
       @apply bg-blue-600 text-white hover:bg-blue-700;
     }

     &--secondary {
       @apply bg-gray-200 text-gray-900 hover:bg-gray-300;
     }
   }
   ```

### Query Sanity CMS

1. Define GROQ query in `lib/sanity/queries.ts`:

   ```typescript
   export const getAllCaseStudiesQuery = groq`
     *[_type == "workCaseStudy" && status == "published"] | order(publishedAt desc) {
       _id,
       title,
       slug,
       summary,
       "heroImageUrl": heroImage.asset->url,
       techStack[]->{name, slug},
       publishedAt
     }
   `;
   ```

2. Fetch data in page component:

   ```tsx
   import { sanityClient } from "@/lib/sanity/client";
   import { getAllCaseStudiesQuery } from "@/lib/sanity/queries";

   export default async function WorkPage() {
     const caseStudies = await sanityClient.fetch(getAllCaseStudiesQuery);

     return (
       <main>
         {caseStudies.map((cs) => (
           <CaseStudyCard key={cs._id} {...cs} />
         ))}
       </main>
     );
   }
   ```

### Add Animation

1. Wrap content in `<ScrollReveal>` component:

   ```tsx
   import { ScrollReveal } from "@/components/animations/ScrollReveal";

   export default function Page() {
     return (
       <ScrollReveal animation="fade-up">
         <h1>Animated Heading</h1>
       </ScrollReveal>
     );
   }
   ```

2. Component implementation (example):

   ```tsx
   // components/animations/ScrollReveal.tsx
   "use client";

   import { motion } from "framer-motion";
   import { ReactNode } from "react";

   interface ScrollRevealProps {
     children: ReactNode;
     animation?: "fade-up" | "fade-in" | "scale-in";
   }

   const animations = {
     "fade-up": {
       initial: { opacity: 0, y: 20 },
       whileInView: { opacity: 1, y: 0 },
     },
     "fade-in": {
       initial: { opacity: 0 },
       whileInView: { opacity: 1 },
     },
     "scale-in": {
       initial: { opacity: 0, scale: 0.9 },
       whileInView: { opacity: 1, scale: 1 },
     },
   };

   export function ScrollReveal({
     children,
     animation = "fade-up",
   }: ScrollRevealProps) {
     return (
       <motion.div
         {...animations[animation]}
         transition={{ duration: 0.5, ease: "easeOut" }}
         viewport={{ once: true, margin: "-50px" }}
       >
         {children}
       </motion.div>
     );
   }
   ```

---

## Troubleshooting

### Issue: Sanity queries return empty results

**Solution**:

1. Check that content status is `published` (not `draft` or `review`)
2. Verify GROQ query syntax in [Sanity Vision](https://www.sanity.io/docs/the-vision-plugin)
3. Ensure API token has read permissions

### Issue: Images not loading from Sanity CDN

**Solution**:

1. Check `next.config.js` includes Sanity CDN in `images.domains`:

   ```javascript
   module.exports = {
     images: {
       domains: ["cdn.sanity.io"],
     },
   };
   ```

2. Verify image asset exists in Sanity Studio (Assets tab)

### Issue: Lighthouse Performance score <90

**Solution**:

1. Run Lighthouse in incognito mode (browser extensions can skew scores)
2. Check for large images (use `next/image` with `priority` for above-fold)
3. Analyze bundle size with `@next/bundle-analyzer`
4. Disable animations temporarily to isolate performance issue

### Issue: TypeScript errors after adding new Sanity schema

**Solution**:

1. Update type definitions in `lib/sanity/types.ts`
2. Run `npm run type-check` to verify
3. Restart TypeScript server in VS Code (Cmd+Shift+P → "Restart TS Server")

---

## Resources

- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Sanity Docs**: [https://www.sanity.io/docs](https://www.sanity.io/docs)
- **TailwindCSS Docs**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Motion (Framer Motion) Docs**: [https://www.framer.com/motion/](https://www.framer.com/motion/)
- **WCAG 2.2 Guidelines**: [https://www.w3.org/WAI/WCAG22/quickref/](https://www.w3.org/WAI/WCAG22/quickref/)
- **Conventional Commits**: [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)

---

## Next Steps

After completing setup:

1. Review the [Feature Specification](./spec.md) to understand requirements
2. Review the [Implementation Plan](./plan.md) for technical architecture
3. Review the [Data Model](./data-model.md) for content structure
4. Start implementing features following the [Tasks](./tasks.md) (generated via `/speckit.tasks`)

---

## Support

For questions or issues:

1. Check the [Feature Spec](./spec.md) and [Plan](./plan.md) for context
2. Review the [Constitution](./.specify/memory/constitution.md) for project principles
3. Open a GitHub issue with detailed description and steps to reproduce
4. Tag relevant team members for review

---

**Last Updated**: October 29, 2025  
**Maintained By**: Jason Bui
