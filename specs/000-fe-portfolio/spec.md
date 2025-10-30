# Feature Specification: FE Engineer Portfolio

**Feature Branch**: `000-fe-portfolio`  
**Created**: October 29, 2025  
**Status**: Draft  
**Input**: User description: "Create a specification titled 'FE Engineer Portfolio (Next.js + Headless CMS + CDN + TailwindCss + SCSS)'"

## Clarifications

### Session 2025-10-29

- Q: What URL pattern should be used for individual case studies, lab projects, and blog posts? → A: Clean slug-based paths: `/work/modernizing-checkout-flow`, `/labs/css-grid-explorer`, `/blog/react-performance-tips`
- Q: What type of search implementation should be used? → A: Client-side search with pre-built index (simple, fast, sufficient for portfolio scale)
- Q: What is the expected content volume across all content types? → A: 10-20 case studies, 50-100 blog posts, 10-20 lab projects
- Q: How should analytics tracking handle user privacy and consent? → A: Essential analytics only, no personal data, no consent banner needed
- Q: How should the site behave during CMS outages or extended maintenance? → A: Serve stale cached content with staleness indicator (maintains functionality, informs users)
- Q: What styling approach should be used? → A: Hybrid approach using both TailwindCSS (utility-first) and SCSS (component-specific styles) with BEM naming conventions using underscores (e.g., `block__element__modifier`)
- Q: What animation approach should be used for the site? → A: Use Motion (Framer Motion) for declarative animations including scroll-triggered animations that reveal elements when they enter the viewport
- Q: What headless CMS and CDN should be used? → A: Use Sanity as both the headless CMS for content management and Sanity's image CDN for optimized image delivery
- Q: What testing strategy should be adopted for fast development? → A: Keep testing simple with no unit tests initially; focus on manual testing and end-to-end scenarios to maximize development speed
- Q: What browsers and devices should be supported? → A: Support modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions) with responsive design across mobile, tablet, and desktop devices

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Portfolio Discovery by Recruiter (Priority: P1)

A recruiter visits the portfolio to quickly assess the candidate's frontend engineering capabilities, focusing on breadth of experience and quality of work.

**Why this priority**: This is the primary use case driving portfolio visits and directly impacts conversion to interview opportunities. Without compelling case studies and clear navigation, the portfolio fails its core purpose.

**Independent Test**: Can be fully tested by navigating from home page to Work Experience index, filtering by a tech stack (e.g., React), opening a case study detail page, and verifying all content loads with proper formatting, images, and social sharing capabilities. Delivers immediate value by showcasing work quality.

**Acceptance Scenarios**:

1. **Given** a recruiter lands on the home page, **When** they click "Work Experience" in navigation, **Then** they see a filterable index of case studies with clear titles, tech stacks, and impact summaries
2. **Given** the recruiter is on the Work Experience index, **When** they apply a filter (e.g., "React" or "Lead Engineer"), **Then** only matching case studies appear and URL updates to reflect the filter
3. **Given** a filtered view with no matches, **When** no case studies match the criteria, **Then** a helpful empty state appears with suggestions to clear filters or try alternatives
4. **Given** the recruiter clicks a case study card, **When** the detail page loads, **Then** they see a structured narrative with problem statement, approach, architecture decisions, impact metrics, and tech stack
5. **Given** the recruiter is reading a case study, **When** they scroll through the page, **Then** all images load from CDN with appropriate loading states and the page maintains WCAG 2.2 AA contrast and keyboard navigation

---

### User Story 2 - Technical Deep Dive by Peer Engineer (Priority: P2)

A peer engineer explores the portfolio to evaluate technical depth, decision-making rationale, and delivery practices through detailed case studies and side projects.

**Why this priority**: Establishes technical credibility with the engineering community and supports referral-based hiring. This audience seeks evidence of engineering rigor beyond surface-level descriptions.

**Independent Test**: Can be tested by navigating to a case study detail page, verifying the presence of architecture diagrams, technical decisions sections, and measurable outcomes; then exploring Side-Project Labs to see experimental work. Delivers value by demonstrating technical thinking.

**Acceptance Scenarios**:

