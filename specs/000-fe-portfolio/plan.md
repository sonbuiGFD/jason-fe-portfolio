# Implementation Plan: Portfolio Website

**Branch**: `000-fe-portfolio` | **Date**: October 28, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/000-fe-portfolio/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a professional frontend engineering portfolio website using Next.js 14+ with App Router, featuring work case studies, side-project labs, and a technical blog. Content is managed through Sanity CMS with on-demand ISR revalidation via webhooks. The site must achieve Core Web Vitals thresholds (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at P75 mobile), maintain WCAG 2.2 AA accessibility compliance, and support dark/light themes. All pages use SSG with on-demand revalidation for content updates. Images are delivered via CDN using next/image with WebP/AVIF formats. Typography uses Next.js Font Optimization with Google Fonts (self-hosted at build time).

## Technical Context

**Language/Version**: TypeScript 5.3+, Node.js 20 LTS  
**Primary Dependencies**: Next.js 14+, React 18+, Sanity CMS SDK, next/font with Google Fonts  
**Storage**: Sanity CMS (hosted) for all content, CDN (Vercel Image Optimization or Cloudinary) for media assets  
**Testing**: Vitest for unit tests, Playwright for E2E tests, Axe DevTools for accessibility validation  
**Target Platform**: Web (Vercel deployment), modern browsers (Chrome, Firefox, Safari, Edge last 2 versions)  
**Project Type**: Web application (Next.js App Router, single codebase)  
**Performance Goals**: Core Web Vitals at P75 mobile - LCP ≤2.5s, INP ≤200ms, CLS ≤0.1; Lighthouse Performance score ≥90  
**Constraints**: WCAG 2.2 AA compliance required, on-demand ISR revalidation within 60s, client-side search with Fuse.js  
**Scale/Scope**: ~30 pages initially (homepage, about, 10 case studies, 10 lab projects, 10 blog posts), scalable to hundreds

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Principle 1: Code Quality & Type Safety

- ✅ **TypeScript Strict Mode**: Enabled in tsconfig.json with `strict: true`, no `any` types permitted
- ✅ **ESLint + Prettier**: Configured with Next.js recommended rules, enforced in CI pre-commit hooks
- ✅ **Conventional Commits**: Required via commitlint configuration
- ✅ **Code Reviews**: Branch protection rules require 1 reviewer before merge
- ✅ **No Duplication**: Shared utilities in `/lib`, no duplicate helper functions
- ✅ **Dead Code Removal**: ESLint no-unused-vars rule enforced

**Status**: PASS

### Principle 2: Testing Standards & Accessibility

- ✅ **Accessibility Tests**: Axe DevTools validation in CI, landmarks and ARIA labels required
- ✅ **Keyboard Navigation**: All interactive elements keyboard-accessible, visible focus states (3:1 contrast)
- ✅ **WCAG 2.2 AA Compliance**: FR-046 to FR-054 explicitly mandate compliance, verified in CI
- ✅ **No Keyboard Traps**: Focus management tested in modal components

**Status**: PASS

### Principle 3: UX Consistency & Design System

- ✅ **Design Tokens**: CSS variables for spacing, typography, colors (to be defined in Phase 1)
- ✅ **Consistent Patterns**: Card layouts, navigation, heading hierarchy consistent across Work/Labs/Blog sections
- ✅ **Theme Parity**: Dark and light themes with equal visual quality
- ✅ **Explicit States**: Loading, error, and empty states designed for all views (FR-008, FR-009, FR-010)

**Status**: PASS

### Principle 4: Performance Requirements

- ✅ **Core Web Vitals**: SC-005 enforces LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at P75 mobile
- ✅ **Image Optimization**: FR-055 to FR-057 mandate next/image, CDN delivery, WebP/AVIF, explicit dimensions
- ✅ **SSG/ISR**: FR-058 requires SSG with on-demand ISR revalidation (no SSR unless necessary)
- ✅ **Caching Headers**: FR-059 defines caching strategy
- ✅ **Font Optimization**: FR-062 requires Next.js Font Optimization with Google Fonts (self-hosted)
- ✅ **Script Optimization**: FR-060 requires lazy-loading non-critical scripts, FR-061 requires preconnect

