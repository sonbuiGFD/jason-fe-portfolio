# Research: FE Engineer Portfolio Implementation

**Date**: October 29, 2025  
**Feature**: FE Engineer Portfolio (Next.js + Sanity CMS)  
**Status**: Complete

## Overview

This document consolidates research findings and technical decisions for the FE Engineer Portfolio implementation. All NEEDS CLARIFICATION items from Technical Context have been resolved through best practice research and architectural analysis.

---

## Research Area 1: Next.js 14+ App Router Architecture

### Decision

Use Next.js 14+ App Router with the following rendering strategies:

- **Static Site Generation (SSG)**: Home page, About page
- **Incremental Static Regeneration (ISR)**: Work index, Labs index, Blog index, all detail pages (case studies, lab projects, blog posts)
- **Server-Side Rendering (SSR)**: Not used in initial implementation (all content can be statically generated or incrementally regenerated)
- **Client-Side Rendering (CSR)**: Search functionality, theme toggle, filter interactions

### Rationale

- **Performance**: SSG/ISR delivers optimal LCP and FCP metrics by pre-rendering pages at build time
- **SEO**: Static HTML is immediately crawlable by search engines without JavaScript execution
- **Cost**: Static pages reduce server compute costs compared to SSR on every request
- **Content Freshness**: ISR with webhook-triggered revalidation balances static performance with content updates (revalidate within 60 seconds of CMS publish)
- **User Experience**: Client-side interactions (search, filters) provide instant feedback without page reloads

### Alternatives Considered

| Alternative               | Rejected Because                                                                                                     |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Full SSR for all pages    | Unnecessary compute cost and slower TTFB for content that changes infrequently (portfolio updates are not real-time) |
| Pure CSR (SPA)            | Poor SEO, slow initial load, not suitable for content-focused portfolio                                              |
| Static export without ISR | Content updates would require full rebuilds and redeployments, slowing editorial workflow                            |

### Implementation Notes

- Use `generateStaticParams` for dynamic routes (`/work/[slug]`, `/labs/[slug]`, `/blog/[slug]`)
- Configure ISR revalidation via `revalidate` option in page components (e.g., `export const revalidate = 3600` for 1-hour cache)
- Implement webhook endpoint at `/api/revalidate` to trigger on-demand revalidation when content is published in Sanity
- Use `next/cache` tags for granular revalidation (e.g., `revalidateTag('work-case-studies')`)

---

## Research Area 2: Sanity CMS Integration & Content Modeling

### Decision

Use Sanity CMS v3 with GROQ queries for structured content management. Define the following content types:

- **Author**: Portfolio owner profile (singleton)
- **WorkCaseStudy**: Professional case studies with problem/solution narratives
- **LabProject**: Side projects and experiments
- **BlogPost**: Blog articles with rich text content
- **TechStack**: Taxonomy for technologies (reusable across Work, Labs, Blog)
- **Tag**: Taxonomy for blog topics

Content status workflow: `draft` → `review` → `published` (only `published` visible in production)

### Rationale

- **Developer Experience**: Sanity's schema-as-code approach integrates seamlessly with TypeScript
- **Editorial Workflow**: Built-in revision history, real-time collaboration, and customizable Studio UI
- **Image Optimization**: Sanity Image CDN provides automatic optimization, format conversion (WebP/AVIF), and responsive srcsets
- **Query Performance**: GROQ enables efficient content projection (fetch only required fields) and filtering (status, tags, tech stack)
- **Cost**: Sanity's free tier supports expected content volume (<10k documents, <1GB assets)

### Alternatives Considered

| Alternative          | Rejected Because                                                                      |
| -------------------- | ------------------------------------------------------------------------------------- |
| Contentful           | More expensive for comparable features, GraphQL overhead for simple queries           |
| Strapi (self-hosted) | Requires infrastructure management, higher operational complexity                     |
| MDX files in repo    | No editorial UI, requires code deployments for content updates, no image optimization |
| WordPress            | Legacy architecture, heavier infrastructure, not TypeScript-friendly                  |