1. **Given** an engineer is reading a case study, **When** they reach the architecture section, **Then** they see diagrams, decision rationale, and trade-offs explained in plain language with technical depth
2. **Given** an engineer wants to see experimental work, **When** they navigate to Side-Project Labs, **Then** they see a grid of projects with thumbnails, tech stacks, and brief descriptions of learnings
3. **Given** an engineer clicks a lab project, **When** the detail page loads, **Then** they see the experiment goal, approach, key learnings, and links to live demos or repositories (if public)
4. **Given** an engineer is reading any content, **When** they encounter code snippets, **Then** syntax highlighting renders correctly and copy-to-clipboard functionality works
5. **Given** an engineer shares a case study link on social media, **When** the link is previewed, **Then** OpenGraph and Twitter Card metadata display the case study title, description, and hero image

---

### User Story 3 - Content Discovery by Learner (Priority: P3)

A learner browses the blog to find tutorials, insights, or thought leadership on frontend engineering topics, filtering by tags and searching for specific keywords.

**Why this priority**: Supports inbound SEO traffic and establishes thought leadership, but is secondary to showcasing professional work. Requires content to exist before it can drive meaningful engagement.

**Independent Test**: Can be tested by navigating to the Blog section, searching for a keyword (e.g., "React hooks"), filtering by a tag (e.g., "Performance"), and reading a blog post with proper formatting, code snippets, and reading time estimate. Delivers value by providing educational content.

**Acceptance Scenarios**:

1. **Given** a learner visits the Blog index, **When** the page loads, **Then** they see a list of blog posts sorted by publish date with titles, summaries, tags, and estimated reading time
2. **Given** the learner wants to find specific content, **When** they enter a search query (e.g., "accessibility"), **Then** posts matching the query appear and empty state shows helpful suggestions if no matches found
3. **Given** the learner wants to browse by topic, **When** they click a tag (e.g., "CSS"), **Then** only posts with that tag appear and the URL updates to reflect the filter
4. **Given** the learner clicks a blog post, **When** the detail page loads, **Then** they see the full article with proper typography, code syntax highlighting, images, author info, and publish date
5. **Given** the learner finishes reading a post, **When** they scroll to the end, **Then** they see related posts based on tags and clear navigation back to the blog index

---

### User Story 4 - Site-Wide Navigation and Responsiveness (Priority: P1)

Any visitor uses global navigation, search, and responsive design to access content across devices and preferences (dark/light mode), with accessible keyboard navigation and screen reader support.

**Why this priority**: Foundational requirement for all user journeys. Without accessible navigation and responsive design, none of the other stories can function properly.

**Independent Test**: Can be tested by navigating the site on mobile and desktop, toggling dark/light mode, using keyboard-only navigation, and running accessibility audits (e.g., Lighthouse). Delivers value by ensuring usability for all visitors.

**Acceptance Scenarios**:

1. **Given** a visitor lands on any page, **When** they view the header, **Then** they see a responsive navigation menu with links to Home, About, Work Experience, Side-Project Labs, Blog, and a search icon
2. **Given** a visitor on mobile, **When** they tap the menu icon, **Then** a slide-out or overlay menu appears with all navigation links and closes when dismissed
3. **Given** a visitor wants to change theme, **When** they click the theme toggle (sun/moon icon), **Then** the site switches between light and dark modes and the preference persists across page loads
4. **Given** a visitor uses keyboard navigation, **When** they press Tab, **Then** focus indicators are clearly visible and follow a logical order through header, main content, and footer
5. **Given** a visitor uses a screen reader, **When** they navigate the page, **Then** all landmarks (header, nav, main, footer) are announced and images have descriptive alt text
6. **Given** a visitor on any page, **When** they scroll to the footer, **Then** they see social media links (GitHub, LinkedIn, Twitter), copyright notice, and accessibility statement
7. **Given** a visitor clicks the global search icon, **When** the search modal opens, **Then** they can search across Work, Labs, and Blog content and see results grouped by type

---

### User Story 5 - Content Governance and Editorial Workflow (Priority: P2)

A content author (the portfolio owner) manages content through the headless CMS with statuses (draft, review, published), versioning, and controlled publishing, ensuring only approved content appears on the public site.

**Why this priority**: Critical for maintaining content quality and preventing accidental publication of incomplete work, but doesn't directly impact visitor experience if executed correctly behind the scenes.

