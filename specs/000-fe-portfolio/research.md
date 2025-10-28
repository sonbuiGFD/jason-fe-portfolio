# Research & Technical Decisions

**Feature**: Portfolio Website  
**Date**: October 28, 2025  
**Purpose**: Document technical decisions, best practices research, and architectural patterns for implementation

---

## 1. Next.js 14+ App Router Architecture

### Decision

Use Next.js 14+ with App Router (React Server Components) for all pages, leveraging server-first rendering with selective client components.

### Rationale

- **Server Components by Default**: Reduces JavaScript bundle size, improves initial page load performance
- **Automatic Code Splitting**: App Router automatically splits code at route boundaries
- **Built-in Optimizations**: next/image, next/font, and metadata APIs are deeply integrated
- **Streaming & Suspense**: Enables progressive page rendering for better perceived performance
- **Server Actions**: Simplifies form submissions and mutations without API routes

### Alternatives Considered

- **Next.js Pages Router**: Mature but lacks RSC benefits, larger client bundles, less optimal for content-heavy sites
- **Remix**: Excellent DX but smaller ecosystem, less mature image optimization
- **Gatsby**: Strong SSG but slower build times, complexity with large content volumes

### Best Practices

- Use Server Components for data fetching and static content rendering
- Mark client components with `'use client'` directive only when needed (interactivity, browser APIs)
- Leverage route groups `(auth)`, `(marketing)` for layout organization without affecting URLs
- Use `loading.tsx` and `error.tsx` for automatic loading/error states
- Implement parallel routes for complex UIs (e.g., modal overlays)

### References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)

---

## 2. Sanity CMS Integration

### Decision

Use Sanity as the headless CMS with GROQ queries, Portable Text for rich content, and real-time preview via Presentation API.

### Rationale

- **Developer Experience**: Excellent TypeScript support, schema-as-code, local development
- **Real-time Collaboration**: Multiple editors can work simultaneously without conflicts
- **Portable Text**: Structured rich text format superior to HTML strings, enables custom serializers
- **Flexible Schema**: No rigid content models, can evolve schema without migrations
- **Built-in Preview**: Presentation API provides authenticated preview URLs for drafts
- **Generous Free Tier**: Sufficient for portfolio sites (10k documents, 50GB bandwidth/month)

### Alternatives Considered

- **Contentful**: More enterprise-focused, rigid content modeling, higher cost
- **Strapi**: Self-hosted requires DevOps overhead, less TypeScript-friendly
- **Payload CMS**: Newer, smaller ecosystem, less proven at scale

### Integration Pattern

```typescript
// lib/sanity/client.ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-10-28",
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published", // Filter drafts in production
});

export const previewClient = createClient({
  ...client.config(),
  useCdn: false,
  perspective: "previewDrafts", // Include drafts for preview mode
  token: process.env.SANITY_API_READ_TOKEN,
});
```

### Best Practices

- **Schema Organization**: Group schemas by content type (`work/`, `blog/`, `labs/`)
- **Slug Uniqueness**: Implement custom validation to enforce unique slugs per content type
- **Image Optimization**: Use Sanity's Image API with next/image loader for CDN delivery
- **GROQ Queries**: Colocate queries with components, use projection to minimize data transfer
- **Draft Filtering**: Use `perspective: 'published'` in production client to exclude drafts
- **Webhooks**: Implement HMAC signature verification for security

### References

