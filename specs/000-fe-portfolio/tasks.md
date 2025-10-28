# Tasks: Portfolio Website

**Input**: Design documents from `/specs/000-fe-portfolio/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Tests are NOT explicitly requested in the specification. Test tasks are included for critical user flows but can be skipped for MVP if needed.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Next.js App Router Web Application structure
- Source code: `src/` at repository root
- Tests: `tests/` at repository root
- Sanity Studio: `sanity/` separate workspace

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Next.js 14+ project with TypeScript in repository root using `create-next-app`
- [ ] T002 Configure TypeScript strict mode in tsconfig.json with `strict: true` and no `any` types
- [ ] T003 [P] Install and configure ESLint with Next.js recommended rules in .eslintrc.json
- [ ] T004 [P] Install and configure Prettier in .prettierrc.json
- [ ] T005 [P] Install and configure commitlint for Conventional Commits in .commitlintrc.json
- [ ] T006 [P] Install Husky for git hooks and configure pre-commit linting in .husky/
- [ ] T007 Create project directory structure per plan.md: src/app/, src/components/, src/lib/, src/styles/, src/types/
- [ ] T008 Install Sanity CLI and initialize Sanity Studio in sanity/ directory
- [ ] T009 Copy Sanity schema from specs/000-fe-portfolio/contracts/sanity-schema.ts to sanity/schemas/index.ts
- [ ] T010 Configure Sanity project in sanity/sanity.config.ts with project ID and dataset
- [ ] T011 [P] Install testing dependencies: Vitest, Playwright, @axe-core/playwright
- [ ] T012 [P] Configure Vitest in vitest.config.ts for unit tests
- [ ] T013 [P] Configure Playwright in playwright.config.ts for E2E tests
- [ ] T014 Create .env.local template with required environment variables (Sanity project ID, dataset, tokens, webhook secrets)
- [ ] T015 [P] Create .gitignore with Next.js, Sanity, and environment file patterns
- [ ] T016 [P] Install additional dependencies: Fuse.js for search, Sanity Image Loader
- [ ] T017 Configure next.config.js with image domains for Sanity CDN
- [ ] T018 [P] Create package.json scripts for dev, build, test, lint, format

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T019 Create Sanity client configuration in src/lib/sanity/client.ts with production and preview clients
- [ ] T020 Create TypeScript types for Sanity documents in src/types/sanity.ts (Author, WorkCaseStudy, LabProject, BlogPost, Tag, TechStack)
- [ ] T021 [P] Create domain model types in src/types/models.ts
- [ ] T022 Implement Sanity image URL builder utility in src/lib/sanity/image.ts
- [ ] T023 Create design tokens CSS variables in src/styles/globals.css (colors, typography, spacing)
- [ ] T024 Implement theme provider component in src/app/providers.tsx with dark/light mode support
- [ ] T025 Create root layout in src/app/layout.tsx with theme provider, metadata, and next/font configuration
- [ ] T026 [P] Configure Google Fonts using next/font in src/app/layout.tsx (Inter, JetBrains Mono)
- [ ] T027 Create base UI components: Button in src/components/ui/Button.tsx
- [ ] T028 [P] Create base UI components: Link in src/components/ui/Link.tsx
- [ ] T029 [P] Create base UI components: Card in src/components/ui/Card.tsx
- [ ] T030 Create header layout component in src/components/layouts/Header.tsx with navigation and theme toggle
- [ ] T031 Create footer layout component in src/components/layouts/Footer.tsx with social links and copyright
- [ ] T032 Implement ISR revalidation webhook handler in src/app/api/revalidate/route.ts with HMAC signature verification
- [ ] T033 [P] Implement draft preview mode endpoints in src/app/api/draft/route.ts and src/app/api/draft/disable/route.ts
- [ ] T034 Create loading state component in src/components/ui/Loading.tsx with skeleton patterns
- [ ] T035 [P] Create error state component in src/components/ui/Error.tsx with retry CTA
- [ ] T036 [P] Create empty state component in src/components/ui/Empty.tsx with branded message
- [ ] T037 Implement Fuse.js search utility in src/lib/search/index.ts with createSearchIndex function
- [ ] T038 Create accessibility utilities for focus management in src/lib/utils/a11y.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Recruiter Quick Assessment (Priority: P1) 🎯 MVP

**Goal**: Recruiters can quickly assess the candidate's capabilities within 2-3 minutes by viewing the homepage and one case study with clear role, skills, and impact metrics.

**Independent Test**: Navigate from homepage to one case study and back. Verify key information (role, skills, impact) visible without scrolling.

### Implementation for User Story 1

- [ ] T039 [P] [US1] Create GROQ query for homepage featured case studies in src/lib/sanity/queries.ts (getFeaturedCaseStudies)
- [ ] T040 [P] [US1] Create GROQ query for single case study by slug in src/lib/sanity/queries.ts (getCaseStudyBySlug)
- [ ] T041 [US1] Implement homepage in src/app/page.tsx with hero section showing name, role, tagline
- [ ] T042 [US1] Create hero section component in src/components/features/Hero.tsx with profile photo and key skills
- [ ] T043 [US1] Create case study card component in src/components/features/CaseStudyCard.tsx with title, company, role, impact preview
- [ ] T044 [US1] Add featured case studies section to homepage in src/app/page.tsx (3-4 cards)
- [ ] T045 [US1] Implement case study detail page in src/app/work/[slug]/page.tsx with SSG
- [ ] T046 [US1] Create case study layout component in src/components/features/CaseStudyLayout.tsx with sections: Challenge, Approach, Impact, Tech Stack, Role
- [ ] T047 [US1] Implement impact metrics display component in src/components/features/ImpactMetrics.tsx with before/after/improvement visualization
- [ ] T048 [US1] Add visual elements (screenshots, diagrams) rendering in case study detail using next/image
- [ ] T049 [US1] Implement CTAs at end of case study in src/components/features/CaseStudyCTA.tsx ("View Resume," "Contact Me," "See More Work")
- [ ] T050 [US1] Configure generateStaticParams in src/app/work/[slug]/page.tsx for SSG of all published case studies
- [ ] T051 [US1] Add OpenGraph metadata to case study pages in src/app/work/[slug]/page.tsx for social sharing
- [ ] T052 [US1] Implement Portable Text renderer for challenge and approach sections in src/components/PortableText.tsx
- [ ] T053 [US1] Create tech stack badge component in src/components/ui/TechBadge.tsx for displaying technologies
- [ ] T054 [US1] Ensure all interactive elements have visible focus indicators (3:1 contrast) per WCAG 2.2 AA
- [ ] T055 [US1] Test keyboard navigation from homepage to case study and back

**Checkpoint**: At this point, User Story 1 should be fully functional. Recruiters can view homepage and case studies with all key information visible.

---

## Phase 4: User Story 2 - Engineer Deep Dive Evaluation (Priority: P1)

**Goal**: Engineers can evaluate technical thinking and architectural decisions through detailed case studies and side projects with code snippets, architecture diagrams, and measurable outcomes.

**Independent Test**: Read a case study's technical sections and verify frameworks, patterns, metrics, and rationale are present. Visit Labs section and verify projects show what was built and learned.

### Implementation for User Story 2

- [ ] T056 [P] [US2] Create GROQ query for all lab projects in src/lib/sanity/queries.ts (getLabProjects)
- [ ] T057 [P] [US2] Create GROQ query for single lab project by slug in src/lib/sanity/queries.ts (getLabProjectBySlug)
- [ ] T058 [P] [US2] Create GROQ query for all blog posts in src/lib/sanity/queries.ts (getBlogPosts)
- [ ] T059 [P] [US2] Create GROQ query for single blog post by slug in src/lib/sanity/queries.ts (getBlogPostBySlug)
- [ ] T060 [US2] Enhance Portable Text renderer in src/components/PortableText.tsx to support code blocks with syntax highlighting
- [ ] T061 [US2] Add syntax highlighter package (e.g., Prism.js or Shiki) and configure in src/components/PortableText.tsx
- [ ] T062 [US2] Enhance case study approach section to render architecture diagrams and code examples
- [ ] T063 [US2] Add rationale/alternatives subsection to case study approach rendering
- [ ] T064 [US2] Implement Labs index page in src/app/labs/page.tsx with SSG
- [ ] T065 [US2] Create lab project card component in src/components/features/LabCard.tsx with title, description, learnings, tech stack
- [ ] T066 [US2] Implement lab project detail page in src/app/labs/[slug]/page.tsx with SSG
- [ ] T067 [US2] Create lab project layout component in src/components/features/LabLayout.tsx with: description, learnings, tech stack, links to demo/source
- [ ] T068 [US2] Add live demo and source code link buttons in src/components/features/LabLinks.tsx
- [ ] T069 [US2] Display maintenance status badge in lab project cards and details in src/components/ui/StatusBadge.tsx
- [ ] T070 [US2] Implement Blog index page in src/app/blog/page.tsx with SSG
- [ ] T071 [US2] Create blog post card component in src/components/features/BlogCard.tsx with title, excerpt, date, reading time, tags
- [ ] T072 [US2] Implement blog post detail page in src/app/blog/[slug]/page.tsx with SSG
- [ ] T073 [US2] Create blog post layout component in src/components/features/BlogLayout.tsx with article structure
- [ ] T074 [US2] Add copy-to-clipboard functionality for code blocks in src/components/CodeBlock.tsx
- [ ] T075 [US2] Configure generateStaticParams for lab projects in src/app/labs/[slug]/page.tsx
- [ ] T076 [US2] Configure generateStaticParams for blog posts in src/app/blog/[slug]/page.tsx
- [ ] T077 [US2] Add related blog posts section to lab project details using shared tags
- [ ] T078 [US2] Implement related case studies/projects linking in both directions
- [ ] T079 [US2] Ensure code snippets have sufficient color contrast in both light and dark themes

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Engineers can read technical depth in case studies, explore labs, and read blog posts.

---

## Phase 5: User Story 3 - Content Discovery and Navigation (Priority: P2)

**Goal**: Visitors can find specific content by topic, technology, or content type using search and filters, with results updating instantly and helpful empty states.

**Independent Test**: Use search/filter controls on list pages. Verify results update in <200ms, empty states are helpful, navigation remains consistent.

### Implementation for User Story 3

- [ ] T080 [P] [US3] Create GROQ query for global search index in src/lib/sanity/queries.ts (getSearchIndex)
- [ ] T081 [P] [US3] Create GROQ query for work index with all case studies in src/lib/sanity/queries.ts (getAllCaseStudies)
- [ ] T082 [US3] Implement Work index page in src/app/work/page.tsx with SSG and all case studies
- [ ] T083 [US3] Create filter component in src/components/features/Filter.tsx with role, technology, and tag filters
- [ ] T084 [US3] Implement client-side filtering logic in src/lib/utils/filters.ts with <200ms performance target
- [ ] T085 [US3] Add filter UI to Work index page with result count display
- [ ] T086 [US3] Create empty state component for filtered results in src/components/features/FilterEmptyState.tsx with suggested tags and "View All" link
- [ ] T087 [US3] Implement global search component in src/components/features/GlobalSearch.tsx using Fuse.js
- [ ] T088 [US3] Add global search to header navigation with dropdown results
- [ ] T089 [US3] Group search results by content type (Work, Labs, Blog) in dropdown
- [ ] T090 [US3] Implement search results preview with title and excerpt (first 100 chars)
- [ ] T091 [US3] Add debouncing to search input to optimize performance in src/lib/utils/debounce.ts
- [ ] T092 [US3] Create tag component in src/components/ui/Tag.tsx as clickable filter trigger
- [ ] T093 [US3] Implement tag filtering across all content types (when clicked, show all content with that tag)
- [ ] T094 [US3] Add tag filters to Blog index page with reading time and publish date sorting
- [ ] T095 [US3] Add tag filters to Labs index page
- [ ] T096 [US3] Ensure filter state persists in URL query parameters for shareable filtered views
- [ ] T097 [US3] Test filter performance with 100+ items to ensure <200ms target met
- [ ] T098 [US3] Implement keyboard navigation for search dropdown (arrow keys, Enter to select, Esc to close)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently. Visitors can discover content through search and filters.

---

## Phase 6: User Story 4 - Responsive and Accessible Experience (Priority: P2)

**Goal**: All visitors including those using assistive technology, keyboard navigation, or mobile devices can access all content without barriers, meeting WCAG 2.2 AA compliance.

**Independent Test**: Complete primary flows using keyboard-only navigation and screen reader. Verify touch targets ≥44×44px on mobile. Test dark mode contrast.

### Implementation for User Story 4

- [ ] T099 [P] [US4] Audit all components for semantic HTML (header, nav, main, aside, footer landmarks)
- [ ] T100 [P] [US4] Audit heading hierarchy across all pages (single h1, nested h2-h6)
- [ ] T101 [US4] Ensure all images have descriptive alt text (validate in Sanity schema and components)
- [ ] T102 [US4] Implement focus trap for modal overlays in src/lib/utils/focusTrap.ts
- [ ] T103 [US4] Add skip navigation link in src/components/layouts/Header.tsx
- [ ] T104 [US4] Implement mobile-responsive navigation with hamburger menu in src/components/layouts/MobileNav.tsx
- [ ] T105 [US4] Ensure all touch targets are ≥44×44px on mobile (buttons, links, filter controls)
- [ ] T106 [US4] Test and adjust responsive breakpoints in src/styles/globals.css
- [ ] T107 [US4] Validate color contrast ratios in both light and dark themes (4.5:1 for normal text, 3:1 for large text)
- [ ] T108 [US4] Implement `prefers-reduced-motion` media query support in src/styles/globals.css to disable non-essential animations
- [ ] T109 [US4] Add ARIA labels to icon-only buttons (theme toggle, mobile menu, search)
- [ ] T110 [US4] Implement aria-current="page" for active navigation links
- [ ] T111 [US4] Add aria-live regions for dynamic content updates (search results, filter results)
- [ ] T112 [US4] Ensure form inputs have associated labels (if any forms exist)
- [ ] T113 [US4] Configure Axe DevTools accessibility testing in tests/a11y/pages.test.ts
- [ ] T114 [US4] Write accessibility test for homepage in tests/a11y/homepage.test.ts
- [ ] T115 [US4] Write accessibility test for case study pages in tests/a11y/case-study.test.ts
- [ ] T116 [US4] Write accessibility test for blog pages in tests/a11y/blog.test.ts
- [ ] T117 [US4] Write keyboard navigation E2E test in tests/e2e/keyboard-nav.test.ts
- [ ] T118 [US4] Test mobile responsive layouts on real devices (iOS Safari, Android Chrome)
- [ ] T119 [US4] Validate INP (Interaction to Next Paint) ≤200ms for all interactive elements

**Checkpoint**: At this point, all user stories work with full accessibility compliance. Site meets WCAG 2.2 AA standards.

---

## Phase 7: User Story 5 - Social Sharing and Discovery (Priority: P3)

**Goal**: Content can be shared on social media with professional preview cards, discovered through search engines with proper metadata, and subscribed to via RSS.

**Independent Test**: Paste URLs into social media platforms and verify preview cards. Check sitemap and RSS feed validity.

### Implementation for User Story 5

- [ ] T120 [P] [US5] Implement generateMetadata function for homepage in src/app/page.tsx with OpenGraph and Twitter Card tags
- [ ] T121 [P] [US5] Implement generateMetadata function for case study pages in src/app/work/[slug]/page.tsx
- [ ] T122 [P] [US5] Implement generateMetadata function for lab project pages in src/app/labs/[slug]/page.tsx
- [ ] T123 [P] [US5] Implement generateMetadata function for blog post pages in src/app/blog/[slug]/page.tsx
- [ ] T124 [US5] Ensure all OpenGraph images are 1200×630px and properly formatted
- [ ] T125 [US5] Add canonical URLs to all page metadata
- [ ] T126 [US5] Implement JSON-LD structured data for Person schema on homepage in src/lib/utils/structuredData.ts
- [ ] T127 [US5] Implement JSON-LD structured data for Article schema on blog posts
- [ ] T128 [US5] Implement JSON-LD structured data for BreadcrumbList on detail pages
- [ ] T129 [US5] Create sitemap.xml generation in src/app/sitemap.ts with all published pages
- [ ] T130 [US5] Create robots.txt in src/app/robots.ts allowing all crawlers except draft/preview routes
- [ ] T131 [US5] Implement RSS feed generation in src/app/rss.xml/route.ts with RSS 2.0 format
- [ ] T132 [US5] Include full content or excerpts in RSS feed items
- [ ] T133 [US5] Add social share buttons to blog posts in src/components/features/ShareButtons.tsx (Twitter, LinkedIn, Copy Link)
- [ ] T134 [US5] Implement copy link functionality with clipboard API
- [ ] T135 [US5] Test OpenGraph preview cards on Twitter, LinkedIn, and Facebook using preview tools
- [ ] T136 [US5] Validate sitemap.xml format using XML validators
- [ ] T137 [US5] Validate RSS feed format using RSS validators

**Checkpoint**: Content is optimized for social sharing and search engine discovery. All metadata and feeds are valid.

---

## Phase 8: User Story 6 - Content Governance and Publishing (Priority: P3)

**Goal**: Content author can manage editorial workflows (draft → review → publish) with draft content filtered from production and ISR revalidation within 60s.

**Independent Test**: Create draft post in CMS, verify it doesn't appear in production. Publish it and confirm appearance within 60s. Test preview mode for drafts.

### Implementation for User Story 6

- [ ] T138 [P] [US6] Ensure all GROQ queries filter by `publishStatus == 'published'` in production client
- [ ] T139 [US6] Test draft filtering by creating draft content in Sanity and verifying it doesn't appear on site
- [ ] T140 [US6] Configure Sanity webhook in Sanity dashboard to call /api/revalidate endpoint
- [ ] T141 [US6] Add webhook payload parsing and validation in src/app/api/revalidate/route.ts
- [ ] T142 [US6] Implement revalidatePath and revalidateTag logic for each content type (work, labs, blog)
- [ ] T143 [US6] Add exponential backoff retry logic (3 retries) for webhook failures
- [ ] T144 [US6] Implement webhook error logging to monitoring service in src/lib/utils/logger.ts
- [ ] T145 [US6] Configure draft mode preview URLs in Sanity Studio presentation tool
- [ ] T146 [US6] Test preview mode by accessing preview URL and verifying draft content visible
- [ ] T147 [US6] Add "Exit Preview" banner component in src/components/PreviewBanner.tsx when in draft mode
- [ ] T148 [US6] Implement archived content handling (remove from lists, keep accessible via direct URL)
- [ ] T149 [US6] Add "This content is archived" notice component in src/components/ArchivedNotice.tsx
- [ ] T150 [US6] Test ISR revalidation timing: publish content in CMS, verify appearance on site within 60s
- [ ] T151 [US6] Monitor webhook delivery and revalidation success rates
- [ ] T152 [US6] Test content status transitions: draft → published → archived → published

**Checkpoint**: Content governance workflows are complete. Authors can safely manage content through editorial states.

---

## Phase 9: Additional Pages & Features

**Purpose**: Core pages not directly tied to a single user story but essential for portfolio completeness

- [ ] T153 [P] Create About page in src/app/about/page.tsx with author bio, skills, career timeline
- [ ] T154 [P] Create author query in src/lib/sanity/queries.ts (getAuthor)
- [ ] T155 Implement skills/expertise display component in src/components/features/Skills.tsx
- [ ] T156 Implement career timeline component in src/components/features/Timeline.tsx
- [ ] T157 Create resume/CV download page or link in navigation
- [ ] T158 Implement 404 page in src/app/not-found.tsx with branded error message and navigation
- [ ] T159 Implement 500 error page in src/app/error.tsx with error boundary
- [ ] T160 Add favicon and web app manifest in src/app/
- [ ] T161 Configure analytics (Vercel Analytics) in src/app/layout.tsx
- [ ] T162 Configure Speed Insights in src/app/layout.tsx

---

## Phase 10: Performance Optimization & Monitoring

**Purpose**: Ensure Core Web Vitals thresholds are met and performance is monitored

- [ ] T163 [P] Configure Lighthouse CI in lighthouserc.json with performance budgets
- [ ] T164 [P] Set performance budget thresholds: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1
- [ ] T165 Run Lighthouse on all key pages (homepage, work index, case study detail, blog post)
- [ ] T166 Optimize images: verify all use next/image, proper dimensions, lazy loading
- [ ] T167 Optimize fonts: verify next/font is configured correctly, no external requests
- [ ] T168 Audit third-party scripts and ensure lazy loading where appropriate
- [ ] T169 Add preconnect links for Sanity CDN in src/app/layout.tsx
- [ ] T170 Test Core Web Vitals on real mobile devices (low-end Android)
- [ ] T171 Configure Vercel Analytics to track Core Web Vitals in production
- [ ] T172 Set up alerts for Core Web Vitals regressions
- [ ] T173 Validate performance scores meet constitutional requirements (≥90 Lighthouse score)

---

## Phase 11: Testing & Quality Assurance

**Purpose**: Comprehensive testing across user stories

- [ ] T174 [P] Write unit test for theme toggle functionality in tests/unit/theme.test.ts
- [ ] T175 [P] Write unit test for search index creation in tests/unit/search.test.ts
- [ ] T176 [P] Write unit test for filter utility in tests/unit/filters.test.ts
- [ ] T177 Write E2E test for recruiter flow (homepage → case study → back) in tests/e2e/recruiter-flow.test.ts
- [ ] T178 Write E2E test for engineer flow (case study technical sections → labs → blog) in tests/e2e/engineer-flow.test.ts
- [ ] T179 Write E2E test for content discovery (search → filter → tag navigation) in tests/e2e/discovery-flow.test.ts
- [ ] T180 Write E2E test for content publishing workflow in tests/e2e/publishing.test.ts
- [ ] T181 Validate all forms (if any) have proper validation and error messages
- [ ] T182 Test error scenarios: network failures, missing images, API errors
- [ ] T183 Test empty states: no search results, no filtered results, no content
- [ ] T184 Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] T185 Mobile device testing (iOS, Android)
- [ ] T186 Run full accessibility audit and fix any violations

---

## Phase 12: Documentation & Deployment

**Purpose**: Prepare for production deployment

- [ ] T187 [P] Create README.md with project setup instructions
- [ ] T188 [P] Document environment variables in .env.example
- [ ] T189 Review and validate quickstart.md is up-to-date
- [ ] T190 Create deployment guide in docs/deployment.md
- [ ] T191 Configure Vercel project and connect repository
- [ ] T192 Set environment variables in Vercel dashboard
- [ ] T193 Configure custom domain in Vercel (sonbui.com)
- [ ] T194 Set up Sanity Studio deployment (sanity.studio subdomain or /studio route)
- [ ] T195 Configure Sanity webhook to production URL
- [ ] T196 Test production build locally with `npm run build && npm start`
- [ ] T197 Deploy to production and verify all functionality
- [ ] T198 Validate ISR revalidation in production environment
- [ ] T199 Monitor initial production metrics (Core Web Vitals, error rates)
- [ ] T200 Create content authoring guide for Sanity Studio users

---

## Phase 13: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and optimizations

- [ ] T201 [P] Code cleanup: remove console.logs, debug code, TODO comments
- [ ] T202 [P] Refactor duplicated code into shared utilities
- [ ] T203 [P] Run ESLint and fix all warnings
- [ ] T204 [P] Run Prettier formatting on all files
- [ ] T205 Optimize bundle size: analyze with Next.js bundle analyzer
- [ ] T206 Add loading indicators for slow network connections
- [ ] T207 Implement error tracking with Sentry or similar service
- [ ] T208 Add animation polish (transitions, micro-interactions) respecting prefers-reduced-motion
- [ ] T209 Review and optimize SEO for all pages (titles, descriptions, keywords)
- [ ] T210 Final accessibility review with screen reader testing
- [ ] T211 Security audit: check for exposed secrets, validate input sanitization
- [ ] T212 Performance audit: review React DevTools profiler for expensive re-renders
- [ ] T213 Validate all constitutional requirements are met
- [ ] T214 Create project handoff documentation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - US1 (Recruiter Assessment): Can start after Foundational - MVP target ✅
  - US2 (Engineer Evaluation): Can start after Foundational - Also P1 priority
  - US3 (Content Discovery): Can start after Foundational - Depends on US1, US2 content existing
  - US4 (Accessibility): Can start after Foundational - Applies to all pages
  - US5 (Social Sharing): Can start after US1, US2 have pages to share
  - US6 (Content Governance): Can start after Foundational - Infrastructure concern
- **Additional Pages (Phase 9)**: Can run in parallel with user stories
- **Performance (Phase 10)**: After major implementation complete
- **Testing (Phase 11)**: Throughout development, final pass after implementation
- **Deployment (Phase 12)**: After testing complete
- **Polish (Phase 13)**: After deployment, ongoing

### User Story Dependencies

- **User Story 1 (P1 - MVP)**: Independent after Foundational
- **User Story 2 (P1)**: Independent after Foundational, enhances US1
- **User Story 3 (P2)**: Depends on US1 & US2 having content to search/filter
- **User Story 4 (P2)**: Independent, applies across all stories
- **User Story 5 (P3)**: Depends on US1 & US2 having pages to share
- **User Story 6 (P3)**: Independent infrastructure concern

### Within Each User Story

- GROQ queries before page implementation
- Components before pages that use them
- Layout components before detail pages
- SSG configuration after page implementation
- Metadata after page content complete

### Parallel Opportunities

**Setup Phase**:

- T003 (ESLint), T004 (Prettier), T005 (commitlint), T006 (Husky) can run together
- T011 (testing deps), T012 (Vitest), T013 (Playwright), T015 (gitignore), T016 (additional deps) can run together
- T018 (package.json scripts) can run in parallel with config files

**Foundational Phase**:

- T021 (model types) can run with T020 (Sanity types)
- T026 (fonts), T027-T029 (UI components), T034-T036 (state components) can run together
- T033 (preview endpoints) can run with T032 (revalidation)

**User Story 1**:

- T039 (queries) and T040 (queries) can run together
- T042 (hero), T043 (card) can be built in parallel
- T052 (Portable Text), T053 (tech badge) can run together

**User Story 2**:

- T056-T059 (all queries) can run in parallel
- T064 (Labs index), T070 (Blog index) can run in parallel
- T065 (lab card), T071 (blog card) can run in parallel
- T066 (lab detail), T072 (blog detail) can run in parallel

**User Story 3**:

- T080-T082 (queries) can run together
- T084 (filter logic), T091 (debounce) can run in parallel
- T092 (tag component), T093 (tag filtering) require sequential order

**User Story 4**:

- T099 (semantic HTML audit), T100 (heading audit), T101 (alt text audit) can run together
- T113-T116 (all a11y tests) can run in parallel

**User Story 5**:

- T120-T123 (all metadata functions) can run in parallel
- T126-T128 (structured data) can run in parallel
- T129 (sitemap), T130 (robots.txt), T131 (RSS) can run in parallel

**User Story 6**:

- T138 (query filtering), T141 (webhook parsing) can run in parallel
- Testing tasks can be parallelized

**Throughout**:

- Different user stories can be worked on in parallel by different team members after Foundational phase

---

## Parallel Example: User Story 1 (Recruiter Assessment)

```bash
# Launch queries together:
Task: "Create GROQ query for homepage featured case studies"
Task: "Create GROQ query for single case study by slug"

