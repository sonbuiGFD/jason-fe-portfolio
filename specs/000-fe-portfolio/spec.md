# Feature Specification: Portfolio Website

**Feature Branch**: `001-fe-portfolio`  
**Created**: October 28, 2025  
**Status**: Draft  
**Input**: User description: "FE Engineer Portfolio (Next.js + Headless CMS + CDN)"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Recruiter Quick Assessment (Priority: P1)

A recruiter lands on the portfolio site and needs to quickly assess the candidate's capabilities, experience depth, and quality bar within 2-3 minutes to decide whether to proceed with screening.

**Why this priority**: This is the primary conversion goal—turning visitors into interview opportunities. Without this, the entire portfolio fails its core purpose.

**Independent Test**: Can be fully tested by navigating from homepage to one case study and back, verifying that key information (years of experience, primary skills, impact metrics) is visible without scrolling on multiple pages. Delivers immediate value: credibility establishment.

**Acceptance Scenarios**:

1. **Given** a recruiter visits the homepage, **When** they scan the hero section and about preview, **Then** they see the candidate's primary role (Frontend Engineer), years of experience, and 2-3 key technical skills within 5 seconds
2. **Given** a recruiter is on the homepage, **When** they scroll to the Work Experience section, **Then** they see a filterable list of case studies with clear role, company, and impact preview (e.g., "Led redesign → 40% conversion increase")
3. **Given** a recruiter clicks on a featured case study, **When** the detail page loads, **Then** they see structured sections: Challenge, Approach, Impact (with metrics), Tech Context, and Role—all within 1 viewport height
4. **Given** a recruiter is reading a case study, **When** they scroll through the page, **Then** they encounter visual elements (screenshots, diagrams, metrics callouts) that reinforce credibility every 2-3 paragraphs
5. **Given** a recruiter completes reading one case study, **When** they look for next steps, **Then** they see clear CTAs: "View Resume," "Contact Me," "See More Work"

---

### User Story 2 - Engineer Deep Dive Evaluation (Priority: P1)

A peer engineer or technical interviewer needs to evaluate the candidate's technical thinking, architectural decisions, and delivery practices through detailed case studies and side projects.

**Why this priority**: Technical depth is the differentiator for senior roles. This story validates that the portfolio isn't just marketing fluff but demonstrates real engineering rigor.

**Independent Test**: Can be tested by reading a case study's technical sections (architecture, decisions, tradeoffs) and verifying that specific frameworks, patterns, and metrics are present. Delivers value: technical credibility and conversation starters for interviews.

**Acceptance Scenarios**:

1. **Given** an engineer visits a case study, **When** they reach the "Technical Approach" section, **Then** they see architecture diagrams, technology stack details, and clear explanations of the technical approaches and decisions made
2. **Given** an engineer is reading about technical decisions, **When** they look for rationale, **Then** they find explanations of why certain technologies/approaches were chosen and what alternatives were considered
3. **Given** an engineer wants to see measurable outcomes, **When** they reach the Impact section, **Then** they see quantified metrics: performance improvements (e.g., LCP reduced from 4.2s to 1.8s), conversion lifts, or user satisfaction scores
4. **Given** an engineer visits the Side-Project Labs section, **When** they browse projects, **Then** each project card shows: what was built, what was learned, and links to live demo or source code
5. **Given** an engineer is evaluating code quality, **When** they read blog posts tagged "architecture" or "best practices," **Then** they see code snippets with syntax highlighting, explanations of patterns, and links to related case studies

---

### User Story 3 - Content Discovery and Navigation (Priority: P2)

A visitor wants to find specific content by topic, technology, or content type (blog post vs. case study vs. lab project) without getting lost or frustrated.

**Why this priority**: Content discoverability ensures visitors can find relevant work even if they don't follow the primary recruiter flow. This increases dwell time and engagement depth.

