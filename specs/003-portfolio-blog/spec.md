# Feature Specification: Portfolio: Blog

**Feature Branch**: `003-portfolio-blog`  
**Created**: October 28, 2025  
**Status**: Draft  
**Input**: User description: "Create a specification titled 'Portfolio: Blog'. Purpose - Publish technical writing that demonstrates clarity, mentorship, and problem-solving. Scope - Blog list with pagination, tag filters, and search. Blog detail with reading time, ToC for long posts, code blocks, and image captions. Discovery: RSS feed; social share images; canonical URLs. User Stories - As a reader, I can find posts by topic or tech and scan them comfortably on mobile."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Browse and Discover Blog Posts (Priority: P1)

As a reader visiting the portfolio, I want to see a list of blog posts so I can discover technical content that interests me. I can scan posts on any device, particularly mobile, with comfortable reading experience.

**Why this priority**: This is the core blog functionality - without a browsable list of posts, readers cannot discover content. This represents the minimum viable product.

**Independent Test**: Can be fully tested by navigating to the blog section and verifying that posts are displayed in a list format with essential metadata (title, synopsis, publish date, tags), and that the layout adapts responsively to mobile devices.

**Acceptance Scenarios**:

1. **Given** I am on the blog list page, **When** I view the page, **Then** I see all published blog posts with title, synopsis, publish date, hero image, and tags
2. **Given** I am viewing the blog list on mobile, **When** I scroll through posts, **Then** the layout is comfortable to read with appropriate text sizing and spacing
3. **Given** there are more than 10 posts, **When** I reach the end of the list, **Then** I see pagination controls to navigate to additional pages
4. **Given** I am on page 2 or higher, **When** I click pagination controls, **Then** I can navigate backward and forward through pages

---

### User Story 2 - Filter and Search Posts (Priority: P2)

As a reader looking for specific content, I want to filter posts by tags or search by keywords so I can quickly find relevant technical topics.

**Why this priority**: Enhances discoverability once there is content to browse. Not essential for initial launch but significantly improves user experience as content grows.

**Independent Test**: Can be fully tested by applying tag filters or entering search queries and verifying that only matching posts are displayed.

**Acceptance Scenarios**:

1. **Given** I am on the blog list page, **When** I click on a tag, **Then** the list filters to show only posts with that tag
2. **Given** I have applied a tag filter, **When** I click "clear filters" or remove the tag, **Then** I see all posts again
3. **Given** I am on the blog list page, **When** I enter a search term, **Then** the list filters to show posts matching the term in title, synopsis, or body
4. **Given** I have entered a search with no results, **When** I view the page, **Then** I see a helpful "no results found" message
5. **Given** I have multiple tags applied, **When** I view the filtered list, **Then** I see posts that match ALL selected tags (AND logic)

---

### User Story 3 - Read Individual Blog Posts (Priority: P1)

As a reader interested in a specific topic, I want to read a full blog post with clear formatting, code examples, and helpful navigation so I can learn from the content.

**Why this priority**: Core functionality - readers need to be able to consume the content. This is part of the MVP alongside browsing posts.

**Independent Test**: Can be fully tested by navigating to a single post and verifying that content displays correctly with all required elements (title, body, code blocks, images, reading time).

**Acceptance Scenarios**:

1. **Given** I click on a post from the list, **When** the post loads, **Then** I see the full post with title, hero image, publish date, author, estimated reading time, and formatted body content
2. **Given** I am reading a post with code snippets, **When** I view code blocks, **Then** they are syntax-highlighted and include a copy-to-clipboard button
3. **Given** I am reading a long post (>1500 words), **When** I view the post, **Then** I see a table of contents at the top showing major sections
4. **Given** I am viewing a table of contents, **When** I click on a section link, **Then** the page scrolls smoothly to that section
5. **Given** a post includes images, **When** I view the images, **Then** each has a descriptive caption and proper alt text

---

### User Story 4 - Share and Subscribe to Content (Priority: P3)

