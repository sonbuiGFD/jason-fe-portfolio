# Tasks: FE Engineer Portfolio

**Input**: Design documents from `/specs/000-fe-portfolio/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Manual testing and Lighthouse CI approach per research.md - NO unit tests required in initial implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Next.js App Router structure:

- `app/` - Next.js pages and routing
- `components/` - React components
- `lib/` - Business logic and utilities
- `styles/` - Global styles and SCSS modules
- `sanity/` - Sanity CMS schemas and configuration
- `public/` - Static assets

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js 14+ project with TypeScript and App Router in project root
- [x] T002 [P] Install core dependencies: React 18+, Next.js 14+, TypeScript 5.3+, TailwindCSS 3.4+, Motion (Framer Motion) 11+
- [x] T003 [P] Install Sanity dependencies: @sanity/client, @sanity/image-url, next-sanity, groq
- [x] T004 [P] Configure TypeScript in tsconfig.json with strict mode and path aliases (@/)
- [x] T005 [P] Configure TailwindCSS in tailwind.config.ts with custom theme tokens and content paths
- [x] T006 [P] Configure ESLint in .eslintrc.json with Next.js, React, TypeScript, accessibility rules (eslint-plugin-jsx-a11y)
- [x] T007 [P] Configure Prettier in .prettierrc with formatting rules
- [x] T008 [P] Setup global styles in styles/globals.scss with TailwindCSS imports and CSS variables for dark/light themes
- [x] T009 [P] Create SCSS theme variables in styles/themes.scss for light and dark mode color schemes
- [x] T010 [P] Configure Next.js in next.config.js with image domains (cdn.sanity.io), experimental features, and build optimizations
- [x] T011 [P] Setup environment variables template in .env.local.example with Sanity configuration placeholders
- [x] T012 [P] Create project folder structure per plan.md: app/, components/, lib/, styles/, sanity/, public/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T013 Initialize Sanity project and create sanity.config.ts in sanity/ directory with project configuration
- [ ] T014 [P] Implement Author schema in sanity/schemas/author.ts with validation rules per data-model.md
- [ ] T015 [P] Implement TechStack schema in sanity/schemas/techStack.ts with category enum validation
- [ ] T016 [P] Implement Tag schema in sanity/schemas/tag.ts with slug auto-generation
- [ ] T017 [P] Implement WorkCaseStudy schema in sanity/schemas/workCaseStudy.ts with rich text blocks and references
- [ ] T018 [P] Implement LabProject schema in sanity/schemas/labProject.ts with demo/repository URL fields
- [ ] T019 [P] Implement BlogPost schema in sanity/schemas/blogPost.ts with code block support and reading time
- [ ] T020 Export all schemas in sanity/schemas/index.ts and configure in sanity.config.ts
- [ ] T021 Create Sanity client configuration in lib/sanity/client.ts with CDN and non-CDN client instances
- [ ] T022 [P] Define TypeScript types in lib/sanity/types.ts matching contracts/api-types.ts
- [ ] T023 [P] Create Sanity image URL builder helper in lib/sanity/image-builder.ts for responsive images
- [ ] T024 [P] Implement GROQ queries in lib/sanity/queries.ts for all content types per data-model.md access patterns
- [ ] T025 Create root layout in app/layout.tsx with metadata, font optimization, and theme provider structure
- [ ] T026 [P] Implement ThemeProvider context in components/layout/ThemeProvider.tsx with dark/light mode toggle and localStorage persistence
- [ ] T027 [P] Create Header component in components/layout/Header.tsx with global navigation and theme toggle
- [ ] T028 [P] Create Footer component in components/layout/Footer.tsx with social links and accessibility statement
- [ ] T029 [P] Create reusable Button component in components/ui/Button.tsx with variants and accessibility
- [ ] T030 [P] Create reusable Card component in components/ui/Card.tsx with consistent styling
- [ ] T031 [P] Implement LoadingState skeleton component in components/ui/LoadingState.tsx with animation
- [ ] T032 [P] Implement EmptyState component in components/ui/EmptyState.tsx with contextual messaging
- [ ] T033 [P] Implement ErrorState component in components/ui/ErrorState.tsx with retry functionality
- [ ] T034 [P] Create ScrollReveal animation wrapper in components/animations/ScrollReveal.tsx using Motion with viewport detection
- [ ] T035 [P] Create utility function for reading time calculation in lib/utils/reading-time.ts
- [ ] T036 [P] Create utility function for date formatting in lib/utils/date-formatter.ts
- [ ] T037 [P] Create utility function for slug generation in lib/utils/slug-generator.ts
- [ ] T038 Setup Lighthouse CI configuration in .github/workflows/lighthouse.yml with performance budgets (Performance ≥90, Accessibility ≥95, SEO ≥90)
- [ ] T039 [P] Configure Git pre-commit hooks for ESLint and Prettier using husky or lint-staged

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 4 - Site-Wide Navigation and Responsiveness (Priority: P1) 🎯 MVP Foundation

**Goal**: Establish accessible, responsive navigation and theme support that all other features depend on

**Independent Test**: Navigate the site on mobile and desktop, toggle dark/light mode, use keyboard-only navigation (Tab through all links), run Lighthouse accessibility audit (score ≥95), verify responsive breakpoints at 320px, 768px, 1024px, 1440px

### Implementation for User Story 4

- [ ] T040 [US4] Implement home page in app/page.tsx with hero section, overview, and scroll-triggered animations
- [ ] T041 [P] [US4] Implement About page in app/about/page.tsx with author bio and social links
- [ ] T042 [P] [US4] Create NavMenu component in components/navigation/NavMenu.tsx for desktop navigation with active states
- [ ] T043 [P] [US4] Create MobileMenu component in components/navigation/MobileMenu.tsx with slide-out drawer and close functionality
- [ ] T044 [US4] Integrate NavMenu and MobileMenu into Header component with responsive breakpoint logic
- [ ] T045 [US4] Implement keyboard navigation focus styles in styles/globals.scss with WCAG 2.2 AA compliant contrast (3:1 for UI components)
- [ ] T046 [US4] Add ARIA labels and semantic landmarks (header, nav, main, footer) across layout components
- [ ] T047 [P] [US4] Create component-specific SCSS for navigation in styles/components/\_navigation.scss with BEM naming conventions
- [ ] T048 [US4] Test responsive design manually across mobile (375px), tablet (768px), desktop (1440px) and verify no horizontal scrolling
- [ ] T049 [US4] Test keyboard navigation manually (Tab, Enter, Escape) and verify logical focus order and visible focus states
- [ ] T050 [US4] Run Lighthouse accessibility audit and fix any issues to achieve score ≥95

**Checkpoint**: At this point, navigation, theming, and responsive layout should be fully functional across all devices and accessibility compliant

---

## Phase 4: User Story 1 - Portfolio Discovery by Recruiter (Priority: P1) 🎯 MVP Core

**Goal**: Enable recruiters to discover and read work case studies with filtering by tech stack and role type

**Independent Test**: Navigate from home page → Work Experience index → filter by "React" tech stack → open a case study detail page → verify all content loads with proper formatting, images from Sanity CDN, and social sharing metadata

### Implementation for User Story 1

- [ ] T051 [P] [US1] Create Work index page in app/work/page.tsx with SSG/ISR, fetch published case studies with pagination (first 20 items)
- [ ] T052 [P] [US1] Create CaseStudyCard component in components/content/CaseStudyCard.tsx with title, summary, tech stack tags, hero image, and role type
- [ ] T053 [P] [US1] Create FilterBar component in components/content/FilterBar.tsx with tech stack and role type filter controls
- [ ] T054 [US1] Implement client-side filtering logic in Work index page to filter by tech stack and role type, update URL params
- [ ] T055 [US1] Add empty state handling in Work index when no case studies match filters using EmptyState component
- [ ] T056 [US1] Create Work case study detail page in app/work/[slug]/page.tsx with SSG/ISR, fetch single case study by slug
- [ ] T057 [US1] Implement generateStaticParams in app/work/[slug]/page.tsx to pre-render all published case study paths
- [ ] T058 [US1] Render case study detail page sections: problem statement, approach, architecture, impact with rich text rendering
- [ ] T059 [US1] Integrate Sanity image URL builder for hero images and inline images with next/image optimization
- [ ] T060 [US1] Add OpenGraph and Twitter Card metadata generation in generateMetadata for case study detail pages
- [ ] T061 [P] [US1] Create component-specific SCSS for case study cards in styles/components/\_card.scss with BEM naming conventions
- [ ] T062 [US1] Implement scroll-triggered animations for case study sections using ScrollReveal component
- [ ] T063 [US1] Test Work index filtering manually (apply React filter, verify only React case studies appear, check URL updates)
- [ ] T064 [US1] Test case study detail page manually (verify all sections render, images load from Sanity CDN, metadata present)
- [ ] T065 [US1] Run Lighthouse performance audit on Work pages and optimize to achieve Performance score ≥90, LCP ≤2.5s

**Checkpoint**: At this point, User Story 1 should be fully functional - recruiters can browse and read case studies with filtering

---

## Phase 5: User Story 2 - Technical Deep Dive by Peer Engineer (Priority: P2)

**Goal**: Enable peer engineers to explore detailed case studies and side-project labs with technical depth

**Independent Test**: Navigate to a case study detail page → verify architecture diagrams and technical decisions render → navigate to Labs index → filter by tech stack → open a lab project detail → verify experiment goal, learnings, and demo/repo links

### Implementation for User Story 2

- [ ] T066 [P] [US2] Create Labs index page in app/labs/page.tsx with SSG/ISR, fetch published lab projects with pagination (first 20 items)
- [ ] T067 [P] [US2] Create LabProjectCard component in components/content/LabProjectCard.tsx with thumbnail, title, description, tech stack tags
- [ ] T068 [US2] Implement client-side filtering logic in Labs index page to filter by tech stack, reuse FilterBar component
- [ ] T069 [US2] Add empty state handling in Labs index when no projects match filters
- [ ] T070 [US2] Create Labs project detail page in app/labs/[slug]/page.tsx with SSG/ISR, fetch single lab project by slug
- [ ] T071 [US2] Implement generateStaticParams in app/labs/[slug]/page.tsx to pre-render all published lab project paths
- [ ] T072 [US2] Render lab project detail page sections: experiment goal, key learnings, tech stack, demo/repository links
- [ ] T073 [US2] Add OpenGraph and Twitter Card metadata generation in generateMetadata for lab project detail pages
- [ ] T074 [US2] Implement code snippet rendering with syntax highlighting in case study and lab project detail pages
- [ ] T075 [P] [US2] Create CodeBlock component in components/ui/CodeBlock.tsx with syntax highlighting (using prism-react-renderer or highlight.js) and copy-to-clipboard button
- [ ] T076 [US2] Integrate CodeBlock component into rich text rendering for case studies and lab projects
- [ ] T077 [P] [US2] Create component-specific SCSS for code blocks in styles/components/\_code-block.scss with BEM naming conventions
- [ ] T078 [US2] Test Labs index filtering manually (apply tech stack filter, verify results, check URL updates)
- [ ] T079 [US2] Test lab project detail page manually (verify all sections render, demo/repo links work, code syntax highlighting works)
- [ ] T080 [US2] Test copy-to-clipboard functionality in code blocks and verify confirmation feedback
- [ ] T081 [US2] Run Lighthouse performance audit on Labs pages and optimize to achieve Performance score ≥90

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - recruiters can view case studies, engineers can explore labs and see technical details

---

## Phase 6: User Story 3 - Content Discovery by Learner (Priority: P3)

**Goal**: Enable learners to discover and read blog posts with search, filtering by tags, and related post suggestions

**Independent Test**: Navigate to Blog index → search for "React hooks" → verify search results → filter by "Performance" tag → open a blog post → verify formatting, code snippets, reading time, and related posts section

### Implementation for User Story 3

- [ ] T082 [P] [US3] Create Blog index page in app/blog/page.tsx with SSG/ISR, fetch published blog posts sorted by date with pagination (first 20 items)
- [ ] T083 [P] [US3] Create BlogPostCard component in components/content/BlogPostCard.tsx with title, summary, tags, reading time, publish date, author
- [ ] T084 [US3] Implement client-side filtering logic in Blog index page to filter by tags, reuse FilterBar component adapted for tags
- [ ] T085 [US3] Add empty state handling in Blog index when no posts match filters or search query
- [ ] T086 [US3] Create Blog post detail page in app/blog/[slug]/page.tsx with SSG/ISR, fetch single blog post by slug
- [ ] T087 [US3] Implement generateStaticParams in app/blog/[slug]/page.tsx to pre-render all published blog post paths
- [ ] T088 [US3] Render blog post detail page with full content, author info, publish/update dates, reading time, tags
- [ ] T089 [US3] Integrate CodeBlock component for code snippets in blog post content with language-specific syntax highlighting
- [ ] T090 [US3] Add OpenGraph and Twitter Card metadata generation in generateMetadata for blog post detail pages
- [ ] T091 [P] [US3] Create RelatedPosts component in components/content/RelatedPosts.tsx to fetch and display related posts by shared tags
- [ ] T092 [US3] Integrate RelatedPosts component at end of blog post detail page with GROQ query for related content
- [ ] T093 [US3] Build search index generation script in lib/search/build-index.ts to query all published content and create JSON index per search-index-schema.json
- [ ] T094 [P] [US3] Implement client-side search logic in lib/search/search-client.ts using Fuse.js with fuzzy matching (threshold: 0.3, weighted keys)
- [ ] T095 [P] [US3] Create SearchModal component in components/navigation/SearchModal.tsx with input, results grouping by type, keyboard navigation
- [ ] T096 [US3] Create search API route in app/api/search/route.ts to serve pre-built search index as JSON
- [ ] T097 [US3] Integrate SearchModal into Header component with global keyboard shortcut (Cmd+K / Ctrl+K) and click trigger
- [ ] T098 [US3] Test Blog index filtering manually (apply tag filter, verify results, check URL updates)
- [ ] T099 [US3] Test blog post detail page manually (verify content renders, reading time accurate, related posts appear)
- [ ] T100 [US3] Test search functionality manually (search for "React", verify grouped results, test keyboard navigation)
- [ ] T101 [US3] Run Lighthouse performance audit on Blog pages and optimize to achieve Performance score ≥90

**Checkpoint**: All three main content types (Work, Labs, Blog) should now be independently functional with search and filtering

---

## Phase 7: User Story 5 - Content Governance and Editorial Workflow (Priority: P2)

**Goal**: Enable content author to manage content through Sanity CMS with draft/review/published workflow, ensuring only published content appears on public site

**Independent Test**: Create a blog post in Sanity Studio with "draft" status → verify it doesn't appear on public Blog index → change status to "published" → verify it appears on public site after ISR revalidation

### Implementation for User Story 5

- [ ] T102 [US5] Implement status filtering in all GROQ queries in lib/sanity/queries.ts to exclude draft and review content (status == "published")
- [ ] T103 [P] [US5] Create ISR revalidation API route in app/api/revalidate/route.ts with secret validation and tag-based revalidation
- [ ] T104 [US5] Configure ISR revalidation in Work index and detail pages with revalidate option (e.g., 3600 seconds)
- [ ] T105 [US5] Configure ISR revalidation in Labs index and detail pages with revalidate option
- [ ] T106 [US5] Configure ISR revalidation in Blog index and detail pages with revalidate option
- [ ] T107 [US5] Add 404 handling for unpublished content in detail pages (redirect to 404 or show "not found" message)
- [ ] T108 [US5] Create custom 404 page in app/not-found.tsx with branded messaging and navigation links
- [ ] T109 [US5] Test content governance manually in Sanity Studio (create draft content, verify not visible, publish, verify visible after revalidation)
- [ ] T110 [US5] Document Sanity webhook configuration in quickstart.md for ISR revalidation on content publish

**Checkpoint**: Content workflow is secure - only published content visible on public site, draft/review content hidden

---

## Phase 8: User Story 6 - SEO and Content Discovery by Search Engines (Priority: P2)

**Goal**: Enable search engines to crawl and index the portfolio with proper metadata, sitemaps, and RSS feeds for organic traffic

**Independent Test**: Validate sitemap.xml in browser → validate RSS feed at /blog/rss.xml using W3C Feed Validator → test social share link on Twitter/LinkedIn (verify OpenGraph preview) → run Lighthouse SEO audit (score ≥90)

### Implementation for User Story 6

- [ ] T111 [P] [US6] Create dynamic sitemap route in app/sitemap.xml/route.ts to query all published content and generate XML sitemap
- [ ] T112 [P] [US6] Create dynamic RSS feed route in app/rss.xml/route.ts to query latest blog posts and generate RSS 2.0 feed
- [ ] T113 [P] [US6] Create robots.txt in public/robots.txt with sitemap reference and crawler permissions
- [ ] T114 [US6] Implement generateMetadata in all page components (home, about, work, labs, blog) with title, description, canonical URL
- [ ] T115 [US6] Add structured data (JSON-LD) for WebSite schema in root layout
- [ ] T116 [P] [US6] Add structured data (JSON-LD) for BlogPosting schema in blog post detail pages
- [ ] T117 [P] [US6] Add structured data (JSON-LD) for Person schema in About page using author data from Sanity
- [ ] T118 [US6] Implement social sharing functionality (copy link button) on case studies, lab projects, and blog posts
- [ ] T119 [US6] Test sitemap.xml manually (verify all published pages included, valid XML format)
- [ ] T120 [US6] Test RSS feed manually (verify latest posts included, valid RSS 2.0 format)
- [ ] T121 [US6] Test OpenGraph metadata manually (share links on Twitter/LinkedIn, verify preview images and descriptions)
- [ ] T122 [US6] Run Lighthouse SEO audit and fix any issues to achieve score ≥90

**Checkpoint**: Portfolio is fully discoverable by search engines with proper metadata and feeds

---

## Phase 9: User Story 7 - Observability and Success Tracking (Priority: P3)

**Goal**: Enable portfolio owner to track visitor engagement through telemetry events to measure success and inform content strategy

**Independent Test**: Trigger telemetry events (view case study, copy link, scroll milestones) → verify events logged with correct metadata (page URL, timestamp, action type) → review analytics dashboard (if integrated)

### Implementation for User Story 7

- [ ] T123 [P] [US7] Create telemetry events utility in lib/telemetry/events.ts with privacy-first event logging (no personal data)
- [ ] T124 [P] [US7] Integrate telemetry event tracking for page views on all content detail pages (case studies, labs, blog posts)
- [ ] T125 [P] [US7] Integrate telemetry event tracking for "Copy Link" actions on share buttons
- [ ] T126 [P] [US7] Integrate telemetry event tracking for scroll depth milestones (25%, 50%, 75%, 100%) on long content pages
- [ ] T127 [US7] Configure Vercel Analytics or Plausible Analytics integration for privacy-first analytics tracking
- [ ] T128 [US7] Test telemetry events manually (trigger page view, copy link, scroll events) and verify events logged correctly
- [ ] T129 [US7] Document analytics integration and event tracking in quickstart.md

**Checkpoint**: Portfolio owner can track engagement metrics without collecting personal data

---

## Phase 10: Pagination and Performance Optimization

**Goal**: Implement "Load More" pagination for all content indices to handle scale and maintain performance

**Independent Test**: Navigate to Blog index → verify first 20 posts load → click "Load More" button → verify next 20 posts append without page reload → check Lighthouse Performance score ≥90

### Implementation for Pagination

- [ ] T130 [P] Create pagination API route for Work case studies in app/api/work/items/route.ts accepting offset and limit params
- [ ] T131 [P] Create pagination API route for Labs projects in app/api/labs/items/route.ts accepting offset and limit params
- [ ] T132 [P] Create pagination API route for Blog posts in app/api/blog/items/route.ts accepting offset and limit params
- [ ] T133 [P] Create LoadMoreButton component in components/content/LoadMoreButton.tsx with loading state and remaining count
- [ ] T134 Integrate LoadMoreButton into Work index page with client-side fetch logic to append new items
- [ ] T135 Integrate LoadMoreButton into Labs index page with client-side fetch logic
- [ ] T136 Integrate LoadMoreButton into Blog index page with client-side fetch logic
- [ ] T137 Test "Load More" functionality manually on all indices (verify items append, loading states, total count accurate)
- [ ] T138 Run Lighthouse performance audit on paginated pages and verify Performance score ≥90, LCP ≤2.5s maintained

**Checkpoint**: All content indices support pagination with optimal performance

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final quality assurance

- [ ] T139 [P] Add page transition animations using PageTransition component in components/animations/PageTransition.tsx wrapping page content
- [ ] T140 [P] Implement CMS outage handling with stale content banner in all pages when Sanity queries fail (serve cached data)
- [ ] T141 [P] Optimize all images in Sanity Studio (ensure proper dimensions, compression, WebP/AVIF format support)
- [ ] T142 [P] Add preconnect link tags for Sanity CDN in root layout head for faster image loading
- [ ] T143 [P] Configure font optimization with next/font for all custom fonts (if any) or system font stack
- [ ] T144 [P] Add meta viewport tag and charset in root layout for proper mobile rendering
- [ ] T145 Implement browser support detection and upgrade message for unsupported browsers (IE11 and older)
- [ ] T146 Test site manually with JavaScript disabled (verify core content accessible via SSR/SSG)
- [ ] T147 Test dark/light mode toggle across all pages and verify no visual regressions or contrast issues
- [ ] T148 Test animations respect prefers-reduced-motion setting (disable animations when enabled)
- [ ] T149 [P] Run cross-browser testing manually on Chrome, Firefox, Safari (macOS/iOS), Edge (latest 2 versions)
- [ ] T150 [P] Run real-device testing on iPhone (Safari), Android (Chrome), tablet, desktop
- [ ] T151 [P] Run final Lighthouse audits on all key pages (home, work index, work detail, labs, blog) and verify all scores meet targets
- [ ] T152 Update README.md with project overview, setup instructions, deployment guide
- [ ] T153 Update quickstart.md with any new configuration steps discovered during implementation
- [ ] T154 [P] Code cleanup and refactoring: remove dead code, consolidate utilities, improve TypeScript types
- [ ] T155 [P] Security review: validate all environment variables, check for exposed secrets, review CORS settings
- [ ] T156 Run complete manual testing workflow per quickstart.md to validate all user stories end-to-end
- [ ] T157 Document known issues or technical debt in GitHub issues for post-launch improvements

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 4 (Phase 3)**: Depends on Foundational completion - Foundation for all other stories (navigation, theming, responsive layout)
- **User Story 1 (Phase 4)**: Depends on Foundational + US4 completion - MVP core feature
- **User Story 2 (Phase 5)**: Depends on Foundational + US4 completion - Can run parallel with US1 if staffed
- **User Story 3 (Phase 6)**: Depends on Foundational + US4 completion - Can run parallel with US1/US2 if staffed
- **User Story 5 (Phase 7)**: Depends on US1, US2, US3 completion (requires content pages to exist)
- **User Story 6 (Phase 8)**: Depends on US1, US2, US3 completion (requires content to generate sitemap/RSS)
- **User Story 7 (Phase 9)**: Depends on US1, US2, US3 completion (requires pages to track)
- **Pagination (Phase 10)**: Depends on US1, US2, US3 completion (enhances existing indices)
- **Polish (Phase 11)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 4 (Site Navigation - P1)**: FOUNDATION - Must complete before any content stories
- **User Story 1 (Portfolio Discovery - P1)**: Independent after US4 - No dependencies on other content stories
- **User Story 2 (Technical Deep Dive - P2)**: Independent after US4 - Can start in parallel with US1
- **User Story 3 (Content Discovery - P3)**: Independent after US4 - Can start in parallel with US1/US2
- **User Story 5 (Content Governance - P2)**: Depends on US1, US2, US3 having content pages to apply governance to
- **User Story 6 (SEO - P2)**: Depends on US1, US2, US3 having content to index
- **User Story 7 (Observability - P3)**: Depends on US1, US2, US3 having pages to track

### Within Each User Story

- Layout and navigation components (US4) before content pages
- Sanity schemas before page queries
- Index pages before detail pages (establish patterns)
- Component creation before integration
- Core functionality before animations/polish
- Manual testing before Lighthouse audits
- Story complete before moving to next priority

### Parallel Opportunities

- **Setup Phase**: All tasks marked [P] (T002-T012) can run in parallel
- **Foundational Phase**: Tasks T014-T019 (schemas), T022-T024 (Sanity utilities), T026-T037 (components) can run in parallel
- **Once US4 Completes**: US1, US2, US3 can all start in parallel (if team capacity allows)
- **Within Each Story**: Tasks marked [P] within the same story can run in parallel (e.g., T051 and T052 in US1)

---

## Parallel Example: User Story 1 (Work Case Studies)

```bash
# Can run in parallel (different files):
T051: "Create Work index page in app/work/page.tsx"
T052: "Create CaseStudyCard component in components/content/CaseStudyCard.tsx"
T053: "Create FilterBar component in components/content/FilterBar.tsx"
T061: "Create SCSS for cards in styles/components/_card.scss"