### Implementation Notes

- Define schemas in `sanity/schemas/*.ts` with TypeScript types
- Use Sanity's `createClient` with `useCdn: true` for production reads (edge-cached, fast)
- Enable Sanity Studio at `/admin` route for content management
- Configure webhook in Sanity project settings to POST to `/api/revalidate` on publish events
- Use `@sanity/image-url` builder for responsive image generation
- Implement content validation rules in schemas (e.g., required fields, slug uniqueness)

---

## Research Area 3: Styling Architecture (TailwindCSS + SCSS Hybrid)

### Decision

Use a **hybrid styling approach**:

1. **TailwindCSS utilities**: For rapid development, spacing, layout, responsive breakpoints, and common patterns
2. **SCSS modules**: For complex component-specific styles requiring nesting, variables, or advanced selectors
3. **BEM naming conventions**: All custom CSS classes follow Block**Element**Modifier pattern with underscores (e.g., `card__header__large`, `navigation__item__active`)
4. **CSS Variables**: For theme tokens (colors, shadows) to enable dark/light mode switching

### Rationale

- **Development Velocity**: TailwindCSS utilities accelerate prototyping and iteration
- **Maintainability**: BEM conventions prevent specificity conflicts and clarify component boundaries
- **Theme Support**: CSS variables enable runtime theme switching without rebuilding stylesheets
- **Component Isolation**: SCSS modules scope styles to components, preventing global collisions
- **Flexibility**: Hybrid approach leverages strengths of both utility-first and component-scoped styling

### Alternatives Considered

| Alternative                            | Rejected Because                                                                        |
| -------------------------------------- | --------------------------------------------------------------------------------------- |
| TailwindCSS only                       | Complex animations and custom component states are verbose with utility classes alone   |
| SCSS only                              | Rebuilds TailwindCSS utilities from scratch, losing ecosystem plugins and optimizations |
| CSS-in-JS (styled-components, Emotion) | Runtime performance overhead, larger bundle sizes, not ideal for static content sites   |
| Vanilla CSS                            | No nesting, no variables, no modules—insufficient for complex component styles          |

### Implementation Notes

- Import TailwindCSS in `styles/globals.css` with `@tailwind base; @tailwind components; @tailwind utilities;`
- Define theme CSS variables in `styles/themes.scss` (light/dark variants)
- Store component-specific SCSS in `styles/components/` with `.module.scss` extension
- Use TailwindCSS `@apply` directive sparingly (only for frequently repeated utility combinations)
- Configure PurgeCSS/Tailwind JIT to remove unused utilities in production builds

---

## Research Area 4: Animation Library (Motion / Framer Motion)

### Decision

Use **Motion (Framer Motion)** for all declarative animations with the following patterns:

- **Scroll-triggered reveals**: Fade-in, slide-in, scale-in when elements enter viewport
- **Page transitions**: Smooth animations between route changes
- **Interactive hover states**: Micro-interactions on cards, buttons, links
- **Loading animations**: Skeleton loaders and spinner states

All animations respect `prefers-reduced-motion` user preference.

### Rationale

- **Declarative API**: Motion's component-based API integrates naturally with React
- **Performance**: Uses GPU-accelerated transforms and opacity (no layout thrashing)
- **Accessibility**: Built-in `prefers-reduced-motion` support
- **Developer Experience**: Comprehensive documentation, TypeScript support, extensive community examples
- **Bundle Size**: Tree-shakable, production build ~30-40KB gzipped

### Alternatives Considered

| Alternative                              | Rejected Because                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| GSAP (GreenSock)                         | Imperative API less idiomatic in React, larger bundle size, subscription pricing for advanced features |
| CSS animations only                      | Requires more boilerplate for scroll-triggered animations, harder to orchestrate complex sequences     |
| React Spring                             | More physics-based (less design-controlled), steeper learning curve for scroll interactions            |
| Plain JavaScript (Intersection Observer) | Manual animation logic is error-prone, harder to maintain, no built-in accessibility support           |

