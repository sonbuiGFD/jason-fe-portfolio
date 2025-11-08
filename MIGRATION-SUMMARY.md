# Markdown-Based Static Site Migration Summary

**Date**: November 8, 2025  
**Status**: In Progress  
**Branch**: `000-fe-portfolio`

## Overview

This document outlines the migration from Sanity CMS to a markdown-based static site with full static generation (SSG) and no revalidation.

## Completed Work

### ✅ 1. Specification Update

- Updated `specs/000-fe-portfolio/spec.md` to reflect markdown-based architecture
- Removed all Sanity CMS references
- Added pagination requirements (15 items/page for blog, 10 for work, 12 for labs)
- Removed filtering requirements
- Updated clarifications and user stories

### ✅ 2. Content Directory Structure

Created `content/` directory with:

- `content/blog/` - Blog post markdown files
- `content/work/` - Case study markdown files
- `content/labs/` - Lab project markdown files
- `content/README.md` - Documentation for content management
- Example files demonstrating frontmatter structure

### ✅ 3. Markdown Dependencies

Installed:

- `gray-matter` - Frontmatter parsing
- `remark` & `remark-html` - Markdown to HTML conversion
- `remark-gfm` - GitHub Flavored Markdown support
- `rehype-highlight` - Syntax highlighting

### ✅ 4. Markdown Processing Utilities

Created `lib/markdown/index.ts` with:

- `getContentBySlug()` - Fetch single content item
- `getAllContent()` - Fetch all content for a type
- `getPaginatedContent()` - Fetch paginated content
- `getAllSlugs()` - Get all slugs for static generation
- `getRelatedContent()` - Find related items by tags
- `searchContent()` - Simple search implementation
- `markdownToHtml()` - Convert markdown to HTML
- `calculateReadingTime()` - Reading time estimation
- Type definitions for Blog, Work, and Labs frontmatter

### ✅ 5. Pagination Component

Created `components/ui/Pagination.tsx`:

- Accessible pagination with keyboard navigation
- Previous/Next buttons
- Page number links with ellipsis for large page counts
- ARIA labels and screen reader support
- Responsive mobile design
- BEM-style SCSS in `styles/components/_pagination.scss`

### ✅ 6. Blog Pages Update

- Updated `app/blog/page.tsx` for markdown-based pagination
- Removed Sanity client and queries
- Implemented static generation with pagination
- Added proper metadata and SEO

## Remaining Work

### 7. Blog Detail Page (`app/blog/[slug]/page.tsx`)

**Status**: Needs completion

Create new file with:

```typescript
import {
  getContentBySlug,
  getAllSlugs,
  getRelatedContent,
  CONTENT_TYPES,
  type BlogFrontmatter,
} from "@/lib/markdown";

export async function generateStaticParams() {
  return getAllSlugs(CONTENT_TYPES.BLOG).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getContentBySlug<BlogFrontmatter>(
    CONTENT_TYPES.BLOG,
    slug,
    false
  );
  // Return metadata...
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogPost = await getContentBySlug<BlogFrontmatter>(
    CONTENT_TYPES.BLOG,
    slug,
    true
  );
  if (!blogPost) notFound();

  const relatedPosts = await getRelatedContent<BlogFrontmatter>(
    CONTENT_TYPES.BLOG,
    slug,
    blogPost.frontmatter.tags || [],
    3
  );

  // Render blog post with dangerouslySetInnerHTML for htmlContent
  // Display related posts
}
```

### 8. Work Pages (`app/work/page.tsx` & `app/work/[slug]/page.tsx`)

**Pattern**: Same as blog pages but with `WorkFrontmatter` type and `CONTENT_TYPES.WORK`

Key differences:

- Frontmatter: `role`, `techStack`, `impact` array
- 10 items per page
- Display impact metrics in cards

### 9. Labs Pages (`app/labs/page.tsx` & `app/labs/[slug]/page.tsx`)

**Pattern**: Same as blog pages but with `LabFrontmatter` type and `CONTENT_TYPES.LABS`

Key differences:

- Frontmatter: `techStack`, `demoUrl`, `repoUrl`, `thumbnail`
- 12 items per page (grid layout)
- Link to demo/repo if available

### 10. Remove Filter Components

Delete or update:

- `components/content/FilterBar.tsx` - No longer needed
- `app/blog/BlogPageClient.tsx` - Remove filtering logic
- `app/work/WorkPageClient.tsx` - Remove filtering logic
- `app/labs/LabsPageClient.tsx` - Remove filtering logic

### 11. Update Search Functionality

Update `lib/search/`:

- `build-index.ts` - Build search index from markdown files instead of Sanity
- `search-client.ts` - Query markdown-based index
- Update search modal to work with new structure

### 12. Remove Sanity Dependencies

**Delete directories**:

```bash
rm -rf lib/sanity/
rm -rf sanity/
rm -rf app/admin/
```

**Remove from `package.json`**:

```bash
npm uninstall @sanity/client @sanity/code-input @sanity/image-url @sanity/vision next-sanity sanity groq
```

**Delete files**:

- `lib/sanity/client.ts`
- `lib/sanity/image-builder.ts`
- `lib/sanity/queries.ts`
- `lib/sanity/types.ts`
- `sanity.config.ts`
- All schema files in `sanity/schemas/`

### 13. GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel (or your hosting)
        # Add deployment step based on your hosting provider
        # Vercel: Use vercel-action
        # Netlify: Use netlify-cli
        # AWS: Use AWS CLI
```

### 14. Update README.md

Document:

- New content management workflow (markdown files)
- Content directory structure
- Frontmatter requirements
- Local development setup
- How to add new content
- Publishing workflow via Git
- GitHub Actions deployment process

## Testing Checklist

After completing the migration:

- [ ] All blog posts render correctly with pagination
- [ ] Blog detail pages show related posts
- [ ] Work case studies render with pagination
- [ ] Work detail pages show proper formatting
- [ ] Labs projects render with pagination
- [ ] Labs detail pages link to demos/repos
- [ ] Pagination controls work (Previous/Next, page numbers)
- [ ] Reading time displays correctly
- [ ] Images load from `/public/images/`
- [ ] Syntax highlighting works in code blocks
- [ ] Related content suggestions work
- [ ] Search functionality works
- [ ] Metadata and SEO tags are correct
- [ ] Social sharing (OpenGraph/Twitter Cards) works
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Keyboard navigation works
- [ ] Lighthouse scores remain high (>90 for all metrics)
- [ ] Build completes without errors
- [ ] Static generation produces all pages
- [ ] GitHub Actions workflow triggers on push to main

## Migration Benefits

1. **Simpler Architecture**: No external CMS dependency
2. **Version Control**: All content in Git
3. **Faster Builds**: No API calls during build
4. **Better DX**: Edit content in your preferred editor
5. **No Runtime Costs**: Fully static, no database or API
6. **Easier Deployment**: Just push to Git
7. **Better Performance**: No client-side data fetching

## Content Management Workflow

### Adding New Content

1. Create markdown file in appropriate directory:

   ```bash
   touch content/blog/my-new-post.md
   ```

2. Add frontmatter and content:

   ```markdown
   ---
   title: "My New Post"
   date: "2025-11-08"
   author: "Your Name"
   summary: "Brief description"
   tags: ["Tag1", "Tag2"]
   heroImage: "/images/blog/hero.jpg"
   ---

   # Your content here...
   ```

3. Add images to `/public/images/blog/`

4. Test locally:

   ```bash
   npm run dev
   ```

5. Commit and push:

   ```bash
   git add content/blog/my-new-post.md public/images/blog/hero.jpg
   git commit -m "Add new blog post: My New Post"
   git push origin main
   ```

6. GitHub Actions automatically rebuilds and deploys

### Drafts

Keep drafts in separate branches:

```bash
git checkout -b draft/my-post
# Work on content
# When ready:
git checkout main
git merge draft/my-post
git push
```

Or prefix with underscore: `_draft-post-name.md` (auto-ignored)

## Next Steps

1. Complete blog detail page implementation
2. Update work and labs pages following the same pattern
3. Remove filter components and client-side logic
4. Update search to use markdown files
5. Remove all Sanity dependencies
6. Create GitHub Actions workflow
7. Update README and documentation
8. Test thoroughly
9. Deploy to production

## Questions or Issues?

- Check `content/README.md` for content guidelines
- Review example markdown files in each content directory
- Refer to `lib/markdown/index.ts` for available utility functions
- See `specs/000-fe-portfolio/spec.md` for updated requirements