**Independent Test**: Can be tested by using search/filter controls on list pages and verifying that results update instantly, empty states are helpful, and navigation remains consistent. Delivers value: self-guided exploration leading to increased portfolio engagement.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Work Experience index, **When** they apply filters (e.g., "React," "Lead Role," "Performance"), **Then** the list updates in under 200ms with matching case studies, showing result count
2. **Given** a visitor applies filters that return no results, **When** the empty state appears, **Then** they see a branded message, suggested tags to try, and a "View All" link
3. **Given** a visitor is on any page, **When** they use the global search in the navigation, **Then** they see a dropdown with results grouped by content type (Work, Labs, Blog) with titles and previews
4. **Given** a visitor is reading a blog post, **When** they click on a tag (e.g., "TypeScript"), **Then** they're taken to a filtered view showing all content with that tag across all sections
5. **Given** a visitor wants to browse by topic, **When** they visit the Blog index, **Then** they see posts organized with filters for tags, reading time estimates, and publish dates

---

### User Story 4 - Responsive and Accessible Experience (Priority: P2)

A visitor using assistive technology, keyboard navigation, or a mobile device needs to access all content and features without barriers or degraded experiences.

**Why this priority**: Accessibility demonstrates professional ethics and expands audience reach. Mobile traffic is significant for portfolio sites. WCAG 2.2 AA compliance is a constitutional requirement.

**Independent Test**: Can be tested using keyboard-only navigation and screen readers to complete primary flows (homepage → case study → back). Delivers value: inclusive access and constitutional compliance.

**Acceptance Scenarios**:

1. **Given** a keyboard user lands on any page, **When** they press Tab, **Then** focus indicators are clearly visible with 3:1 contrast ratio, and focus order follows logical reading sequence
2. **Given** a screen reader user navigates a case study, **When** they query page structure, **Then** they hear proper landmark regions (header, navigation, main, aside, footer) and heading hierarchy (h1 → h2 → h3)
3. **Given** a mobile user visits the site, **When** they navigate between pages, **Then** touch targets are ≥44×44px, text is readable without zooming, and interactive elements respond within 200ms (INP requirement)
4. **Given** a user enables dark mode, **When** pages load, **Then** all content has sufficient color contrast (4.5:1 for normal text, 3:1 for large text), and no elements are invisible
5. **Given** a user with reduced motion preferences, **When** they visit the site, **Then** animations respect `prefers-reduced-motion` and non-essential animations are disabled

---

### User Story 5 - Social Sharing and Discovery (Priority: P3)

A visitor or content creator wants to share portfolio content on social media or discover it through search engines, expecting professional preview cards and accurate metadata.

**Why this priority**: Social sharing amplifies reach beyond direct traffic. SEO optimization increases organic discovery. Professional OpenGraph cards reflect attention to detail.

**Independent Test**: Can be tested by pasting URLs into social media platforms (Twitter, LinkedIn) and verifying preview cards render correctly with title, description, and hero image. Delivers value: increased portfolio visibility and inbound traffic.

**Acceptance Scenarios**:

1. **Given** a visitor shares a case study URL on LinkedIn, **When** the platform fetches metadata, **Then** the preview card shows: case study title, 150-character description, hero image (1200×630px), and site name
2. **Given** a search engine crawler visits the site, **When** it parses metadata, **Then** it finds canonical URLs, OpenGraph tags, Twitter Card tags, and structured data (JSON-LD for Person, Article, BreadcrumbList)
3. **Given** an RSS reader fetches the blog feed, **When** it parses the XML, **Then** it receives valid RSS 2.0 with titles, descriptions, publish dates, full content or excerpts, and author information
4. **Given** a search engine requests the sitemap, **When** it accesses /sitemap.xml, **Then** it receives a valid XML sitemap with all published pages, lastmod dates, and priority hints
5. **Given** a visitor lands on the site from search, **When** they check the URL, **Then** they see canonical URLs without query parameters or session tokens

---

### User Story 6 - Content Governance and Publishing (Priority: P3)

A content author (the portfolio owner) needs to manage content through editorial workflows (draft → review → publish), with content statuses reflected accurately on the site.