**Independent Test**: Can be tested by creating a blog post in draft status, verifying it doesn't appear on the public site, changing status to published, and confirming it appears. Delivers value by enabling safe content management.

**Acceptance Scenarios**:

1. **Given** a content item is in "draft" status, **When** a visitor navigates to the relevant index page, **Then** the draft content does not appear in listings or search results
2. **Given** a content item is in "review" status, **When** a visitor tries to access it via direct URL, **Then** they see a 404 or "content not found" message
3. **Given** a content item is in "published" status, **When** a visitor navigates to the relevant index or searches for it, **Then** the content appears and is accessible
4. **Given** a published content item is updated, **When** the author saves changes, **Then** the CMS creates a new version and the public site reflects the latest published version after revalidation
5. **Given** a content item has multiple versions, **When** the author views version history in the CMS, **Then** they see timestamps, author, and can revert to previous versions if needed

---

### User Story 6 - SEO and Content Discovery by Search Engines (Priority: P2)

Search engines and social media platforms crawl the portfolio to index content, display rich previews, and drive organic traffic through proper metadata, sitemaps, and RSS feeds.

**Why this priority**: Essential for long-term discoverability and inbound traffic, but secondary to the core portfolio content and navigation experience. Impact compounds over time.

**Independent Test**: Can be tested by validating sitemap.xml, RSS feed for blog, and OpenGraph metadata using validator tools; running Lighthouse SEO audit; and testing social share previews on Twitter/LinkedIn. Delivers value by improving search rankings and shareability.

**Acceptance Scenarios**:

1. **Given** a search engine crawls the site, **When** it accesses `/sitemap.xml`, **Then** it finds a valid XML sitemap with all public pages (Work, Labs, Blog posts) and canonical URLs
2. **Given** a visitor shares a page on social media, **When** the link is previewed, **Then** OpenGraph and Twitter Card tags display the correct title, description, and image
3. **Given** a visitor subscribes to the blog RSS feed, **When** they access `/blog/rss.xml`, **Then** they receive a valid RSS feed with the latest published posts
4. **Given** a search engine indexes a page, **When** it parses the HTML, **Then** it finds proper semantic markup with `<title>`, `<meta name="description">`, canonical URL, and structured data where applicable
5. **Given** a visitor runs a Lighthouse SEO audit, **When** the audit completes, **Then** the site scores 90+ on SEO with no critical issues

---

### User Story 7 - Observability and Success Tracking (Priority: P3)

The portfolio owner tracks visitor engagement through telemetry events (page views, case study reads, resume downloads, link copying) to measure success against defined KPIs and inform content strategy.

**Why this priority**: Important for measuring portfolio effectiveness and informing iterative improvements, but doesn't directly impact visitor experience. Can be added after core features are stable.

**Independent Test**: Can be tested by triggering telemetry events (e.g., viewing a case study, clicking "Copy Link", downloading resume) and verifying events are logged with correct metadata. Delivers value by enabling data-driven decisions.

**Acceptance Scenarios**:

1. **Given** a visitor views a case study, **When** the page loads, **Then** a telemetry event logs the page view with case study ID, referrer, and timestamp
2. **Given** a visitor clicks "Copy Link" on a case study, **When** the link copies to clipboard, **Then** a telemetry event logs the share action with page URL and user agent
3. **Given** a visitor downloads the resume (if available), **When** they click the download button, **Then** a telemetry event logs the download with timestamp and referrer
4. **Given** the portfolio owner reviews analytics, **When** they access the analytics dashboard, **Then** they see metrics for total visits, top case studies, average dwell time, and conversion rates
5. **Given** a visitor scrolls through a long case study, **When** they reach specific milestones (25%, 50%, 75%, 100%), **Then** telemetry events log the scroll depth

---

### Edge Cases