As a reader who enjoys the content, I want to subscribe via RSS and share posts on social media so I can stay updated and recommend content to others.

**Why this priority**: Enhances distribution and engagement but not essential for core reading experience. Can be added after content creation and reading features are stable.

**Independent Test**: Can be fully tested by subscribing to the RSS feed and sharing a post, then verifying the feed validates and social previews display correctly.

**Acceptance Scenarios**:

1. **Given** I discover the blog, **When** I look for subscription options, **Then** I find an RSS feed link
2. **Given** I subscribe to the RSS feed, **When** I open it in a feed reader, **Then** it validates without errors and shows recent posts with correct metadata
3. **Given** I am reading a post, **When** I share it on social media (Twitter, LinkedIn), **Then** the preview shows the correct title, synopsis, and hero image (Open Graph/Twitter Card)
4. **Given** a post is shared, **When** crawlers index it, **Then** canonical URLs prevent duplicate content issues

---

### Edge Cases

- What happens when a post has no hero image? System displays a default placeholder image.
- What happens when a post has no tags? Post still displays normally; tag filter section does not show empty tags.
- How does system handle code blocks with very long lines? Code blocks include horizontal scrolling to prevent layout breaking.
- What happens when search returns too many results? Results paginate like the main blog list.
- How does system handle posts with special characters in titles/slugs? Slugs are URL-safe (alphanumeric and hyphens only); titles display special characters correctly.
- What happens when a user navigates directly to an unpublished post URL? System returns 404 or shows "post not found" message.
- How does RSS handle posts with rich formatting? RSS feed includes basic HTML formatting; complex elements gracefully degrade.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST display all published blog posts in reverse chronological order (newest first) on the blog list page
- **FR-002**: System MUST show pagination controls when there are more than 10 posts per page
- **FR-003**: System MUST allow readers to filter posts by one or more tags
- **FR-004**: System MUST provide a search function that matches keywords in post title, synopsis, and body content
- **FR-005**: System MUST display each post with its title, slug, synopsis, hero image, author, publish date, and tags
- **FR-006**: System MUST calculate and display estimated reading time based on post word count (assume 200 words per minute average reading speed)
- **FR-007**: System MUST generate a table of contents for posts exceeding 1500 words, linking to section headings
- **FR-008**: System MUST support rich text formatting including headings, paragraphs, lists, links, images, and code blocks
- **FR-009**: System MUST syntax-highlight code blocks and provide a copy-to-clipboard button for each code snippet
- **FR-010**: System MUST display image captions beneath all post images
- **FR-011**: System MUST include descriptive alt text for all images for screen reader accessibility
- **FR-012**: System MUST generate a valid RSS feed including the 10 most recent posts with title, link, description, publish date, and author
- **FR-013**: System MUST generate Open Graph and Twitter Card meta tags for social media previews including title, description, and hero image
- **FR-014**: System MUST set canonical URLs for each post to prevent duplicate content issues
- **FR-015**: System MUST ensure blog list and post detail pages are mobile-responsive with comfortable reading typography (minimum 16px base font size)
- **FR-016**: System MUST meet WCAG 2.1 AA accessibility standards including keyboard navigation, screen reader compatibility, and sufficient color contrast
- **FR-017**: System MUST generate a sitemap including all published posts with their canonical URLs
- **FR-018**: System MUST ensure code blocks are accessible to screen readers with proper semantic markup and language declaration
- **FR-019**: System MUST support URL-safe slugs for post permalinks (alphanumeric characters and hyphens only)
- **FR-020**: System MUST display clear "no results found" messaging when search or filter criteria match no posts

### Key Entities

- **Blog Post**: Represents a published article with attributes including title (unique), slug (unique, URL-safe), synopsis (brief summary), body (rich text content supporting headings, paragraphs, lists, links, images, code blocks), tags (multiple, for categorization), publishedAt (timestamp indicating when post went live), heroImage (featured image for post header and social previews), author (creator of the post), and reading time (calculated from word count). A post can have zero to many tags; tags enable filtering and discovery.