**Why this priority**: Content governance prevents accidental publication of drafts and enables confident content iteration. This is essential for maintaining portfolio quality over time.

**Independent Test**: Can be tested by creating a draft post in the CMS, verifying it doesn't appear in production, then publishing it and confirming it appears within 60 seconds (ISR requirement). Delivers value: safe content management without deployment bottlenecks.

**Acceptance Scenarios**:

1. **Given** an author creates a new blog post in the CMS with status "Draft," **When** the production site rebuilds, **Then** the draft post does NOT appear in blog lists or be accessible via direct URL
2. **Given** an author changes a post status from "Draft" to "Published," **When** the CMS webhook fires, **Then** the site revalidates within 60 seconds and the post appears in blog lists and search results
3. **Given** an author updates a published case study, **When** they save changes in the CMS, **Then** ISR revalidation triggers and changes appear on the site within 60 seconds without full rebuild
4. **Given** an author wants to preview draft content, **When** they use the CMS preview feature, **Then** they see a preview URL that renders draft content without affecting production
5. **Given** an author archives old content, **When** they change status to "Archived" in CMS, **Then** the content is removed from public lists but remains accessible via direct URL with a "This content is archived" notice

---

### Edge Cases

- **What happens when a case study has no hero image?** Display a branded placeholder with a gradient and the project title overlaid, ensuring consistent card layouts
- **How does the system handle very long case study titles (>80 characters)?** Truncate with ellipsis on cards, show full title only on detail pages
- **What if two pieces of content have the same title?** Slugs are auto-generated from titles in kebab-case; duplicate titles automatically receive numeric suffixes (e.g., `my-project`, `my-project-2`, `my-project-3`) to ensure unique URLs
- **What if a blog post has no tags?** Display "Untagged" label and exclude from tag filter dropdowns, but still show in "All Posts" view
- **How does search handle zero results?** Show empty state with: "No results for '[query]'. Try browsing [Work / Labs / Blog] or searching for [suggested terms based on popular tags]"
- **What happens when Sanity webhook fails or on-demand revalidation errors?** Log error to monitoring service, retry up to 3 times with exponential backoff (1s, 2s, 4s delays), fall back to stale cache if all retries fail; content updates will appear on next successful webhook or manual revalidation
- **How does the site handle images failing to load from CDN?** Display alt text with branded fallback icon, prevent layout shift, log 404 to error tracking
- **What if JavaScript fails to load?** Core content (text, images, navigation) must render server-side and be accessible, progressive enhancement for filters/search
- **How does keyboard navigation work with modal overlays (e.g., image lightboxes)?** Focus trap within modal, Esc key closes, focus returns to trigger element
- **What happens when a user's connection is slow (3G)?** Show loading skeletons during data fetching, prioritize above-fold content, lazy load below-fold images
- **How does dark mode work if user preference changes mid-session?** Respect system preference on initial load, allow manual toggle that persists in localStorage, reapply without page refresh

## Requirements _(mandatory)_

### Functional Requirements

#### Navigation & Global Features

- **FR-001**: Site MUST provide persistent navigation with links to: Home, About, Work, Labs, Blog, and Contact
- **FR-002**: Navigation MUST be accessible on all devices with mobile-optimized menu (hamburger on small screens)
- **FR-003**: Site MUST support dark and light theme modes, respecting user's system preference (`prefers-color-scheme`) on first visit
- **FR-004**: Theme preference MUST persist across sessions using localStorage
- **FR-005**: Global search MUST allow users to search across all content types (Work, Labs, Blog) and return results within 500ms
- **FR-006**: Search results MUST be grouped by content type with titles, previews (first 100 characters), and relevance indicators
- **FR-007**: Site footer MUST display social links (LinkedIn, GitHub, Twitter), copyright notice, and link to resume/CV
- **FR-008**: All pages MUST display loading states (skeletons or spinners) during data fetching
- **FR-009**: All pages MUST display error states (with branded error message and retry CTA) when data fetching fails
- **FR-010**: All list pages MUST display empty states (with helpful message and suggested actions) when no content matches filters