- [Sanity + Next.js Guide](https://www.sanity.io/guides/nextjs-app-router)
- [Portable Text Documentation](https://portabletext.org/)

---

## 3. On-Demand ISR Revalidation Strategy

### Decision

Implement on-demand Incremental Static Regeneration using `revalidatePath()` and `revalidateTag()` triggered by Sanity webhooks. No time-based revalidation.

### Rationale

- **Immediate Updates**: Content changes appear within seconds (webhook latency) vs. minutes (time-based)
- **Efficient Rebuilds**: Only affected pages regenerate, not entire site
- **Cost Optimization**: Avoids unnecessary rebuilds when content unchanged
- **Precise Control**: Tag-based invalidation enables granular cache management

### Implementation Pattern

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  // Verify Sanity webhook signature
  const signature = req.headers.get("sanity-webhook-signature");
  const body = await req.text();

  const expectedSignature = crypto
    .createHmac("sha256", process.env.SANITY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(body);
  const { _type, slug } = payload;

  // Revalidate specific paths and tags
  if (_type === "workCaseStudy") {
    revalidatePath("/work");
    revalidatePath(`/work/${slug}`);
    revalidateTag("work");
  } else if (_type === "labProject") {
    revalidatePath("/labs");
    revalidatePath(`/labs/${slug}`);
    revalidateTag("labs");
  } else if (_type === "blogPost") {
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidateTag("blog");
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
```

### Best Practices

- **Webhook Security**: Always verify HMAC signatures to prevent unauthorized revalidation
- **Tag Strategy**: Use content type tags (`work`, `blog`, `labs`) for bulk invalidation
- **Error Handling**: Implement retry logic with exponential backoff in webhook handler
- **Logging**: Log all revalidation events for debugging and monitoring
- **Fallback**: Ensure stale content is still served if revalidation fails

### References

- [Next.js Revalidation Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating)
- [Sanity Webhooks Guide](https://www.sanity.io/docs/webhooks)

---

## 4. Font Optimization with Next.js Font API

### Decision

Use `next/font/google` to self-host Google Fonts at build time with automatic subsetting and optimal loading.

### Rationale

- **Zero External Requests**: Fonts downloaded at build time, eliminating DNS lookup and connection time
- **Automatic Subsetting**: Only characters used in content are included, reducing file size
- **Layout Shift Prevention**: Font metrics embedded, `font-display: swap` avoided
- **Privacy Compliant**: No tracking by Google since fonts are self-hosted
- **Simple API**: Declarative font loading with TypeScript support

### Implementation Pattern

```typescript
// src/app/layout.tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

```css
/* styles/globals.css */
:root {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}

body {
  font-family: var(--font-sans), system-ui, sans-serif;
}

code,
pre {
  font-family: var(--font-mono), monospace;
}
```

### Best Practices

- **Variable Fonts**: Prefer variable fonts (e.g., Inter Variable) to reduce requests
- **Subset Selection**: Only include required character sets (latin for English content)
- **Preload Critical Fonts**: Next.js automatically preloads fonts used in root layout
- **CSS Variables**: Expose fonts via CSS variables for theme consistency
- **Fallback Stack**: Define system font fallbacks for FOUT prevention

### References

- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Google Fonts API](https://fonts.google.com/)

---

## 5. Client-Side Search with Fuse.js

### Decision

Implement client-side fuzzy search using Fuse.js with search index built at compile time.

### Rationale

- **Simplicity**: No search backend or API required, reduces infrastructure complexity
- **Performance**: Sub-50ms search on ~100 items, acceptable for portfolio scale
- **Privacy**: No search queries sent to external services
- **Cost**: Zero additional cost vs. Algolia ($1+/month)
- **Offline Capable**: Search works without network connection

### Implementation Pattern

```typescript
// lib/search/index.ts
import Fuse from "fuse.js";
import { WorkCaseStudy, LabProject, BlogPost } from "@/types/models";

type SearchableContent = {
  type: "work" | "lab" | "blog";
  slug: string;
  title: string;
  description: string;
  tags: string[];
};

export function createSearchIndex(
  work: WorkCaseStudy[],
  labs: LabProject[],
  blog: BlogPost[]
): Fuse<SearchableContent> {
  const items: SearchableContent[] = [
    ...work.map((w) => ({
      type: "work" as const,
      slug: w.slug,
      title: w.title,
      description: w.challenge,
      tags: w.tags,
    })),
    ...labs.map((l) => ({
      type: "lab" as const,
      slug: l.slug,
      title: l.title,
      description: l.description,
      tags: l.tags,
    })),
    ...blog.map((b) => ({
      type: "blog" as const,
      slug: b.slug,
      title: b.title,
      description: b.excerpt,
      tags: b.tags,
    })),
  ];

  return new Fuse(items, {
    keys: [
      { name: "title", weight: 2 },
      { name: "description", weight: 1 },
      { name: "tags", weight: 1.5 },
    ],
    threshold: 0.3,
    includeScore: true,
  });
}
```

### Best Practices

- **Index Weight Tuning**: Prioritize title matches over description matches
- **Threshold Tuning**: 0.3 provides good balance of precision and recall
- **Result Grouping**: Group results by content type (Work, Labs, Blog)
- **Debouncing**: Debounce search input to avoid excessive re-renders
- **Limit Results**: Show top 10 results per category to prevent overwhelming UI

### Alternatives Considered

- **Algolia**: Excellent UX but $1+/month cost, overkill for portfolio scale
- **Elasticsearch**: Requires backend infrastructure, high maintenance overhead
- **MiniSearch**: Lighter than Fuse.js but less feature-rich

### References

- [Fuse.js Documentation](https://fusejs.io/)
- [Client-Side Search Best Practices](https://www.algolia.com/blog/engineering/client-side-search-implementation/)

---

## 6. Image Optimization Strategy

### Decision

Use `next/image` with Sanity Image CDN as the loader, delivering WebP/AVIF formats with responsive srcsets.

### Rationale

- **Automatic Format Selection**: Browser receives best supported format (AVIF > WebP > JPEG)
- **Lazy Loading**: Below-the-fold images lazy load automatically
- **Layout Shift Prevention**: Explicit dimensions prevent CLS
- **CDN Delivery**: Sanity CDN provides global edge caching
- **Blur Placeholders**: Low-quality image placeholders (LQIP) for better perceived performance

### Implementation Pattern

```typescript
// lib/sanity/image.ts
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Usage in components
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

<Image
  src={urlFor(heroImage).width(1200).height(630).url()}
  alt={heroImage.alt}
  width={1200}
  height={630}
  priority={aboveFold}
  placeholder="blur"
  blurDataURL={urlFor(heroImage).width(20).height(11).blur(50).url()}
/>;
```

### Best Practices

- **Explicit Dimensions**: Always provide width/height to prevent layout shift
- **Priority Attribute**: Use for hero images and above-the-fold content
- **Responsive Images**: Use `sizes` prop to optimize image selection per viewport
- **Alt Text Validation**: Enforce alt text in Sanity schema validation
- **Fallback Images**: Provide branded placeholder for missing images

### References

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Sanity Image URLs](https://www.sanity.io/docs/image-urls)

---

## 7. Theme System with CSS Variables

### Decision

Implement dark/light theme using CSS variables with system preference detection and manual toggle persisted in localStorage.

### Rationale

- **Zero Runtime Cost**: CSS variables switch themes without JavaScript execution
- **SSR Compatible**: Initial theme applied before hydration to prevent flash
- **Accessible**: Respects `prefers-color-scheme` media query
- **Persistent**: User preference saved in localStorage
- **Maintainable**: Centralized color definitions in design tokens

### Implementation Pattern

```typescript
// src/app/providers.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Read from localStorage or system preference
    const stored = localStorage.getItem("theme") as Theme | null;
    const systemPrefers = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initial = stored ?? systemPrefers;
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

```css
/* styles/globals.css */
:root {
  /* Light theme (default) */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-accent: #0066cc;
}

[data-theme="dark"] {
  --color-bg-primary: #1a1a1a;
  --color-bg-secondary: #2a2a2a;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #aaaaaa;
  --color-accent: #3399ff;
}
```

### Best Practices

- **Inline Script**: Add theme detection script in `<head>` to prevent flash
- **Semantic Variables**: Use purpose-based names (`--color-text-primary`) not color names (`--color-gray-900`)
- **Contrast Validation**: Ensure all color combinations meet WCAG 2.2 AA contrast ratios
- **Reduced Motion**: Respect `prefers-reduced-motion` for theme transitions
- **Test Both Themes**: Validate all components in both light and dark themes

### References

- [CSS Variables MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Theme Switching Best Practices](https://web.dev/patterns/theming/)

---

## 8. Accessibility Implementation

### Decision

Implement WCAG 2.2 AA compliance using semantic HTML, ARIA landmarks, keyboard navigation, and automated testing with Axe DevTools.

### Rationale

- **Legal Compliance**: WCAG 2.2 AA is constitutional requirement
- **Broader Reach**: 15% of population has some form of disability
- **SEO Benefits**: Semantic HTML improves search engine understanding
- **Better UX**: Keyboard navigation and focus management benefit all users
- **Professional Standard**: Accessibility demonstrates engineering maturity

### Implementation Checklist

#### Semantic HTML

- ✅ Use `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` landmarks
- ✅ Proper heading hierarchy (single `<h1>`, nested `<h2>`-`<h6>`)
- ✅ `<button>` for actions, `<a>` for navigation
- ✅ `<form>` with associated `<label>` elements

#### ARIA Attributes

- ✅ `aria-label` for icon-only buttons
- ✅ `aria-current="page"` for active navigation links
- ✅ `aria-live` regions for dynamic content updates
- ✅ `aria-expanded` for collapsible sections
- ✅ `role="dialog"` with `aria-modal="true"` for modals

#### Keyboard Navigation

- ✅ All interactive elements focusable via Tab
- ✅ Visible focus indicators (3:1 contrast ratio)
- ✅ Logical tab order (follows visual layout)
- ✅ Escape key closes modals
- ✅ Focus trap within modal dialogs
- ✅ Focus restoration after modal close

#### Color Contrast

- ✅ Normal text: 4.5:1 contrast ratio
- ✅ Large text (≥18pt): 3:1 contrast ratio
- ✅ UI components: 3:1 contrast ratio
- ✅ Validate contrast in both light and dark themes

#### Screen Reader Support

- ✅ Descriptive alt text for all images
- ✅ Skip navigation links
- ✅ Form validation errors announced
- ✅ Loading states announced with `aria-busy`

### Testing Strategy

```typescript
// tests/a11y/homepage.test.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Homepage Accessibility", () => {
  test("should not have WCAG 2.2 AA violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2aa", "wcag22aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("keyboard navigation works", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const focusedElement = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(focusedElement).toBe("A"); // First link should receive focus
  });
});
```

### Best Practices

- **Automated Testing**: Run Axe checks in CI on every PR
- **Manual Testing**: Use keyboard-only navigation and screen readers (NVDA, JAWS, VoiceOver)
- **Focus Management**: Always manage focus after route changes and modal interactions
- **Motion Respect**: Disable animations when `prefers-reduced-motion: reduce`
- **Touch Targets**: Minimum 44×44px for touch targets (WCAG 2.2 requirement)

### References

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Axe DevTools Documentation](https://www.deque.com/axe/devtools/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

---

## 9. Performance Monitoring & Optimization

### Decision

Use Vercel Analytics for Real User Monitoring (RUM) with Web Vitals tracking and Lighthouse CI for synthetic monitoring.

### Rationale

- **Real User Data**: Vercel Analytics captures actual user experiences across devices
- **Core Web Vitals**: Automatic tracking of LCP, INP, CLS aligned with constitutional requirements
- **Zero Config**: Built-in integration with Vercel deployment
- **Budget Enforcement**: Lighthouse CI blocks PRs that regress performance budgets
- **Historical Trends**: Track performance over time to detect regressions

### Implementation Pattern

```typescript
// src/app/layout.tsx
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

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000",
        "http://localhost:3000/work",
        "http://localhost:3000/blog"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 1 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "max-potential-fid": ["error", { "maxNumericValue": 200 }]
      }
    }
  }
}
```

### Best Practices

- **Field vs Lab Data**: Use RUM for real-world performance, Lighthouse for controlled testing
- **P75 Targets**: Focus on 75th percentile metrics, not averages (aligned with constitution)
- **Budget Alerts**: Configure Slack/email alerts for budget violations
- **Device Testing**: Test on real mobile devices (low-end Android) not just simulators
- **Performance Profiling**: Use React DevTools Profiler to identify expensive re-renders

### References

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Web Vitals Library](https://github.com/GoogleChrome/web-vitals)
- [Lighthouse CI Setup](https://github.com/GoogleChrome/lighthouse-ci)

---

## 10. Content Security & Preview Mode

### Decision

Implement Sanity preview mode using Next.js Draft Mode with token-based authentication for secure draft access.

### Rationale

- **Security**: Preview URLs require authentication token, preventing public draft access
- **SEO Protection**: Search engines don't index draft content
- **Accurate Preview**: Draft mode uses real production environment, not separate staging
- **Author UX**: Content authors preview changes before publishing without deploying

### Implementation Pattern

```typescript
// app/api/draft/route.ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { client } from "@/lib/sanity/client";