### Implementation Notes

- Wrap content sections in `<motion.div>` with `initial`, `whileInView`, `viewport` props for scroll reveals
- Create reusable `<ScrollReveal>` wrapper component for consistent reveal animations
- Use `<AnimatePresence>` for page transitions with `<motion.div>` wrapping page content
- Configure Motion's `MotionConfig` to respect `prefers-reduced-motion` globally
- Avoid animating `width`, `height`, `top`, `left` (triggers layout recalculation)—use `transform` and `opacity` instead

---

## Research Area 5: Client-Side Search Implementation

### Decision

Implement **client-side search** with a pre-built JSON index:

1. **Build-time index generation**: Generate search index at build time by querying all published content from Sanity (title, summary, tags, content preview)
2. **Index structure**: JSON file with normalized, searchable text and references to content slugs
3. **Search algorithm**: Use Fuse.js for fuzzy search with configurable thresholds, keys, and ranking
4. **Delivery**: Serve index via `/api/search` route or static JSON file in `public/` (lazy-loaded on search interaction)

### Rationale

- **Performance**: No server round-trips for search queries (instant results)
- **Scalability**: Sufficient for expected content volume (10-20 case studies, 50-100 blog posts, 10-20 labs = <200 documents)
- **User Experience**: Instant feedback, works offline after initial load
- **Cost**: No search service subscription (Algolia, Typesense) required for small-scale portfolio
- **Simplicity**: No infrastructure to manage, no API rate limits

### Alternatives Considered

| Alternative                         | Rejected Because                                                                          |
| ----------------------------------- | ----------------------------------------------------------------------------------------- |
| Algolia                             | Overkill for portfolio scale, monthly cost, requires API key management and syncing logic |
| Server-side search (Sanity queries) | Adds latency (network round-trip), consumes Sanity API quota unnecessarily                |
| Typesense (self-hosted)             | Requires infrastructure management, operational complexity for small benefit              |
| No search                           | Poor UX for content discovery, especially as blog grows to 50-100 posts                   |

### Implementation Notes

- Create `lib/search/build-index.ts` script to query Sanity and generate JSON index
- Include title, summary, tags, tech stack, and first 200 characters of content in index
- Run index build during Next.js build process (in `postbuild` script or as API route handler)
- Use Fuse.js with options: `threshold: 0.3`, `keys: ['title^2', 'summary', 'tags', 'content']` (title weighted 2x)
- Lazy-load search index on modal open to avoid blocking initial page load
- Store index in-memory on client (no persistence, re-fetch on page refresh)

---

## Research Area 6: Accessibility Best Practices (WCAG 2.2 AA)

### Decision

Implement the following accessibility patterns to achieve WCAG 2.2 AA compliance:

- **Semantic HTML**: Use `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` landmarks
- **Keyboard Navigation**: All interactive elements (links, buttons, modals) accessible via Tab, Enter, Escape
- **Focus Management**: Visible focus indicators (2px outline, 3:1 contrast), trap focus in modals
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text (18px+) and UI components
- **ARIA Labels**: Descriptive labels for icon buttons, search inputs, navigation landmarks
- **Screen Reader Support**: Alt text for all images, live regions for dynamic content updates
- **Motion Accessibility**: Respect `prefers-reduced-motion` for animations

### Rationale

- **Inclusivity**: Expands audience to users with disabilities (legal requirement in many jurisdictions)
- **SEO**: Semantic HTML and proper landmarks improve search engine understanding
- **Professionalism**: Accessibility demonstrates engineering rigor and ethical responsibility
- **Testing**: Automated testing (Lighthouse, axe DevTools) catches regressions early

### Alternatives Considered

| Alternative          | Rejected Because                                                                                                                        |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| WCAG 2.1 AA          | WCAG 2.2 includes additional criteria (e.g., focus appearance, dragging movements) that are relevant for modern web apps                |
| No formal compliance | Unprofessional for a frontend engineer portfolio, excludes users with disabilities                                                      |
| AAA compliance       | Requires significant additional effort (e.g., sign language videos, audio descriptions) with diminishing returns for portfolio use case |

