# Quickstart Guide

**Feature**: Portfolio Website  
**Date**: October 28, 2025  
**Purpose**: Get developers up and running quickly with the portfolio project

---

## Prerequisites

Before starting, ensure you have:

- **Node.js**: Version 20 LTS or higher
- **Package Manager**: npm, yarn, or pnpm
- **Git**: For version control
- **Vercel Account**: For deployment (free tier sufficient)
- **Sanity Account**: For CMS (free tier sufficient)
- **Code Editor**: VS Code recommended

---

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/sonbuiGFD/sonbui.com.git
cd sonbui.com
git checkout 000-fe-portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Sanity CMS

#### Create Sanity Project

```bash
npm create sanity@latest -- --project-id your-project-id --dataset production
```

When prompted:

- Select "Create new project"
- Choose project name: "sonbui-portfolio"
- Select dataset: "production"
- Output path: `./sanity`

#### Configure Sanity Schema

1. Copy schema from `specs/000-fe-portfolio/contracts/sanity-schema.ts` to `sanity/schemas/index.ts`
2. Update `sanity/sanity.config.ts`:

```typescript
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "sonbui-portfolio",
  projectId: "your-project-id",
  dataset: "production",
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
```

#### Start Sanity Studio

```bash
cd sanity
npm run dev
```

Studio will be available at `http://localhost:3333`

### 4. Configure Environment Variables

Create `.env.local` in project root:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-read-token

# Webhook Secret (generate with: openssl rand -hex 32)
SANITY_WEBHOOK_SECRET=your-webhook-secret

# Preview Mode Secret (generate with: openssl rand -hex 32)
SANITY_PREVIEW_SECRET=your-preview-secret
```

#### Generate Sanity API Token

1. Go to https://www.sanity.io/manage
2. Select your project
3. Navigate to "API" → "Tokens"
4. Click "Add API token"
5. Name: "Next.js Read Token"
6. Permissions: "Viewer"
7. Copy token to `.env.local`

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Application will be available at `http://localhost:3000`

---

## Project Structure Overview

```text
sonbui.com/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   ├── about/
│   │   ├── work/
│   │   ├── labs/
│   │   ├── blog/
│   │   └── api/
│   │       ├── revalidate/  # Webhook handler
│   │       └── draft/       # Preview mode
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── layouts/         # Layout components
│   │   └── features/        # Feature-specific components
│   ├── lib/
│   │   ├── sanity/          # Sanity client & queries
│   │   ├── search/          # Fuse.js search logic
│   │   └── utils/           # Shared utilities
│   ├── styles/
│   │   └── globals.css      # Global styles & design tokens
│   └── types/
│       └── sanity.ts        # Sanity TypeScript types
├── sanity/                  # Sanity Studio
│   ├── schemas/
│   └── sanity.config.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── public/
```

---

## Key Development Tasks

### Add Content via Sanity Studio

1. **Create Author Profile** (required first)

   - Navigate to "Author" in Sanity Studio
   - Fill in all required fields
   - Upload profile photo
   - Save and publish

2. **Create Tags and Tech Stack Items**

   - Navigate to "Tag" or "Tech Stack"
   - Add common tags (e.g., "React", "TypeScript", "Performance")
   - These will be referenced by content items

3. **Create Work Case Study**

   - Navigate to "Work Case Study"
   - Fill in title, company, role
   - Generate slug automatically
   - Upload hero image
   - Write challenge, approach, impact
   - Add tech stack references
   - Add tags
   - Set publish status to "Published"
   - Set publish date
   - Save

4. **Create Lab Project**

   - Similar to case study but with lab-specific fields
   - Add live demo and source code URLs

5. **Create Blog Post**
   - Write content using Portable Text editor
   - Add code blocks with syntax highlighting
   - Calculate reading time (word count / 225)
   - Reference author
   - Add tags

### Run Development Commands

```bash
# Development server
npm run dev

# TypeScript type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Build for production
npm run build

# Start production server
npm start
```

### Configure Webhooks (After Deployment)

1. Deploy to Vercel: `vercel deploy`
2. Get production URL: `https://sonbui.com`
3. In Sanity Studio:
   - Go to "API" → "Webhooks"
   - Click "Create webhook"
   - Name: "ISR Revalidation"
   - URL: `https://sonbui.com/api/revalidate`
   - Dataset: "production"
   - Trigger on: "Create", "Update", "Delete"
   - Filter: `_type in ["workCaseStudy", "labProject", "blogPost"]`
   - HTTP method: POST
   - Secret: (your SANITY_WEBHOOK_SECRET)
   - Save

---

## Common Development Workflows

### Adding a New Component

```bash
# Create component file
touch src/components/ui/Button.tsx

# Create test file
touch tests/unit/components/ui/Button.test.tsx
```

```typescript
// src/components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### Adding a New Page Route

```bash
# Create route directory
mkdir -p src/app/resume

# Create page file
touch src/app/resume/page.tsx
```

```typescript
// src/app/resume/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Jason Bui",
  description: "Download my resume",
};