# Must run sequentially (same file or dependencies):
T054: "Implement filtering logic in Work index" (depends on T051, T052, T053)
T056: "Create case study detail page" (can start after T051 pattern established)
T062: "Add scroll animations" (depends on T056 having content)
```

---

## Implementation Strategy

### MVP First (US4 + US1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 4 (Navigation & Responsive Design) - FOUNDATION
4. Complete Phase 4: User Story 1 (Work Case Studies)
5. **STOP and VALIDATE**: Test US1 independently (browse case studies, filter by tech stack, read detail pages)
6. Deploy/demo if ready - this is a functional MVP showcasing professional work

### Incremental Delivery

1. Complete Setup + Foundational + US4 → Foundation ready (navigation, theming, responsive)
2. Add User Story 1 (Work) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Labs) → Test independently → Deploy/Demo
4. Add User Story 3 (Blog + Search) → Test independently → Deploy/Demo
5. Add User Story 5 (Content Governance) → Test → Deploy
6. Add User Story 6 (SEO) → Test → Deploy
7. Add User Story 7 (Analytics) → Test → Deploy
8. Add Pagination (Phase 10) → Test → Deploy
9. Polish (Phase 11) → Final QA → Production Launch

Each increment adds value without breaking previous functionality.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational + US4 together
2. Once US4 is done (navigation foundation ready):
   - Developer A: User Story 1 (Work)
   - Developer B: User Story 2 (Labs)
   - Developer C: User Story 3 (Blog + Search)
3. Stories complete and integrate independently
4. Proceed to dependent stories (US5, US6, US7) sequentially or as capacity allows

---

## Total Task Count Summary

- **Phase 1 (Setup)**: 12 tasks
- **Phase 2 (Foundational)**: 27 tasks (T013-T039)
- **Phase 3 (US4 - Navigation)**: 11 tasks (T040-T050)
- **Phase 4 (US1 - Work)**: 15 tasks (T051-T065)
- **Phase 5 (US2 - Labs)**: 16 tasks (T066-T081)
- **Phase 6 (US3 - Blog)**: 20 tasks (T082-T101)
- **Phase 7 (US5 - Content Governance)**: 9 tasks (T102-T110)
- **Phase 8 (US6 - SEO)**: 12 tasks (T111-T122)
- **Phase 9 (US7 - Observability)**: 7 tasks (T123-T129)
- **Phase 10 (Pagination)**: 9 tasks (T130-T138)
- **Phase 11 (Polish)**: 19 tasks (T139-T157)

**Total**: 157 tasks

**Parallel Opportunities**: 47+ tasks marked [P] across all phases

**Independent Test Criteria**: Each user story phase includes specific manual test scenarios

**Suggested MVP Scope**: Phase 1 (Setup) + Phase 2 (Foundational) + Phase 3 (US4 - Navigation) + Phase 4 (US1 - Work Case Studies) = 65 tasks for functional MVP

---

## Format Validation

✅ ALL tasks follow the required checklist format:

- `- [ ]` checkbox at start
- Sequential Task ID (T001-T157)
- `[P]` marker for parallelizable tasks
- `[US#]` story label for user story tasks (US1-US7)
- Clear description with exact file path
- No tasks use placeholder markers like "...existing code..."

✅ Tasks organized by user story for independent implementation and testing

✅ Each user story includes independent test criteria for validation

✅ Dependencies clearly documented with suggested execution order

✅ MVP scope identified (Setup + Foundational + US4 + US1 = 65 tasks)

---

## Notes

- Manual testing approach per research.md - no unit tests required initially
- Lighthouse CI runs automatically on all PRs to validate performance, accessibility, SEO
- All animations must respect `prefers-reduced-motion` user preference
- SCSS files use BEM naming conventions with underscores (block**element**modifier)
- Images served through Sanity CDN with automatic optimization
- Content status filtering ensures only published content visible on public site
- ISR revalidation triggered via webhooks for content freshness (60 seconds)
- Search index pre-built at build time for instant client-side search
- Pagination uses "Load More" pattern (20 items per batch) for optimal performance
- Cross-browser testing required: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Real-device testing required: iPhone, Android, tablet, desktop
- All pages must achieve Lighthouse scores: Performance ≥90, Accessibility ≥95, SEO ≥90