### Implementation Notes

- Configure ESLint with `eslint-plugin-jsx-a11y` for automated accessibility linting
- Use `next/image` with descriptive `alt` props (never empty unless decorative)
- Implement skip link (`<a href="#main">Skip to content</a>`) for keyboard users
- Test with keyboard-only navigation (no mouse/trackpad)
- Run Lighthouse accessibility audits in CI (minimum score 95)
- Test with VoiceOver (macOS), NVDA (Windows), or TalkBack (Android)
- Use `aria-live="polite"` for search results and filter updates
- Ensure modal dialogs return focus to trigger element on close

---

## Research Area 7: Performance Optimization Strategies

### Decision

Implement the following performance optimizations to meet Core Web Vitals targets (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1):

**LCP (Largest Contentful Paint)**:

- Hero images use `next/image` with `priority` prop (preload)
- Fonts optimized with `next/font` (self-hosted, subsetting, font-display: swap)
- Preconnect to Sanity CDN: `<link rel="preconnect" href="https://cdn.sanity.io">`
- SSG/ISR for all content pages (no SSR delays)

**INP (Interaction to Next Paint)**:

- Client-side routing (no full page reloads)
- Debounce search input (300ms delay)
- Use `useTransition` for filter updates (non-blocking)
- Code-split heavy components (search modal, animations)

**CLS (Cumulative Layout Shift)**:

- Explicit width/height on all images
- Reserve space for lazy-loaded content (skeleton loaders)
- Avoid font layout shifts with `next/font` (preloaded, size-adjusted)
- No banner/toast injections above-the-fold

### Rationale

- **SEO**: Core Web Vitals are Google ranking factors (May 2021 Page Experience update)
- **User Experience**: Fast load times reduce bounce rates, smooth interactions build trust
- **Mobile-First**: Performance targets prioritize mobile experience (primary traffic source)
- **Competitive Advantage**: Portfolio showcasing frontend skills must demonstrate performance mastery

### Alternatives Considered

| Alternative                              | Rejected Because                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| Client-side data fetching (useEffect)    | Delays LCP, requires loading states, poor SEO                                              |
| Unoptimized images (no next/image)       | Large file sizes, no responsive srcsets, no format optimization                            |
| Third-party analytics (Google Analytics) | Adds ~50KB, blocks rendering, privacy concerns (alternatives: Vercel Analytics, Plausible) |
| No performance monitoring                | Cannot track regressions or validate optimizations                                         |

### Implementation Notes

- Run Lighthouse CI on every PR (enforce performance budget: Performance score ≥90, LCP ≤2.5s, CLS ≤0.1)
- Use Vercel Analytics or Web Vitals library for Real User Monitoring (RUM)
- Configure `next.config.js` with `images.domains` for Sanity CDN
- Use `loading="lazy"` for below-the-fold images (default in `next/image`)
- Minimize JavaScript bundle: tree-shake unused dependencies, analyze with `@next/bundle-analyzer`
- Implement resource hints: `<link rel="dns-prefetch">` for external domains, `<link rel="preload">` for critical resources

---

## Research Area 8: SEO & Metadata Best Practices

### Decision

Implement the following SEO patterns:

- **Metadata**: Generate `<title>`, `<meta name="description">`, canonical URLs via Next.js `Metadata` API
- **Sitemap**: Dynamic XML sitemap at `/sitemap.xml` with all public pages, last modification dates
- **RSS Feed**: XML RSS feed at `/blog/rss.xml` with latest blog posts
- **OpenGraph & Twitter Cards**: Metadata for social sharing (title, description, image, type)
- **Structured Data**: JSON-LD for `BlogPosting`, `Person`, `WebSite` schema.org types
- **Robots.txt**: Allow all crawlers, reference sitemap location

### Rationale