# Build components in parallel:
Task: "Create hero section component"
Task: "Create case study card component"
Task: "Implement Portable Text renderer"
Task: "Create tech stack badge component"

# Different pages can be built simultaneously:
Task: "Implement homepage"
Task: "Implement case study detail page"
```

---

## Parallel Example: Multiple User Stories (After Foundational Complete)

```bash
# Team can split by user story:
Developer A: User Story 1 (T039-T055) - Homepage & Case Studies
Developer B: User Story 2 (T056-T079) - Labs & Blog
Developer C: User Story 4 (T099-T119) - Accessibility
Developer D: User Story 6 (T138-T152) - Content Governance
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

**Goal**: Ship core portfolio functionality that delivers recruiter and engineer value

1. Complete **Phase 1**: Setup (T001-T018)
2. Complete **Phase 2**: Foundational (T019-T038) - CRITICAL blocker
3. Complete **Phase 3**: User Story 1 - Recruiter Assessment (T039-T055)
4. Complete **Phase 4**: User Story 2 - Engineer Deep Dive (T056-T079)
5. Add **About page** from Phase 9 (T153-T156)
6. **VALIDATE**: Test core flows independently
7. **Minimal Testing**: Run accessibility tests (T114-T116) and key E2E tests (T177-T178)
8. **Deploy MVP**: Phase 12 deployment (T191-T199)

