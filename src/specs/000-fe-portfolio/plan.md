# Implementation Plan: FE Engineer Portfolio

**Branch**: `000-fe-portfolio` | **Date**: October 29, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/000-fe-portfolio/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a professional frontend engineer portfolio using Next.js 14+ with App Router, TypeScript, TailwindCSS, SCSS, and Motion (Framer Motion). The portfolio showcases work experience case studies, side-project labs, and blog content managed via Sanity CMS with images delivered through Sanity's CDN. The site features responsive design, dark/light theme support, accessibility compliance (WCAG 2.2 AA), client-side search, scroll-triggered animations, and SEO optimization. Development prioritizes velocity with manual testing and Lighthouse audits over unit test coverage

## Technical Context

**Language/Version**: TypeScript 5.3+, JavaScript ES2022+  
**Primary Dependencies**: Next.js 14+ (App Router), React 18+, TailwindCSS 3.4+, Motion (Framer Motion) 11+, Sanity CMS 3+, GROQ (Sanity query language)  
**Storage**: Sanity CMS (headless CMS for all content), Sanity Image CDN (optimized image delivery with on-the-fly transformations)  
**Testing**: Manual testing, Lighthouse CI (accessibility, performance, SEO audits), real-device testing across mobile/desktop, visual regression checks  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge - latest 2 versions), responsive across mobile (320px+), tablet (768px+), desktop (1024px+) viewports  
**Project Type**: Web application (Next.js frontend + Sanity CMS backend)  
**Performance Goals**: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at 75th percentile on mobile, 60fps animations, Lighthouse Performance score ≥90  
**Constraints**: WCAG 2.2 AA accessibility compliance, no unit tests (manual testing only), privacy-first analytics (no personal data tracking), static/ISR rendering preferred over SSR, animations must respect `prefers-reduced-motion`  
**Scale/Scope**: 10-20 case studies, 50-100 blog posts, 10-20 lab projects, client-side search with pre-built index, expected traffic: <10k monthly visits initially  
**Pagination Strategy**: "Load More" button pattern - initial SSG/ISR load of 20 items per content type, subsequent batches of 20 items via client-side API calls, maintains LCP performance while providing user control

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Principle 1: Code Quality & Type Safety

**Status**: ✅ COMPLIANT

- TypeScript configured in strict mode with no `any` types
- ESLint and Prettier checks enforced in CI
- Conventional Commits format required
- Code reviews mandatory before merge
- Shared utilities consolidated in `/lib`
- Dead code removal before releases

**Evidence**: TypeScript 5.3+ in strict mode, ESLint configuration with no `any` rule, pre-commit hooks for linting/formatting

---

### Principle 2: Testing Standards & Accessibility

**Status**: ✅ COMPLIANT

- WCAG 2.2 AA compliance validated via Lighthouse CI
- Keyboard navigation for all interactive components
- Visible focus states with proper contrast ratios
- ARIA labels and semantic landmarks
- No keyboard traps

**Evidence**: Accessibility requirements in spec (FR-005, FR-006), Lighthouse audits in CI, manual keyboard testing, success criteria SC-003 and SC-004

---

### Principle 3: UX Consistency & Design System

**Status**: ✅ COMPLIANT

- Design tokens for spacing, typography, border radii (via TailwindCSS + CSS variables)
- Consistent navigation, heading hierarchy, card layouts across Work, Labs, Blog
- Dark/light theme parity
- Explicit empty states, error states, loading states for all views

**Evidence**: TailwindCSS design tokens, theme toggle (FR-004), empty state requirements (FR-010), error handling (FR-011), loading states (FR-009)

---

### Principle 4: Performance Requirements

**Status**: ✅ COMPLIANT

- Performance budgets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at 75th percentile (mobile)
- All images use `next/image` with Sanity CDN delivery, WebP/AVIF formats
- Width/height specified for all images, `priority` only for above-fold images
- SSG/ISR preferred over SSR for list and detail pages
- Caching headers defined for all routes
- Third-party scripts limited and lazy-loaded
- `preconnect`/`preload` for CMS and CDN origins
- Font optimization with `next/font`

**Evidence**: Performance goals in Technical Context, success criteria SC-002 and SC-016, image optimization via Sanity CDN, ISR revalidation (FR-030)

---

### Principle 5: Content Management & CMS Integration

**Status**: ✅ COMPLIANT

- All content sourced from Sanity CMS (no hardcoded content)
- Draft content filtered in production builds (FR-028)
- Content schema versioning via Sanity
- ISR revalidation within 60 seconds via webhooks (FR-030)

**Evidence**: Sanity CMS as single source of truth, content status filtering (FR-028, FR-029, FR-030), GROQ queries for structured content

---

### Overall Gate Status: ✅ PASS

All constitution principles are satisfied. No violations requiring justification. Proceed to Phase 0 research.

## Project Structure

### Documentation (this feature)