- **Discoverability**: Sitemaps help search engines find and index all pages
- **Social Sharing**: OpenGraph/Twitter Cards ensure rich previews on LinkedIn, Twitter, Facebook
- **Click-Through Rate**: Optimized meta descriptions and titles improve search result CTR
- **Content Syndication**: RSS feed enables subscribers to follow blog updates

### Alternatives Considered

| Alternative        | Rejected Because                                        |
| ------------------ | ------------------------------------------------------- |
| Manual meta tags   | Repetitive, error-prone, no dynamic content integration |
| Static sitemap     | Requires manual updates when content is added/removed   |
| No structured data | Misses opportunity for rich snippets in search results  |

### Implementation Notes

- Use `generateMetadata` in page components to dynamically generate metadata from CMS content
- Include canonical URL in metadata to prevent duplicate content penalties
- Generate OpenGraph image for each case study/blog post using Sanity Image CDN (1200x630px recommended)
- Implement `app/sitemap.xml/route.ts` to query Sanity for all published content and return XML
- Implement `app/rss.xml/route.ts` to query blog posts and return RSS 2.0 feed
- Add `robots.txt` in `public/` with `Sitemap: https://yourdomain.com/sitemap.xml`
- Use `@next/third-parties` for safe third-party script loading if needed

---

## Research Area 9: Testing Strategy (Manual + Lighthouse)

### Decision

Adopt a **simplified testing approach** focused on manual testing and Lighthouse audits:

- **Manual Testing**: User flow walkthroughs (home → work → case study, blog search → filter → read post)
- **Lighthouse CI**: Automated audits for Performance, Accessibility, Best Practices, SEO on every PR
- **Visual Regression**: Manual comparison of before/after screenshots in PR reviews
- **Real-Device Testing**: Manual testing on iPhone (Safari), Android (Chrome), desktop (Chrome, Firefox, Safari, Edge)
- **Keyboard Testing**: Manual keyboard-only navigation testing (Tab, Enter, Escape)

**No unit tests or integration tests in initial implementation.**

### Rationale

- **Development Velocity**: Manual testing is faster to set up than writing/maintaining automated tests
- **Portfolio Context**: Low complexity, single developer, infrequent changes—automated tests have low ROI
- **Quality Gates**: Lighthouse CI catches regressions in accessibility, performance, SEO automatically
- **Pragmatism**: Time invested in features and content creation delivers more value than test coverage

### Alternatives Considered

| Alternative                  | Rejected Because                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| Jest + React Testing Library | Time-consuming test writing slows feature development, minimal risk mitigation for portfolio scale |
| Playwright/Cypress E2E       | Setup overhead, flaky tests, maintenance burden, overkill for small portfolio                      |
| Vitest + Testing Library     | Still requires significant test writing time, same ROI concerns as Jest                            |

### Implementation Notes

- Configure Lighthouse CI in `.github/workflows/ci.yml` to run on every PR
- Set Lighthouse budgets: Performance ≥90, Accessibility ≥95, SEO ≥90
- Block PR merge if Lighthouse checks fail
- Document manual testing checklist in `.github/PULL_REQUEST_TEMPLATE.md`
- Use BrowserStack or real devices for cross-browser/device testing
- Consider adding E2E tests post-launch if content editing workflows become complex

---

## Research Area 10: Browser Support & Progressive Enhancement

### Decision

Support the **latest 2 versions** of modern browsers:

- **Chrome**: 120+ (latest 2 versions)
- **Firefox**: 120+ (latest 2 versions)
- **Safari**: 17+ (latest 2 versions)
- **Edge**: 120+ (latest 2 versions, Chromium-based)

**No support for Internet Explorer** (end-of-life June 2022).

Use **progressive enhancement**:

- Core content and functionality work without JavaScript (SSR/SSG)
- Enhancements (search, filters, animations) require JavaScript but degrade gracefully
- Feature detection for modern CSS (Grid, Flexbox, CSS Variables)

### Rationale

- **User Coverage**: Latest 2 versions cover >95% of global browser usage (as of 2025)
- **Development Efficiency**: No polyfills or legacy browser hacks, modern APIs available
- **Performance**: Modern browsers support optimal image formats (WebP, AVIF), efficient JavaScript
- **Security**: Older browsers have unpatched vulnerabilities, not recommended for users