export default function ResumePage() {
  return (
    <main>
      <h1>Resume</h1>
      {/* Page content */}
    </main>
  );
}
```

### Fetching Data from Sanity

```typescript
// lib/sanity/queries.ts
import { client } from "./client";

export async function getWorkCaseStudies() {
  return client.fetch(`
    *[_type == 'workCaseStudy' && publishStatus == 'published'] 
    | order(publishDate desc) {
      _id,
      title,
      slug,
      company,
      heroImage,
      tags[]->{ name, slug }
    }
  `);
}
```

```typescript
// app/work/page.tsx
import { getWorkCaseStudies } from "@/lib/sanity/queries";

export default async function WorkPage() {
  const caseStudies = await getWorkCaseStudies();

  return (
    <main>
      <h1>Work</h1>
      {caseStudies.map((cs) => (
        <article key={cs._id}>
          <h2>{cs.title}</h2>
          {/* Render case study card */}
        </article>
      ))}
    </main>
  );
}
```

### Implementing Search

```typescript
// lib/search/index.ts
import Fuse from "fuse.js";

export function createSearchIndex(data: any[]) {
  return new Fuse(data, {
    keys: ["title", "description", "tags"],
    threshold: 0.3,
  });
}
```

```typescript
// components/Search.tsx
"use client";

import { useState } from "use";
import { createSearchIndex } from "@/lib/search";

export function Search({ data }: { data: any[] }) {
  const [query, setQuery] = useState("");
  const fuse = createSearchIndex(data);
  const results = query ? fuse.search(query) : [];

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {results.map((result) => (
        <div key={result.item._id}>{result.item.title}</div>
      ))}
    </div>
  );
}
```

---

## Testing

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Example test:

```typescript
// tests/unit/components/Button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode
npm run test:e2e:headed

# Open Playwright UI
npm run test:e2e:ui
```

Example test:

```typescript
// tests/e2e/homepage.test.ts
import { test, expect } from "@playwright/test";

test("homepage loads correctly", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Jason Bui");
});
```

### Accessibility Tests

```bash
# Run accessibility tests
npm run test:a11y
```

Example test:

```typescript
// tests/a11y/homepage.test.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage has no accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2aa", "wcag22aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

---

## Deployment

### Deploy to Vercel

1. **Connect Repository**

   ```bash
   vercel link
   ```

2. **Configure Environment Variables**

   - Go to Vercel dashboard
   - Navigate to project settings
   - Add all environment variables from `.env.local`

3. **Deploy**

   ```bash
   # Production deployment
   vercel --prod

   # Preview deployment
   vercel
   ```

4. **Set Up Domains**
   - Add custom domain in Vercel dashboard
   - Configure DNS records
   - Enable automatic HTTPS

### Configure Vercel Analytics

1. In Vercel dashboard, enable:

   - Vercel Analytics (Real User Monitoring)
   - Speed Insights (Core Web Vitals)

2. Add to `src/app/layout.tsx`:

   ```typescript
   import { Analytics } from "@vercel/analytics/react";
   import { SpeedInsights } from "@vercel/speed-insights/next";

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
           <SpeedInsights />
         </body>
       </html>
     );
   }
   ```

---

## Troubleshooting

### Sanity Connection Issues

**Problem**: "Client configuration invalid" error

**Solution**:

- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check API token has correct permissions
- Ensure dataset name matches ("production")

### Build Errors

**Problem**: TypeScript errors during build

**Solution**:

```bash
# Run type check to see all errors
npm run type-check

# Check for missing types
npm install -D @types/node @types/react @types/react-dom
```

### ISR Not Working

**Problem**: Content updates not appearing on site

**Solution**:

- Verify webhook URL is correct
- Check webhook secret matches `.env` variable
- Inspect Vercel function logs for errors
- Test webhook manually with cURL:
  ```bash
  curl -X POST https://sonbui.com/api/revalidate \
    -H "Content-Type: application/json" \
    -H "sanity-webhook-signature: your-signature" \
    -d '{"_type":"workCaseStudy","slug":"test-slug"}'
  ```

### Performance Issues

**Problem**: Lighthouse score below 90

**Solution**:

- Check image sizes (should use next/image)
- Verify fonts are optimized (next/font)
- Review third-party scripts (should be lazy-loaded)
- Check for render-blocking resources

---

## Next Steps

After completing setup:

1. ✅ Create initial content in Sanity Studio
2. ✅ Customize design tokens in `styles/globals.css`
3. ✅ Implement homepage hero section
4. ✅ Build reusable component library
5. ✅ Set up CI/CD pipeline
6. ✅ Configure accessibility testing
7. ✅ Deploy to production
8. ✅ Monitor Core Web Vitals

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Spec Document](./spec.md)
- [Research Document](./research.md)
- [Data Model](./data-model.md)

---

## Getting Help

- **Project Issues**: Create GitHub issue in repository
- **Sanity Support**: https://slack.sanity.io/
- **Next.js Support**: https://github.com/vercel/next.js/discussions
- **Vercel Support**: support@vercel.com