**Status**: PASS

### Principle 5: Content Management & CMS Integration

- ✅ **CMS Required**: All content sourced from Sanity CMS (clarified in session)
- ✅ **Draft Filtering**: FR-034 requires draft content filtered in production
- ✅ **Schema Versioning**: Sanity supports schema migrations, backward compatibility enforced
- ✅ **ISR Revalidation**: FR-035, FR-036 require on-demand revalidation within 60s via Sanity webhooks

**Status**: PASS

### Overall Gate Status: ✅ PASS - Proceed to Phase 0

**Phase 0 Complete**: Research document generated  
**Phase 1 Complete**: Data model, contracts, and quickstart created  
**Agent Context Updated**: GitHub Copilot context file created

### Post-Design Re-evaluation: ✅ PASS

All constitutional principles remain satisfied after design phase:

- ✅ **Code Quality**: TypeScript strict mode, ESLint, Prettier configured
- ✅ **Accessibility**: WCAG 2.2 AA compliance enforced with Axe tests
- ✅ **UX Consistency**: Design tokens, consistent patterns, theme parity
- ✅ **Performance**: Core Web Vitals thresholds, next/image, next/font, SSG+ISR
- ✅ **CMS Integration**: Sanity schema defined, on-demand ISR, draft filtering

No complexity violations introduced during design phase.

## Project Structure

### Documentation (this feature)

```text
specs/000-fe-portfolio/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── sanity-schema.ts # Sanity content schema definitions
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Next.js App Router Web Application
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout with theme provider
│   ├── page.tsx         # Homepage
│   ├── about/
│   ├── work/            # Case studies
│   │   ├── page.tsx     # Work index
│   │   └── [slug]/      # Case study detail
│   ├── labs/            # Side projects
│   │   ├── page.tsx     # Labs index
│   │   └── [slug]/      # Lab project detail
│   ├── blog/            # Blog posts
│   │   ├── page.tsx     # Blog index
│   │   └── [slug]/      # Blog post detail
│   └── api/
│       ├── revalidate/  # Webhook endpoint for Sanity ISR
│       └── preview/     # Draft preview mode
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layouts/         # Layout components
│   └── features/        # Feature-specific components
├── lib/
│   ├── sanity/          # Sanity client & queries
│   ├── search/          # Fuse.js search logic
│   └── utils/           # Shared utilities
├── styles/
│   ├── globals.css      # Global styles & design tokens
│   └── themes/          # Theme configurations
└── types/
    ├── sanity.ts        # Sanity content types
    └── models.ts        # Domain model types

public/
├── fonts/               # Optimized font files (if needed)
└── icons/               # Static icons

tests/
├── unit/                # Vitest unit tests
├── integration/         # Component integration tests
└── e2e/                 # Playwright E2E tests

sanity/                  # Sanity Studio (separate workspace)
├── schemas/             # Content schemas
├── structure/           # Studio structure
└── sanity.config.ts     # Studio configuration
```

**Structure Decision**: Selected Web Application structure with Next.js App Router. All pages use the `app/` directory with server components by default. Sanity Studio will be deployed separately (sanity.studio subdomain or /studio route) for content management. Client-side search implemented in `/lib/search` using Fuse.js. Design tokens defined in CSS variables in `styles/globals.css` for theme consistency.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations detected. All principles satisfied by the technical approach.

---

## Phase Summary & Next Steps

### ✅ Phase 0: Research & Decisions (Complete)

**Generated Artifact**: `research.md`

Key decisions documented:

1. Next.js 14+ App Router with React Server Components
2. Sanity CMS with GROQ queries and Portable Text
3. On-demand ISR revalidation (no time-based)
4. Next.js Font Optimization with Google Fonts
5. Client-side search with Fuse.js
6. next/image with Sanity CDN
7. CSS variables for theming
8. WCAG 2.2 AA with Axe testing
9. Vercel Analytics + Lighthouse CI
10. Next.js Draft Mode for preview

### ✅ Phase 1: Design & Contracts (Complete)

**Generated Artifacts**:

- `data-model.md` - 6 entities with validation rules, relationships, GROQ queries
- `contracts/sanity-schema.ts` - Sanity CMS schema definitions
- `quickstart.md` - Developer onboarding guide
- `.github/copilot-instructions.md` - Updated agent context

**Data Model Summary**:

- Author (singleton): Portfolio owner profile
- WorkCaseStudy: Detailed case studies with metrics
- LabProject: Side projects with demos/source code
- BlogPost: Technical articles with Portable Text
- Tag: Flat taxonomy for categorization
- TechStack: Technologies with logos

**Key Architectural Decisions**:

- Auto-generated slugs with numeric suffix for duplicates
- Draft/Published/Archived lifecycle for all content
- On-demand ISR via Sanity webhooks
- Client-side search index built at compile time
- Tag-based cache invalidation strategy

### 🔄 Phase 2: Task Breakdown (Next)

Run the following command to generate the task list:

```bash
/speckit.tasks
```

This will create `tasks.md` with:

- Granular implementation tasks
- Dependency ordering
- Acceptance criteria per task
- Test requirements
- Estimated complexity

### 📋 Recommended Task Execution Order

1. **Foundation** (Week 1)

   - Set up Next.js project with TypeScript
   - Configure ESLint, Prettier, commitlint
   - Set up Sanity Studio with schema
   - Create design tokens and base styles

2. **Core Infrastructure** (Week 2)

   - Implement Sanity client and queries
   - Set up ISR revalidation webhook
   - Configure preview mode
   - Implement theme provider

3. **UI Components** (Week 2-3)

   - Build component library (buttons, cards, navigation)
   - Implement layouts (header, footer, page layouts)
   - Add loading/error/empty states
   - Ensure accessibility compliance

4. **Content Pages** (Week 3-4)

   - Homepage with featured content
   - Work index and case study details
   - Labs index and project details
   - Blog index and post details
   - About page

5. **Features** (Week 4)

   - Global search functionality
   - Tag filtering
   - Related content logic
   - Social sharing

6. **Testing & Optimization** (Week 5)

   - Unit tests for components
   - E2E tests for user flows
   - Accessibility testing
   - Performance optimization
   - SEO validation

7. **Deployment** (Week 5-6)
   - Configure Vercel deployment
   - Set up webhooks
   - Configure analytics
   - Production monitoring

### 📊 Success Metrics

Before considering this feature complete, verify:

- ✅ All constitutional principles satisfied
- ✅ Core Web Vitals meet thresholds (P75 mobile)
- ✅ WCAG 2.2 AA compliance (zero Axe violations)
- ✅ Lighthouse Performance score ≥90
- ✅ ISR revalidation within 60 seconds
- ✅ All user stories have passing E2E tests
- ✅ Zero TypeScript errors in production build
- ✅ All functional requirements (FR-001 to FR-067) implemented

---

**Planning Phase Complete** ✅

**Branch**: `000-fe-portfolio`  
**Spec**: `/specs/000-fe-portfolio/spec.md`  
**Plan**: `/specs/000-fe-portfolio/plan.md`  
**Generated Artifacts**:

- `/specs/000-fe-portfolio/research.md`
- `/specs/000-fe-portfolio/data-model.md`
- `/specs/000-fe-portfolio/quickstart.md`
- `/specs/000-fe-portfolio/contracts/sanity-schema.ts`
- `.github/copilot-instructions.md` (updated)

**Next Command**: `/speckit.tasks` to generate task breakdown