#### Home & About Pages

- **FR-011**: Homepage MUST display hero section with: name, primary role title, brief tagline, and CTA to view work or contact
- **FR-012**: Homepage MUST showcase 3-4 featured case studies or projects with preview cards linking to detail pages
- **FR-013**: About page MUST display: professional bio, skills/expertise, career timeline, and profile photo
- **FR-014**: About page MUST link to full resume/CV (PDF download) and social profiles

#### Work Experience Section

- **FR-015**: Work index page MUST display all published case studies as cards with: title, company, role, impact preview (1 sentence), hero image, and tags
- **FR-016**: Work index MUST support filtering by: role (e.g., Lead, IC), technology/stack (e.g., React, TypeScript), and impact area (e.g., Performance, Accessibility)
- **FR-017**: Filters MUST update results in real-time (under 200ms) without full page reload
- **FR-018**: Case study detail pages MUST include sections: Challenge, Approach, Impact (with metrics), Tech Stack, Role/Responsibilities, and Visuals (screenshots/diagrams)
- **FR-019**: Case study metrics MUST be presented visually (e.g., callout boxes, before/after comparisons)
- **FR-020**: Case studies MUST support related projects/links (e.g., "See also: [Lab Project X]")

#### Side-Project Labs Section

- **FR-021**: Labs index page MUST display all published lab projects as cards with: title, brief description, key learnings, tech stack, and thumbnail
- **FR-022**: Labs index MUST support filtering by technology and learning focus (e.g., "Animation," "Performance," "WebGL")
- **FR-023**: Lab project detail pages MUST include: project description, what was built, what was learned, tech stack, and links to live demo and/or source code
- **FR-024**: Lab projects MUST indicate if they're actively maintained or archived experiments
- **FR-025**: Lab projects MUST link to related blog posts (e.g., "Read the build log: [Blog Post Title]")

#### Blog Section

- **FR-026**: Blog index page MUST display all published posts as cards with: title, publish date, reading time estimate, excerpt (150 characters), and tags
- **FR-027**: Blog index MUST support filtering by tags and sorting by date (newest/oldest)
- **FR-028**: Blog posts MUST display: title, author, publish date, reading time, tags, and hero image (if present)
- **FR-029**: Blog posts MUST render code snippets with syntax highlighting and copy-to-clipboard functionality
- **FR-030**: Blog posts MUST support rich text formatting: headings, lists, blockquotes, links, images, and embedded media
- **FR-031**: Blog posts MUST display related posts at the end (based on shared tags)
- **FR-032**: Blog posts MUST include social share buttons (Twitter, LinkedIn) and "Copy Link" functionality
- **FR-033**: Each blog post MUST generate an RSS feed item with full content or excerpt

#### Content Governance

- **FR-034**: Site MUST filter out content with status "Draft" in production builds
- **FR-035**: Sanity webhook MUST trigger on-demand ISR revalidation (revalidatePath or revalidateTag) when content is published or updated
- **FR-036**: On-demand revalidation MUST complete within 60 seconds of Sanity webhook event, causing affected pages to regenerate on next request
- **FR-037**: Site MUST support Sanity preview mode for viewing unpublished content via authenticated preview URLs
- **FR-038**: Archived content MUST be removed from public lists but remain accessible via direct URL with "Archived" notice
- **FR-039**: Content versioning MUST be tracked in Sanity (version history visible to author)

#### SEO & Discovery

- **FR-040**: All pages MUST include meta tags: title, description, canonical URL, OpenGraph (og:title, og:description, og:image, og:type), and Twitter Card (summary_large_image)
- **FR-041**: OpenGraph images MUST be 1200×630px, hosted on CDN, and unique per page (not generic placeholder)
- **FR-042**: Site MUST generate sitemap.xml with all published pages, lastmod dates, and priority hints
- **FR-043**: Site MUST generate robots.txt allowing all crawlers except for draft/preview routes
- **FR-044**: Blog section MUST generate RSS 2.0 feed at /rss.xml with titles, descriptions, publish dates, and full content or excerpts
- **FR-045**: Site MUST include structured data (JSON-LD) for: Person (homepage/about), Article (blog posts), and BreadcrumbList (navigation)