**MVP Delivered**: Portfolio with homepage, case studies, labs, blog, and about page. Ready for recruiters and engineers.

### Incremental Delivery (Recommended)

**Release 1 (MVP - Weeks 1-3)**:

- Phase 1: Setup
- Phase 2: Foundational
- Phase 3: User Story 1 (Recruiter)
- Phase 4: User Story 2 (Engineer)
- Phase 9: About page
- Phase 12: Deploy

**Release 2 (Enhanced Discovery - Week 4)**:

- Phase 5: User Story 3 (Content Discovery with search/filters)
- Test and deploy incrementally

**Release 3 (Accessibility & SEO - Week 5)**:

- Phase 6: User Story 4 (Full accessibility compliance)
- Phase 7: User Story 5 (Social sharing & SEO)
- Phase 10: Performance optimization
- Test and deploy

**Release 4 (Content Management - Week 6)**:

- Phase 8: User Story 6 (Content governance)
- Phase 11: Comprehensive testing
- Phase 13: Polish

### Parallel Team Strategy

**With 3-4 developers after Foundational phase completes**:

- **Dev A**: User Story 1 + User Story 2 (core content pages)
- **Dev B**: User Story 3 (search & filtering)
- **Dev C**: User Story 4 + User Story 5 (accessibility & SEO)
- **Dev D**: User Story 6 + Phase 9 (content governance & additional pages)

Stories integrate independently, merge when complete.

---

## Task Summary

- **Total Tasks**: 214
- **Setup Phase**: 18 tasks
- **Foundational Phase**: 20 tasks (CRITICAL - blocks all user stories)
- **User Story 1 (P1 - MVP)**: 17 tasks
- **User Story 2 (P1)**: 24 tasks
- **User Story 3 (P2)**: 19 tasks
- **User Story 4 (P2)**: 21 tasks
- **User Story 5 (P3)**: 18 tasks
- **User Story 6 (P3)**: 15 tasks
- **Additional Pages**: 10 tasks
- **Performance**: 11 tasks
- **Testing**: 13 tasks
- **Deployment**: 14 tasks
- **Polish**: 14 tasks

**Parallelizable Tasks**: 89 tasks marked with [P]

**MVP Scope** (Recommended): Phases 1, 2, 3, 4, and subset of Phase 9 (About page) = ~80 tasks for functional portfolio

**Full Feature Complete**: All 214 tasks

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label (US1-US6) maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Tests are included but can be deprioritized for MVP if needed (spec doesn't explicitly require TDD)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Constitutional requirements validated in Phase 10 and Phase 13
- All file paths are explicit and follow Next.js App Router conventions