- What happens when a case study has no images or the Sanity Image CDN is unreachable? → Display a placeholder image and graceful fallback with no layout shift
- How does the site handle a Sanity CMS query that returns no results? → Display contextual empty states with helpful suggestions (e.g., "No case studies match your filter. Try clearing filters or browsing all projects.")
- What if a blog post has malformed content or missing required fields in Sanity? → Validate content in Sanity Studio and prevent publishing; on the frontend, display a fallback message if data is unexpectedly missing
- How does search behave when the index is empty or query returns no matches? → Show a "No results found for '[query]'" message with suggestions to refine the search or browse all content
- What happens when a visitor navigates to a deleted or unpublished page via an old link? → Return a 404 page with branded messaging and links to navigate to Home, Work, Labs, or Blog
- What happens during Sanity CMS maintenance or outages? → Serve stale cached content with a subtle staleness indicator banner (e.g., "Content may be outdated") to maintain site functionality while informing users
- How does dark mode handle images with transparency or embedded color schemes? → Ensure images have appropriate backgrounds or filters; test all images in both modes
- What if a visitor has JavaScript disabled? → Ensure core content is accessible via server-side rendering and progressive enhancement; navigation and content should still be usable
- How does the site handle very long author names, case study titles, or tag names? → Implement text truncation with ellipsis and hover tooltips for full text
- What happens when multiple filters are applied simultaneously (e.g., tech stack + role)? → Apply AND logic to show only items matching all filters; display count of results and allow clearing individual filters
- How does the site handle visitors on slow networks or high-latency connections? → Implement proper loading states, skeleton screens, and progressive image loading; test on throttled connections
- What happens when a visitor uses an unsupported browser (e.g., Internet Explorer)? → Display a friendly browser upgrade message with recommendations to use a modern browser (Chrome, Firefox, Safari, or Edge)
- How does the site handle browser-specific CSS or JavaScript feature gaps? → Use progressive enhancement with feature detection and graceful fallbacks; polyfills may be used sparingly for critical features if needed

## Requirements _(mandatory)_

### Scale & Volume Assumptions

- **Expected Content Volume**: The portfolio is designed to handle 10-20 case studies, 50-100 blog posts, and 10-20 lab projects. This scale influences caching strategies, search index sizing, and whether pagination is required for content listings.

### Styling & Design System Constraints

- **Styling Approach**: System MUST use a hybrid styling approach combining TailwindCSS v4 for utility-first rapid development and SCSS for complex component-specific styles. All custom CSS classes MUST follow BEM (Block Element Modifier) naming conventions using underscores as separators (e.g., `block__element__modifier`, `card__header__large`, `navigation__item__active`). This ensures predictable specificity, maintainability, and clear component boundaries while leveraging TailwindCSS utilities for common patterns.
- **TailwindCSS v4 Configuration**: System MUST use CSS-based configuration via the `@theme` directive in the main CSS file instead of JavaScript-based configuration. All theme customizations (colors, fonts, spacing, border radius) MUST be defined using CSS custom properties within the `@theme` block. This aligns with Tailwind CSS v4's new architecture that eliminates the need for `tailwind.config.js/ts` files and PostCSS plugin configuration.

### Animation & Motion Constraints

- **Animation Library**: System MUST use Motion (Framer Motion) for all declarative animations to ensure consistent, performant, and accessible motion design across the portfolio.
- **Scroll-Triggered Animations**: System MUST implement scroll-triggered animations that reveal elements (fade-in, slide-in, scale-in) when they enter the viewport. Animations MUST respect user's `prefers-reduced-motion` settings for accessibility.
- **Animation Performance**: All animations MUST maintain 60fps performance and not negatively impact Core Web Vitals scores (CLS ≤ 0.1). Animations MUST use GPU-accelerated properties (transform, opacity) where possible.
- **Animation Patterns**: Common animation patterns include: hero section entrance, staggered card reveals on content indices, smooth page transitions, interactive hover states, and loading state animations.

### Content Management & CDN Constraints

- **Headless CMS**: System MUST use Sanity as the headless CMS for all content management, including case studies, lab projects, blog posts, and author information. Sanity provides structured content modeling, version control, and editorial workflow capabilities.
- **Image CDN**: System MUST use Sanity's built-in image CDN (Sanity Image API) for all image delivery, leveraging automatic optimization, responsive image generation, format conversion (WebP/AVIF), and on-the-fly transformations.
- **Content API**: System MUST query Sanity content via GROQ (Graph-Relational Object Queries) or Sanity's JavaScript client, enabling efficient content fetching with projection and filtering.
- **SVG Assets**: System MUST use SVGR (@svgr/webpack) to enable importing SVG files as React components, allowing for dynamic styling, props passing, and better performance compared to inline SVG or image tags. This enables clean component composition with icons and illustrations.