#### Accessibility

- **FR-046**: All pages MUST use semantic HTML with proper landmark regions: header, nav, main, aside, footer
- **FR-047**: All pages MUST have heading hierarchy with one h1 per page, followed by h2, h3, etc. in logical order
- **FR-048**: All interactive elements MUST be keyboard-accessible with visible focus indicators (3:1 contrast ratio)
- **FR-049**: Focus order MUST follow logical reading sequence (top to bottom, left to right)
- **FR-050**: All images MUST have descriptive alt text; decorative images MUST have alt="" or role="presentation"
- **FR-051**: Color contrast MUST meet WCAG 2.2 AA standards: 4.5:1 for normal text, 3:1 for large text (≥18pt)
- **FR-052**: Site MUST respect `prefers-reduced-motion` by disabling non-essential animations
- **FR-053**: Modal overlays MUST implement focus traps and restore focus to trigger element on close
- **FR-054**: All form inputs MUST have associated labels and error messages announced to screen readers

#### Performance

- **FR-055**: All images MUST use `next/image` with explicit width, height, and CDN URLs
- **FR-056**: Images MUST be delivered in WebP or AVIF formats with fallbacks, using responsive srcsets
- **FR-057**: Above-the-fold images MUST use `priority` attribute to preload; below-the-fold images MUST lazy load
- **FR-058**: Site MUST use SSG (Static Site Generation) for all pages with on-demand ISR revalidation triggered by Sanity webhooks (no time-based revalidation)
- **FR-059**: Site MUST define caching headers: public, max-age for static assets; stale-while-revalidate for ISR-regenerated pages
- **FR-060**: Third-party scripts MUST be lazy-loaded when non-critical (e.g., analytics after page interactive)
- **FR-061**: Site MUST use `preconnect` for CMS and CDN origins
- **FR-062**: Fonts MUST use Next.js Font Optimization (next/font) with Google Fonts, automatically self-hosted at build time to eliminate external requests, prevent layout shift, and ensure optimal loading performance

#### Observability & Telemetry

- **FR-063**: Site MUST track Core Web Vitals (LCP, INP, CLS) in production via Vercel Analytics or Web Vitals library
- **FR-064**: Site MUST log telemetry events for: page views, case study reads, lab project clicks, blog post reads, resume downloads, and "Copy Link" actions
- **FR-065**: Error boundaries MUST catch React errors and log to error tracking service (e.g., Sentry)
- **FR-066**: Sanity webhook failures and on-demand revalidation errors MUST be logged to monitoring service with retry attempts (up to 3 retries with exponential backoff)
- **FR-067**: Performance regressions (Core Web Vitals exceeding thresholds) MUST trigger alerts

### Key Entities

- **WorkCaseStudy**: Represents a detailed work experience entry. Attributes: title, slug (auto-generated from title in kebab-case, unique with numeric suffix for duplicates), company, role, challenge description, approach description, impact metrics, tech stack, hero image, tags, publish status, publish date, related projects.

- **LabProject**: Represents a side-project or experiment. Attributes: title, slug (auto-generated from title in kebab-case, unique with numeric suffix for duplicates), description, key learnings, tech stack, thumbnail image, live demo URL, source code URL, maintenance status (active/archived), tags, publish status, publish date, related blog posts.

- **BlogPost**: Represents a blog article. Attributes: title, slug (auto-generated from title in kebab-case, unique with numeric suffix for duplicates), author, publish date, reading time estimate, excerpt, content (rich text), hero image, tags, publish status, related posts.

- **Author**: Represents the portfolio owner. Attributes: name, role/title, bio, profile photo, social links (LinkedIn, GitHub, Twitter), resume/CV URL.

- **Tag**: Represents a categorization label. Attributes: name, slug, usage count (number of content items tagged). Relationships: used by WorkCaseStudy, LabProject, BlogPost.