### Alternatives Considered

| Alternative                             | Rejected Because                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| Support IE11                            | End-of-life browser, requires extensive polyfills, degrades performance        |
| Support latest 5 versions               | Diminishing returns, adds maintenance burden without significant user coverage |
| Modern browsers only (latest 1 version) | Too aggressive, excludes users who delay browser updates                       |

### Implementation Notes

- Configure Browserslist in `package.json`: `"browserslist": ["last 2 Chrome versions", "last 2 Firefox versions", "last 2 Safari versions", "last 2 Edge versions"]`
- Autoprefixer will automatically add vendor prefixes based on Browserslist config
- Use `@supports` CSS feature queries for graceful degradation (e.g., Grid fallback to Flexbox)
- Test site with JavaScript disabled to ensure core content is accessible
- Display browser upgrade message for unsupported browsers (detect via user agent or feature detection)

---

## Research Area 11: Pagination Strategy for Content Lists

### Decision

Implement **"Load More" button pagination** for Blog, Work, and Labs index pages:

- **Initial SSG/ISR Load**: First 20 items per content type
- **Client-Side Loading**: Subsequent 20-item batches via API route
- **User Control**: Explicit "Load More" button (not infinite scroll)
- **SEO Safety**: All items in sitemap.xml, search index includes all content
- **Fallback**: Optional paginated URLs (`/blog/page/[number]`) for JavaScript-disabled users

### Rationale

- **Performance**: Initial load of 20 items keeps LCP ≤2.5s target achievable (~30-50KB payload)
- **Scale-Appropriate**: 50-100 blog posts fit well with 20-item batches (max 5 loads to see all)
- **User Experience**: Clear control over content loading, preserves scroll position, accessible
- **SEO**: Sitemap includes all content URLs, search engines discover all pages without pagination crawl
- **Development Velocity**: Simpler than cursor-based pagination, sufficient for portfolio scale
- **Accessibility**: Keyboard-accessible button, screen reader announces loading state and remaining count

### Alternatives Considered

| Alternative             | Rejected Because                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| Load all items at once  | Poor initial load performance (200KB+ for 100 blog posts), unnecessary for browsing UX              |
| Infinite scroll         | Footer becomes unreachable, no user control, accessibility challenges, complicates focus management |
| Traditional pagination  | Full page reloads interrupt reading flow, feels dated, requires URL state management                |
| Cursor-based pagination | Over-engineered for portfolio scale, complex to implement, no significant benefit at this volume    |

### Implementation Notes

**Initial Page Load (SSG/ISR)**:

```typescript
// app/blog/page.tsx
const ITEMS_PER_PAGE = 20;

export default async function BlogPage() {
  // Fetch first 20 posts
  const posts = await sanityClient.fetch(
    `*[_type == "blogPost" && status == "published"] 
     | order(publishedAt desc) [0...${ITEMS_PER_PAGE}] { ... }`
  );

  // Get total count for "Load More" logic
  const totalPosts = await sanityClient.fetch(
    `count(*[_type == "blogPost" && status == "published"])`
  );

  return (
    <main>
      <PostList posts={posts} total={totalPosts} />
    </main>
  );
}
```

**Client-Side "Load More" Button**:

```typescript
// components/content/LoadMoreButton.tsx
"use client";

export function LoadMoreButton({ currentCount, totalCount, contentType }) {
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(currentCount);

  const loadMore = async () => {
    setLoading(true);
    const response = await fetch(
      `/api/${contentType}/items?offset=${offset}&limit=20`
    );
    const newItems = await response.json();
    // Append to existing items...
    setOffset(offset + newItems.length);
    setLoading(false);
  };

  return (
    <button onClick={loadMore} disabled={loading}>
      {loading ? "Loading..." : `Load More (${totalCount - offset} remaining)`}
    </button>
  );
}
```

**API Route for Pagination**:

```typescript
// app/api/blog/items/route.ts
export async function GET(request: NextRequest) {
  const offset = parseInt(request.nextUrl.searchParams.get("offset") || "0");
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "20");

  const posts = await sanityClient.fetch(
    `*[_type == "blogPost" && status == "published"] 
     | order(publishedAt desc) [${offset}...${offset + limit}] { ... }`
  );

  return NextResponse.json(posts, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
```

**Pagination Configuration**:

| Content Type | Initial Load | Per Load    | Expected Total | Pagination |
| ------------ | ------------ | ----------- | -------------- | ---------- |
| Blog Posts   | 20 posts     | 20 posts    | 50-100 posts   | Required   |
| Work Studies | 20 studies   | 20 studies  | 10-20 studies  | Optional   |
| Lab Projects | 20 projects  | 20 projects | 10-20 projects | Optional   |

**Note**: Work and Labs pagination is optional since expected volumes (10-20 items) may not require pagination. However, implementing consistent pagination across all content types provides better scalability and UX consistency.

---

## Summary of Key Decisions

| Area                   | Decision                                          | Rationale                                                                         |
| ---------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Rendering Strategy** | SSG/ISR (no SSR)                                  | Optimal performance, SEO, cost; ISR enables content updates without full rebuilds |
| **CMS**                | Sanity v3 + GROQ                                  | Developer-friendly, built-in image CDN, cost-effective, revision history          |
| **Styling**            | TailwindCSS + SCSS (BEM)                          | Hybrid approach balances velocity (Tailwind) with maintainability (SCSS/BEM)      |
| **Animations**         | Motion (Framer Motion)                            | Declarative API, performance, accessibility, React-friendly                       |
| **Search**             | Client-side (Fuse.js)                             | Instant results, sufficient for portfolio scale, no service costs                 |
| **Pagination**         | "Load More" button (20 items/batch)               | Optimal performance, user control, accessibility, sufficient for portfolio scale  |
| **Accessibility**      | WCAG 2.2 AA                                       | Inclusivity, SEO, professionalism; Lighthouse CI enforces compliance              |
| **Performance**        | LCP ≤2.5s, INP ≤200ms, CLS ≤0.1                   | Core Web Vitals targets, Lighthouse CI budgets, RUM monitoring                    |
| **SEO**                | Sitemap, OpenGraph, RSS, JSON-LD                  | Discoverability, social sharing, content syndication                              |
| **Testing**            | Manual + Lighthouse CI                            | Pragmatic approach prioritizing development velocity over test coverage           |
| **Browser Support**    | Latest 2 versions (Chrome, Firefox, Safari, Edge) | Modern APIs, no IE11, progressive enhancement                                     |

---

## Open Questions (Resolved in Spec Clarifications)

All clarifications have been addressed in the feature spec's **Clarifications** section:

- ✅ URL pattern for content: Clean slug-based paths (e.g., `/work/modernizing-checkout-flow`)
- ✅ Search implementation: Client-side with pre-built index
- ✅ Content volume: 10-20 case studies, 50-100 blog posts, 10-20 labs
- ✅ Analytics privacy: Essential analytics only, no personal data, no consent banner
- ✅ CMS outage handling: Serve stale cached content with staleness indicator
- ✅ Styling approach: Hybrid TailwindCSS + SCSS with BEM conventions
- ✅ Animation approach: Motion (Framer Motion) with scroll-triggered reveals
- ✅ Headless CMS & CDN: Sanity for both CMS and image CDN
- ✅ Testing strategy: Manual testing + Lighthouse CI (no unit tests)
- ✅ Browser support: Latest 2 versions of Chrome, Firefox, Safari, Edge

---

## Next Steps

Proceed to **Phase 1: Design & Contracts** to generate:

1. `data-model.md`: Entity definitions with attributes, relationships, validation rules
2. `contracts/`: Sanity schemas, TypeScript types, search index structure
3. `quickstart.md`: Setup instructions, environment configuration, development workflow
4. Update agent context with technology stack (`.github/copilot-instructions.md` or equivalent)