- **Tag**: Represents a topic or technology category with attributes including name (unique) and description. Tags are associated with multiple posts and enable readers to filter content by area of interest.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Readers can find a post by topic or technology using tag filters within 3 clicks from the blog list page
- **SC-002**: Blog list page achieves Core Web Vitals thresholds: LCP under 2.5s, FID under 100ms, CLS under 0.1
- **SC-003**: Individual blog post pages achieve Core Web Vitals thresholds: LCP under 2.5s, FID under 100ms, CLS under 0.1
- **SC-004**: Blog pages pass WCAG 2.1 AA automated accessibility tests with zero critical violations
- **SC-005**: RSS feed validates without errors using W3C Feed Validator
- **SC-006**: Social media previews (Open Graph and Twitter Cards) display correct title, description, and image when shared on Twitter, LinkedIn, and Facebook
- **SC-007**: Mobile reading experience maintains readability with no horizontal scrolling required for text content at standard viewport widths (320px and above)
- **SC-008**: Search returns relevant results within 1 second for queries against typical blog content volume (up to 100 posts)
- **SC-009**: Code blocks include accessible markup allowing screen readers to announce code language and provide copy functionality
- **SC-010**: Sitemap includes all published posts and validates without errors in Google Search Console

## Assumptions

- **Assumption 1**: Average reading speed is 200 words per minute for reading time calculations
- **Assumption 2**: Pagination displays 10 posts per page for optimal performance and scannability
- **Assumption 3**: Posts exceeding 1500 words warrant a table of contents for improved navigation
- **Assumption 4**: RSS feed includes the 10 most recent posts, which provides adequate subscription value without excessive payload
- **Assumption 5**: Tag filtering uses AND logic when multiple tags are selected (shows posts matching all selected tags)
- **Assumption 6**: Search functionality performs client-side filtering for simplicity; can be upgraded to server-side search if content volume grows significantly
- **Assumption 7**: Code syntax highlighting supports common languages used in technical writing (JavaScript, TypeScript, Python, HTML, CSS, JSON, Bash)
- **Assumption 8**: Author field is single-valued (one author per post); guest posts or co-authorship not currently in scope
- **Assumption 9**: Post body content supports a standard rich text feature set similar to Markdown/MDX capabilities
- **Assumption 10**: Canonical URLs point to the primary domain for the portfolio; cross-posting to other platforms not currently in scope

## Scope Boundaries

### In Scope

- Blog list page with pagination, tag filtering, and search
- Individual blog post pages with rich formatting
- Reading time calculation and display
- Table of contents generation for long posts
- Code block syntax highlighting and copy functionality
- Image captions and alt text
- RSS feed generation
- Social media preview meta tags (Open Graph and Twitter Cards)
- Canonical URL configuration
- Mobile-responsive design
- WCAG 2.1 AA accessibility compliance
- Sitemap generation for published posts

### Out of Scope

- Comment functionality on blog posts (may be addressed in future feature)
- Author profile pages (may be addressed in future feature)
- Related posts or recommendation engine (may be addressed in future feature)
- Email newsletter subscription (may be addressed in future feature)
- Draft preview for unpublished posts (considered admin functionality)
- Content management interface for creating/editing posts (considered admin functionality)
- Multi-author support or guest author workflows (may be addressed in future feature)
- Blog post series or collections (may be addressed in future feature)
- Bookmarking or "read later" functionality (may be addressed in future feature)
- Analytics dashboard for post performance (considered admin functionality)

## Dependencies

- Content must be created or migrated before blog functionality provides value to readers
- Hero images must be prepared and optimized for web delivery
- Accessibility testing tools needed to validate WCAG 2.1 AA compliance
- Social media testing tools (or manual testing) needed to verify Open Graph and Twitter Card previews
- RSS feed validator (W3C Feed Validator) needed to confirm feed compliance
- Core Web Vitals measurement tools (e.g., Google PageSpeed Insights, Lighthouse) needed to verify performance criteria