### Testing & Quality Constraints

- **Testing Strategy**: To maximize development velocity, the system MUST adopt a simplified testing approach focused on manual testing and end-to-end user scenarios. Unit tests are NOT required in the initial implementation phase.
- **Quality Assurance**: Quality validation MUST rely on manual testing of user flows, browser-based accessibility audits (Lighthouse), visual regression checks, and real-device testing across mobile/desktop.
- **Future Testing**: Automated testing may be introduced post-launch if maintenance complexity increases, focusing on critical user journeys and integration tests rather than granular unit test coverage.

### Browser & Device Support Constraints

- **Browser Support**: System MUST support the latest 2 versions of modern browsers: Chrome, Firefox, Safari, and Edge. Support for Internet Explorer is NOT required.
- **Responsive Design**: System MUST provide fully responsive layouts that adapt seamlessly across mobile (320px+), tablet (768px+), and desktop (1024px+) viewports without horizontal scrolling or content overflow.
- **Cross-Browser Testing**: System MUST be manually tested across all supported browsers on both desktop and mobile devices to ensure consistent rendering, functionality, and performance.
- **Progressive Enhancement**: System MUST use progressive enhancement principles, ensuring core content and functionality work in all supported browsers while leveraging modern browser features (CSS Grid, Flexbox, modern JavaScript) where available.
- **Mobile-First Approach**: System MUST be designed and developed with a mobile-first approach, ensuring optimal experience on smaller screens and progressively enhancing for larger viewports.

### Functional Requirements

- **FR-001**: System MUST render a home page with an overview of the portfolio owner's background, a hero section, and navigation to Work Experience, Side-Project Labs, Blog, and About sections
- **FR-002**: System MUST provide a global navigation component accessible from all pages with links to Home, About, Work Experience, Side-Project Labs, and Blog
- **FR-003**: System MUST implement a responsive design that adapts to mobile (320px+), tablet (768px+), and desktop (1024px+) viewports without horizontal scrolling
- **FR-003a**: System MUST ensure cross-browser compatibility across the latest 2 versions of Chrome, Firefox, Safari, and Edge, with consistent rendering, functionality, and user experience
- **FR-004**: System MUST support light and dark color modes with a toggle control, persisting user preference across sessions via browser storage
- **FR-005**: System MUST implement accessible keyboard navigation with visible focus states and logical tab order throughout all pages
- **FR-006**: System MUST meet WCAG 2.2 AA accessibility standards, including color contrast ratios (4.5:1 for normal text, 3:1 for large text), semantic HTML, and ARIA labels where appropriate
- **FR-007**: System MUST provide a global search feature using client-side search with a pre-built index that queries across Work Experience case studies, Side-Project Labs, and Blog posts (title, summary, tags, content), returning results grouped by content type with instant feedback
- **FR-008**: System MUST display a footer on all pages containing social media links (GitHub, LinkedIn, Twitter), copyright notice, and accessibility statement
- **FR-009**: System MUST implement loading states (skeletons, spinners) for all content that requires fetching from Sanity CMS or Sanity Image CDN
- **FR-010**: System MUST display contextual empty states with helpful messaging when content listings are empty due to filters or lack of published content
- **FR-011**: System MUST handle error states gracefully, displaying user-friendly messages when Sanity CMS queries fail, images don't load from Sanity Image CDN, or pages are not found
- **FR-011a**: System MUST serve stale cached content during Sanity CMS outages or maintenance windows, displaying a subtle, non-intrusive staleness indicator banner (e.g., "Content may be outdated - last updated [timestamp]") to maintain site functionality while informing users of potential data freshness issues
- **FR-011b**: System MUST implement scroll-triggered animations using Motion (Framer Motion) that reveal content elements (cards, images, text blocks) when they enter the viewport with smooth fade-in, slide-in, or scale-in transitions
- **FR-011c**: System MUST respect user accessibility preferences by disabling or reducing animations when `prefers-reduced-motion` is enabled in the user's system settings

**Work Experience**:

- **FR-012**: System MUST provide a Work Experience index page listing all published case studies with title, summary, tech stack tags, impact metrics, and thumbnail image
- **FR-013**: System MUST allow visitors to filter case studies by role type (e.g., Lead Engineer, Senior Engineer) and tech stack (e.g., React, TypeScript, Next.js)
- **FR-014**: System MUST update the URL with filter parameters (e.g., `/work?tech=react&role=lead`) and support direct access via filtered URLs
- **FR-015**: System MUST provide a case study detail page accessible via clean slug-based URLs (e.g., `/work/modernizing-checkout-flow`) with sections for problem statement, approach, architecture decisions, impact metrics, tech stack, and visual assets (diagrams, screenshots)
- **FR-016**: System MUST render case study detail pages with proper semantic structure (headings, sections, lists) and accessible image alt text
- **FR-016a**: System MUST generate unique, human-readable slugs for each case study based on the title, ensuring URL uniqueness and SEO-friendly paths

**Side-Project Labs**:

- **FR-017**: System MUST provide a Side-Project Labs index page displaying all published lab projects in a responsive grid with thumbnails, titles, tech stacks, and brief descriptions
- **FR-018**: System MUST allow visitors to filter lab projects by tech stack or project type
- **FR-019**: System MUST provide a lab project detail page accessible via clean slug-based URLs (e.g., `/labs/css-grid-explorer`) with sections for experiment goal, approach, key learnings, tech stack, and links to live demos or repositories (if public)
- **FR-020**: System MUST render lab project detail pages with proper semantic structure and accessible visual assets
- **FR-020a**: System MUST generate unique, human-readable slugs for each lab project based on the title, ensuring URL uniqueness and SEO-friendly paths

**Blog**:

- **FR-021**: System MUST provide a Blog index page listing all published posts sorted by publish date (newest first) with title, summary, author info, tags, estimated reading time, and publication date
- **FR-022**: System MUST allow visitors to filter blog posts by tags (e.g., "Performance", "React", "Accessibility")
- **FR-023**: System MUST provide a blog post detail page accessible via clean slug-based URLs (e.g., `/blog/react-performance-tips`) with full article content, syntax-highlighted code snippets, images, author information, publication date, and related posts
- **FR-024**: System MUST calculate and display estimated reading time for each blog post based on word count
- **FR-024a**: System MUST generate unique, human-readable slugs for each blog post based on the title, ensuring URL uniqueness and SEO-friendly paths
- **FR-025**: System MUST support code syntax highlighting for common languages (JavaScript, TypeScript, CSS, HTML, JSON) within blog posts
- **FR-026**: System MUST provide a "Copy Code" button for code blocks that copies content to clipboard and shows confirmation feedback
- **FR-027**: System MUST display related blog posts at the end of each post based on shared tags

**Content Governance**:

- **FR-028**: System MUST only display content with "published" status on public pages; content with "draft" or "review" status MUST NOT appear in listings or be accessible via direct URLs
- **FR-029**: System MUST support content versioning in Sanity CMS, allowing authors to view version history and revert to previous versions using Sanity's built-in revision system
- **FR-030**: System MUST revalidate public pages when content is published, updated, or unpublished in Sanity to reflect changes within a reasonable time (e.g., on-demand revalidation via webhook triggers or short cache TTL)

**SEO and Discovery**:

- **FR-031**: System MUST generate a valid `sitemap.xml` file containing all public pages with canonical URLs and last modification dates
- **FR-032**: System MUST generate OpenGraph and Twitter Card metadata for all pages, including title, description, and hero image
- **FR-033**: System MUST include canonical URL meta tags on all pages to prevent duplicate content indexing
- **FR-034**: System MUST generate an RSS feed at `/blog/rss.xml` containing the latest published blog posts with titles, summaries, publication dates, and links
- **FR-035**: System MUST implement proper semantic HTML with descriptive `<title>` and `<meta name="description">` tags for all pages
- **FR-036**: System MUST provide social sharing buttons (or copy link functionality) on case studies, lab projects, and blog posts

**Observability**:

- **FR-037**: System MUST log telemetry events for key user actions, including page views, case study reads, blog post reads, resume downloads, and link copies, using privacy-first analytics that collects no personal data or cookies
- **FR-038**: System MUST include non-personal metadata in telemetry events such as page URL, referrer (domain only), timestamp, and general user agent information (browser/device type), without tracking individual users or creating persistent identifiers
- **FR-039**: System MUST define success metrics and KPIs to track portfolio effectiveness, including total visits, average dwell time, case study completion rates, and inbound contact conversions