export async function GET(request: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
    request.url
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  draftMode().enable();
  redirect(redirectTo);
}

// app/api/draft/disable/route.ts
export async function GET() {
  draftMode().disable();
  return new Response("Draft mode disabled");
}
```

```typescript
// lib/sanity/client.ts
import { draftMode } from "next/headers";

export function getClient() {
  const { isEnabled } = draftMode();
  return isEnabled ? previewClient : client;
}
```

### Best Practices

- **Token Rotation**: Rotate Sanity API tokens regularly
- **Preview Banner**: Show prominent banner when in draft mode
- **Exit Link**: Provide clear "Exit Preview" link to disable draft mode
- **Cookie Security**: Ensure draft mode cookie is httpOnly and secure
- **Sanity Studio Integration**: Configure Sanity Studio to generate preview URLs automatically

### References

- [Next.js Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode)
- [Sanity Preview Guide](https://www.sanity.io/docs/preview-content-on-site)

---

## Summary of Key Decisions

| Area          | Decision                         | Primary Benefit                                 |
| ------------- | -------------------------------- | ----------------------------------------------- |
| Framework     | Next.js 14+ App Router           | Server Components, automatic optimizations      |
| CMS           | Sanity with GROQ                 | Developer experience, real-time collaboration   |
| ISR Strategy  | On-demand revalidation           | Immediate updates, cost efficiency              |
| Fonts         | Next.js Font Optimization        | Zero external requests, layout shift prevention |
| Search        | Client-side with Fuse.js         | Simplicity, zero cost, privacy                  |
| Images        | next/image + Sanity CDN          | Automatic format selection, lazy loading        |
| Themes        | CSS variables                    | Zero runtime cost, SSR compatible               |
| Accessibility | WCAG 2.2 AA + Axe tests          | Legal compliance, broader reach                 |
| Monitoring    | Vercel Analytics + Lighthouse CI | Real user data, budget enforcement              |
| Preview       | Next.js Draft Mode               | Security, accurate preview                      |

All decisions align with constitutional principles and support the performance, accessibility, and content management requirements defined in the specification.