- **TechStack**: Represents a technology or framework. Attributes: name, category (language, framework, tool, platform), logo/icon. Relationships: associated with WorkCaseStudy, LabProject.

- **ContentStatus**: Enum representing content lifecycle. Values: Draft, Published, Archived.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Recruiters and hiring managers can complete an initial assessment (view homepage + one case study) in under 3 minutes, with key information (role, skills, impact) visible within first viewport

- **SC-002**: 90% of visitors who land on a case study page scroll at least 50% through the content, indicating engagement with detailed work examples

- **SC-003**: Visitors spend an average of 4+ minutes on the site (dwell time), indicating quality engagement rather than bounce

- **SC-004**: The portfolio generates at least 20% increase in inbound interview requests or recruiter contacts within 3 months of launch, compared to previous portfolio or no portfolio baseline

- **SC-005**: Page load performance meets Core Web Vitals thresholds at 75th percentile mobile: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (as defined in project constitution)

- **SC-006**: 100% of pages pass WCAG 2.2 AA accessibility checks in automated testing (Axe DevTools), with zero critical violations

- **SC-007**: Search functionality returns results within 500ms for 95% of queries, enabling fast content discovery

- **SC-008**: Social shares generate OpenGraph preview cards with correct title, description, and image on 100% of tested platforms (Twitter, LinkedIn, Facebook)

- **SC-009**: On-demand revalidation via Sanity webhooks completes within 60 seconds of content publish events for 99% of updates, with affected pages regenerating on next request, enabling rapid content iteration without full rebuilds

- **SC-010**: Zero draft or archived content appears in production builds unless explicitly accessed via preview URLs, ensuring content governance

- **SC-011**: Resume download is completed by 30% of visitors who view at least one case study, indicating conversion from browsing to recruiting action

- **SC-012**: Blog posts with code snippets have a 40% higher engagement rate (scroll depth + time on page) than text-only posts, validating technical depth

## Constitution Compliance

This specification aligns with the project constitution as follows:

### Principle 1: Code Quality & Type Safety

- **Alignment**: Spec requires no implementation details in this phase, but planning and implementation will enforce strict type safety, automated code quality checks, and standardized commit practices as defined in the constitution.
- **Verification**: CI quality gates (FR-046 to FR-054 implicitly rely on linting/type checks) will catch violations before merge.

### Principle 2: Testing Standards & Accessibility

- **Alignment**: FR-046 to FR-054 explicitly mandate WCAG 2.2 AA compliance, keyboard navigation, visible focus states, semantic HTML, and screen reader support.
- **Success Criteria**: SC-006 requires 100% pass rate on automated accessibility checks.
- **Verification**: Axe DevTools checks in CI will validate compliance; manual keyboard/screen reader testing will verify functional accessibility.

### Principle 3: UX Consistency & Design System

- **Alignment**: Spec requires consistent patterns across blog, work, and labs sections (FR-015, FR-021, FR-026 define similar card layouts). Dark/light themes must have visual parity (FR-003, FR-004). Empty/error/loading states explicitly designed (FR-008, FR-009, FR-010).
- **Assumption**: Design tokens will be defined during planning phase to enforce spacing, typography, and color scales.
- **Verification**: Visual regression testing and manual QA will validate consistency.

### Principle 4: Performance Requirements

- **Alignment**: FR-055 to FR-062 directly implement constitution performance requirements: `next/image`, CDN delivery, WebP/AVIF formats, SSG/ISR, caching headers, lazy loading, preconnect/preload, font optimization.
- **Success Criteria**: SC-005 enforces Core Web Vitals thresholds at 75th percentile mobile (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1).
- **Verification**: Lighthouse CI and Vercel Analytics will monitor compliance; performance budgets will block PRs that regress metrics.

### Principle 5: Content Management & CMS Integration