```text
specs/000-fe-portfolio/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── sanity-schema.ts           # Sanity content schemas
│   ├── api-types.ts               # TypeScript types for API responses
│   └── search-index-schema.json   # Client-side search index structure
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Next.js App Router Structure
app/
├── layout.tsx                    # Root layout with theme provider, global nav, footer
├── page.tsx                      # Home page (hero, overview)
├── about/
│   └── page.tsx                  # About page
├── work/
│   ├── page.tsx                  # Work index (case study listings with filters)
│   └── [slug]/
│       └── page.tsx              # Case study detail page
├── labs/
│   ├── page.tsx                  # Labs index (project grid with filters)
│   └── [slug]/
│       └── page.tsx              # Lab project detail page
├── blog/
│   ├── page.tsx                  # Blog index (post listings with filters/search)
│   └── [slug]/
│       └── page.tsx              # Blog post detail page
├── api/
│   ├── search/
│   │   └── route.ts              # Search API endpoint (returns pre-built index)
│   └── revalidate/
│       └── route.ts              # Webhook endpoint for ISR revalidation
├── sitemap.xml/
│   └── route.ts                  # Dynamic sitemap generation
└── rss.xml/
    └── route.ts                  # Dynamic RSS feed generation

components/
├── layout/
│   ├── Header.tsx                # Global navigation with theme toggle
│   ├── Footer.tsx                # Social links, copyright, accessibility statement
│   └── ThemeProvider.tsx         # Dark/light theme context
├── navigation/
│   ├── NavMenu.tsx               # Desktop navigation
│   ├── MobileMenu.tsx            # Mobile slide-out menu
│   └── SearchModal.tsx           # Global search overlay
├── content/
│   ├── CaseStudyCard.tsx         # Work case study card
│   ├── LabProjectCard.tsx        # Lab project card
│   ├── BlogPostCard.tsx          # Blog post card
│   ├── FilterBar.tsx             # Filter UI for Work/Labs/Blog indices
│   └── RelatedPosts.tsx          # Related content suggestions
├── ui/
│   ├── Button.tsx                # Reusable button component
│   ├── Card.tsx                  # Generic card component
│   ├── CodeBlock.tsx             # Syntax-highlighted code with copy button
│   ├── LoadingState.tsx          # Skeleton loaders
│   ├── EmptyState.tsx            # Empty state messaging
│   └── ErrorState.tsx            # Error state messaging
└── animations/
    ├── ScrollReveal.tsx          # Scroll-triggered animation wrapper (Motion)
    └── PageTransition.tsx        # Page transition animations

lib/
├── sanity/
│   ├── client.ts                 # Sanity client configuration
│   ├── queries.ts                # GROQ queries for content fetching
│   ├── image-builder.ts          # Sanity image URL builder helper
│   └── types.ts                  # TypeScript types for Sanity content
├── search/
│   ├── build-index.ts            # Build search index from CMS content
│   └── search-client.ts          # Client-side search logic
├── utils/
│   ├── reading-time.ts           # Calculate blog post reading time
│   ├── slug-generator.ts         # Generate unique slugs from titles
│   └── date-formatter.ts         # Format publication dates
└── telemetry/
    └── events.ts                 # Telemetry event logging

styles/
├── globals.scss                   # Global styles, Tailwind imports
├── themes.scss                   # Theme variables (light/dark)
└── components/                   # Component-specific SCSS (BEM conventions)
    ├── _card.scss
    ├── _navigation.scss
    └── _code-block.scss

sanity/
├── schemas/
│   ├── author.ts                 # Author content type
│   ├── workCaseStudy.ts          # Work case study content type
│   ├── labProject.ts             # Lab project content type
│   ├── blogPost.ts               # Blog post content type
│   ├── techStack.ts              # Tech stack taxonomy
│   └── tag.ts                    # Tag taxonomy
├── sanity.config.ts              # Sanity Studio configuration
└── sanity.cli.ts                 # Sanity CLI configuration

public/
├── fonts/                        # Self-hosted fonts (if not using next/font CDN)
├── icons/                        # SVG icons
└── images/
    └── placeholders/             # Placeholder images for fallbacks

.github/
├── workflows/
│   ├── ci.yml                    # Linting, type-checking, Lighthouse CI
│   └── deploy.yml                # Deployment to Vercel
└── prompts/
    └── speckit.plan.prompt.md    # This prompt file

.specify/
├── memory/
│   └── constitution.md           # Project constitution
├── scripts/
│   └── bash/
│       ├── setup-plan.sh         # Plan setup script
│       └── update-agent-context.sh  # Agent context updater
└── templates/
    ├── plan-template.md
    ├── spec-template.md
    └── tasks-template.md
```

**Structure Decision**: This is a Next.js App Router web application with a clear separation of concerns. The `app/` directory follows Next.js 14+ conventions with file-based routing. Components are organized by purpose (layout, navigation, content, ui, animations). The `lib/` directory contains business logic for Sanity CMS integration, search, utilities, and telemetry. The `sanity/` directory contains CMS schema definitions and configuration. Styling uses a hybrid approach: TailwindCSS utilities in component files + SCSS for complex component-specific styles following BEM conventions in `styles/components/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. All constitution principles are satisfied. This section is left empty as required.