### Key Entities

- **Author**: Represents the portfolio owner or content creator with attributes like name, bio, profile image, social media links, and role/title
- **WorkCaseStudy**: Represents a detailed case study of professional work with attributes including title, unique slug (URL-safe identifier), summary, problem statement, approach narrative, architecture decisions, impact metrics, tech stack tags, role type, hero image, and publication date. Related to Author and TechStack entities.
- **LabProject**: Represents a side project or experiment with attributes including title, unique slug (URL-safe identifier), description, experiment goal, key learnings, tech stack tags, thumbnail image, links to demo/repository, and publication date. Related to Author and TechStack entities.
- **BlogPost**: Represents a blog article with attributes including title, unique slug (URL-safe identifier), summary, full content (Markdown or rich text), author, publication date, last updated date, tags, estimated reading time, and hero image. Related to Author and Tag entities.
- **TechStack**: Represents a technology, framework, or tool (e.g., React, TypeScript, Next.js) used in case studies, lab projects, or blog posts. Used for filtering and categorization. Has attributes like name, slug (URL-safe identifier), logo/icon, and optional description.
- **Tag**: Represents a topic or category for blog posts (e.g., "Performance", "Accessibility", "CSS"). Used for filtering and grouping content. Has attributes like name, slug, and optional description.
- **ContentStatus**: Represents the editorial workflow state of content items (draft, review, published). Determines visibility on public pages.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Recruiters can navigate from home page to a case study detail page and complete reading the full content in under 5 minutes (average dwell time on case studies ≥ 3 minutes)
- **SC-002**: The site achieves Core Web Vitals scores at the 75th percentile on mobile devices: Largest Contentful Paint (LCP) ≤ 2.5s, First Input Delay (FID) ≤ 100ms, Cumulative Layout Shift (CLS) ≤ 0.1
- **SC-003**: All pages achieve a Lighthouse Accessibility score ≥ 95 and SEO score ≥ 90 with no critical issues
- **SC-004**: The site supports keyboard-only navigation with 100% of interactive elements accessible via Tab key and visible focus states meeting WCAG 2.2 AA contrast requirements
- **SC-005**: Blog posts with code snippets render syntax highlighting correctly in under 1 second after page load, and "Copy Code" functionality works with 100% reliability
- **SC-006**: Social share previews (OpenGraph, Twitter Cards) display correctly on LinkedIn, Twitter, and Facebook when case study or blog post links are shared
- **SC-007**: The sitemap.xml and RSS feed validate successfully using official validator tools (e.g., XML Sitemap Validator, W3C Feed Validator)
- **SC-008**: Empty states and error messages are displayed within 500ms when applicable, providing clear guidance without technical jargon
- **SC-009**: Filtering on Work Experience or Blog indices returns results or empty states within 300ms without full page reloads
- **SC-010**: Portfolio visits increase by 40% within 3 months of launch, measured via telemetry page view events
- **SC-011**: Inbound contact/interview requests (measured via resume downloads or contact form submissions) increase by 25% within 3 months of launch
- **SC-012**: Average session duration is ≥ 4 minutes, indicating visitors engage with multiple pages or read content thoroughly
- **SC-013**: Bounce rate on the home page is ≤ 40%, indicating effective navigation and clear value proposition
- **SC-014**: At least 60% of visitors navigate to either Work Experience or Blog sections within their first session
- **SC-015**: The site remains functional and content-accessible with JavaScript disabled, leveraging server-side rendering for core content
- **SC-016**: All animations maintain 60fps performance and do not cause Cumulative Layout Shift (CLS) violations, with scroll-triggered animations respecting `prefers-reduced-motion` settings for users who require reduced motion
- **SC-017**: Development velocity remains high with simplified manual testing approach, enabling rapid iteration and feature deployment without automated unit test overhead while maintaining quality through Lighthouse audits and real-device testing
- **SC-018**: The site renders consistently and functions correctly across the latest 2 versions of Chrome, Firefox, Safari, and Edge on both desktop and mobile platforms, with no critical visual or functional discrepancies between browsers