- **Alignment**: FR-034 to FR-039 mandate all content sourced from CMS, draft filtering in production, ISR revalidation within 60 seconds via webhooks, preview mode for drafts, and content versioning.
- **Success Criteria**: SC-009 requires 99% of ISR revalidations complete within 60 seconds; SC-010 ensures zero draft leakage.
- **Verification**: Automated tests will validate draft filtering; webhook logs and monitoring will track revalidation times.

### Performance Standards

- **Core Web Vitals**: SC-005 directly enforces constitutional thresholds (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at P75 mobile).
- **Image Optimization**: FR-055 to FR-057 implement all constitutional image requirements (CDN, next/image, WebP/AVIF, explicit dimensions, responsive srcsets, lazy loading).
- **Browser Compatibility**: Spec assumes modern browsers (last 2 versions of Chrome, Firefox, Safari, Edge); graceful degradation for older browsers will be implemented during planning.

### CI/CD & Quality Gates

- **Alignment**: Spec does not define CI configuration (implementation detail), but assumes all quality gates (linting, type checking, testing, accessibility, performance, build) will be enforced per constitution.
- **Specification Compliance**: This spec includes this Constitution Compliance section as required.

## Clarifications

### Session 2025-10-28

- Q: Which headless CMS should be used for content management? → A: Sanity
- Q: What security headers and privacy compliance approach should the site implement? → A: Minimal security (default Next.js headers only)
- Q: What font loading strategy should be used for web typography? → A: Next.js Font Optimization with Google Fonts
- Q: How should content URL slugs be generated and what happens if there's a duplicate? → A: Auto-generate from title + append number suffix for duplicates
- Q: What ISR (Incremental Static Regeneration) strategy should be used for content updates? → A: On-demand revalidation via CMS webhooks

## Assumptions

1. **CMS Platform**: Uses Sanity as the headless CMS for content management. Sanity provides webhook support for ISR revalidation, real-time collaboration, excellent TypeScript support, flexible schema modeling with Portable Text for rich content, and strong Next.js integration.

2. **CDN Provider**: Assumes a CDN (e.g., Cloudflare, Vercel Image Optimization, Cloudinary) is configured for image delivery. Spec does not mandate specific CDN.

3. **Hosting**: Assumes deployment to Vercel or similar Next.js-optimized platform that supports ISR, edge functions, and Vercel Analytics.

4. **Authentication for Preview Mode**: Assumes CMS provides secure preview URLs (e.g., signed tokens) to enable Next.js draft mode without exposing unpublished content.

5. **Resume/CV Availability**: Assumes a PDF resume is available and will be hosted on CDN or in `/public` directory for download.

6. **Analytics/Telemetry Service**: Assumes Vercel Analytics or Google Analytics is used for telemetry. Alternative: Web Vitals library with custom backend.

7. **Error Tracking**: Assumes Sentry or similar error tracking service is configured for production error logging.

8. **Security & Privacy**: Uses default Next.js security headers without custom CSP or enhanced privacy controls. No cookie consent banner required; analytics tracking follows standard practices without explicit opt-in.

9. **Social Profile URLs**: Assumes LinkedIn, GitHub, and Twitter profiles are active and will be provided during implementation.

10. **Content Volume**: Assumes initial content: 5-10 case studies, 5-10 lab projects, 10-20 blog posts. Spec scales to hundreds of items but initial design optimized for dozens.

11. **Tag Taxonomy**: Assumes a flat tag taxonomy (no hierarchical categories). Tags are created ad-hoc by content author in CMS.

12. **Search Implementation**: Assumes client-side search (Fuse.js or similar) for simplicity. Spec is compatible with Algolia or Elasticsearch if needed for scale.

13. **Reading Time Calculation**: Assumes reading time is calculated based on word count (average 200-250 words/minute) during build or in CMS.

14. **Related Content Logic**: Assumes related posts/projects are determined by shared tags (simple similarity). Advanced recommendation algorithms are out of scope for v1.

15. **Browser Support**: Assumes modern browsers (last 2 versions). Polyfills for older browsers will be conditionally loaded during implementation.

16. **Internationalization (i18n)**: Assumes English-only content for v1. Multi-language support is out of scope but spec is compatible with future i18n.
