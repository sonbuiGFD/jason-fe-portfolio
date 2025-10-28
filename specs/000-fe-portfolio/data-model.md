# Data Model: FE Engineer Portfolio

**Date**: October 29, 2025  
**Feature**: FE Engineer Portfolio  
**Status**: Phase 1 Complete

## Overview

This document defines the data entities, relationships, validation rules, and state transitions for the FE Engineer Portfolio. All entities are managed in Sanity CMS with schemas defined in `sanity/schemas/`.

---

## Entity: Author

**Description**: Represents the portfolio owner or content creator. This is a singleton document (only one instance exists).

### Attributes

| Field                  | Type   | Required | Default    | Validation                  | Description                                           |
| ---------------------- | ------ | -------- | ---------- | --------------------------- | ----------------------------------------------------- |
| `_id`                  | string | ✅       | auto       | System-generated            | Sanity document ID                                    |
| `_type`                | string | ✅       | `'author'` | Fixed value                 | Document type identifier                              |
| `name`                 | string | ✅       | -          | Min 2 chars, max 100 chars  | Full name (e.g., "Jason Bui")                         |
| `slug`                 | slug   | ✅       | auto       | Unique, lowercase, URL-safe | URL-safe identifier (e.g., "jason-bui")               |
| `role`                 | string | ✅       | -          | Max 100 chars               | Professional title (e.g., "Senior Frontend Engineer") |
| `bio`                  | text   | ✅       | -          | Min 50 chars, max 500 chars | Short biography for About page                        |
| `profileImage`         | image  | ✅       | -          | Max 5MB, aspect ratio 1:1   | Profile photo (square, min 400x400px)                 |
| `email`                | string | ❌       | -          | Valid email format          | Contact email (optional)                              |
| `socialLinks`          | object | ✅       | `{}`       | Valid URLs                  | Social media links (github, linkedin, twitter)        |
| `socialLinks.github`   | url    | ❌       | -          | Valid GitHub URL            | GitHub profile URL                                    |
| `socialLinks.linkedin` | url    | ❌       | -          | Valid LinkedIn URL          | LinkedIn profile URL                                  |
| `socialLinks.twitter`  | url    | ❌       | -          | Valid Twitter URL           | Twitter profile URL                                   |

### Relationships

- **One-to-Many** with `WorkCaseStudy` (one author, many case studies)
- **One-to-Many** with `LabProject` (one author, many lab projects)
- **One-to-Many** with `BlogPost` (one author, many blog posts)

### Validation Rules

- `name`: Must not be empty, must be unique (enforced in Sanity)
- `slug`: Auto-generated from `name`, must be URL-safe
- `bio`: Must be between 50-500 characters
- `profileImage`: Required, must be square aspect ratio
- `socialLinks.*`: Must be valid URLs if provided

---

## Entity: TechStack

**Description**: Represents a technology, framework, or tool used in case studies, lab projects, or blog posts. Used for filtering and categorization.

### Attributes

| Field         | Type   | Required | Default       | Validation                                | Description                                       |
| ------------- | ------ | -------- | ------------- | ----------------------------------------- | ------------------------------------------------- |
| `_id`         | string | ✅       | auto          | System-generated                          | Sanity document ID                                |
| `_type`       | string | ✅       | `'techStack'` | Fixed value                               | Document type identifier                          |
| `name`        | string | ✅       | -             | Min 2 chars, max 50 chars                 | Display name (e.g., "React", "TypeScript")        |
| `slug`        | slug   | ✅       | auto          | Unique, lowercase, URL-safe               | URL-safe identifier (e.g., "react", "typescript") |
| `category`    | string | ✅       | -             | Enum: language, framework, tool, platform | Technology category                               |
| `icon`        | image  | ❌       | -             | SVG or PNG, max 1MB                       | Technology logo/icon                              |
| `description` | text   | ❌       | -             | Max 200 chars                             | Optional description                              |

### Relationships

- **Many-to-Many** with `WorkCaseStudy` (referenced via `techStack` array)
- **Many-to-Many** with `LabProject` (referenced via `techStack` array)
- **Many-to-Many** with `BlogPost` (referenced via `techStack` array, optional)

### Validation Rules

- `name`: Must not be empty, must be unique
- `slug`: Auto-generated from `name`, must be unique
- `category`: Must be one of: `language`, `framework`, `tool`, `platform`

---

## Entity: Tag

**Description**: Represents a topic or category for blog posts (e.g., "Performance", "Accessibility", "CSS"). Used for filtering and grouping content.

### Attributes

| Field         | Type   | Required | Default | Validation                  | Description                                              |
| ------------- | ------ | -------- | ------- | --------------------------- | -------------------------------------------------------- |
| `_id`         | string | ✅       | auto    | System-generated            | Sanity document ID                                       |
| `_type`       | string | ✅       | `'tag'` | Fixed value                 | Document type identifier                                 |
| `name`        | string | ✅       | -       | Min 2 chars, max 50 chars   | Display name (e.g., "Performance", "React Hooks")        |
| `slug`        | slug   | ✅       | auto    | Unique, lowercase, URL-safe | URL-safe identifier (e.g., "performance", "react-hooks") |
| `description` | text   | ❌       | -       | Max 200 chars               | Optional description                                     |

### Relationships

- **Many-to-Many** with `BlogPost` (referenced via `tags` array)

### Validation Rules

- `name`: Must not be empty, must be unique
- `slug`: Auto-generated from `name`, must be unique

---

## Entity: WorkCaseStudy

**Description**: Represents a detailed case study of professional work with problem/solution narratives, architecture decisions, and impact metrics.

### Attributes

| Field              | Type              | Required | Default           | Validation                                     | Description                                             |
| ------------------ | ----------------- | -------- | ----------------- | ---------------------------------------------- | ------------------------------------------------------- |
| `_id`              | string            | ✅       | auto              | System-generated                               | Sanity document ID                                      |
| `_type`            | string            | ✅       | `'workCaseStudy'` | Fixed value                                    | Document type identifier                                |
| `title`            | string            | ✅       | -                 | Min 5 chars, max 100 chars                     | Case study title (e.g., "Modernizing Checkout Flow")    |
| `slug`             | slug              | ✅       | auto              | Unique, lowercase, URL-safe                    | URL-safe identifier (e.g., "modernizing-checkout-flow") |
| `summary`          | text              | ✅       | -                 | Min 50 chars, max 300 chars                    | Brief summary for card preview                          |
| `heroImage`        | image             | ✅       | -                 | Max 10MB, min 1200x630px                       | Hero image (16:9 aspect ratio recommended)              |
| `problemStatement` | array (blocks)    | ✅       | -                 | Min 100 chars                                  | Problem/challenge description (rich text)               |
| `approach`         | array (blocks)    | ✅       | -                 | Min 200 chars                                  | Solution approach narrative (rich text)                 |
| `architecture`     | array (blocks)    | ✅       | -                 | Min 200 chars                                  | Architecture decisions and trade-offs (rich text)       |
| `impact`           | array (blocks)    | ✅       | -                 | Min 100 chars                                  | Measurable outcomes and impact (rich text)              |
| `techStack`        | array (reference) | ✅       | `[]`              | Min 1 item                                     | Array of TechStack references                           |
| `roleType`         | string            | ✅       | -                 | Enum: Lead Engineer, Senior Engineer, Engineer | Role/level during project                               |
| `status`           | string            | ✅       | `'draft'`         | Enum: draft, review, published                 | Editorial workflow status                               |
| `author`           | reference         | ✅       | -                 | Valid Author reference                         | Reference to Author document                            |
| `publishedAt`      | datetime          | ❌       | -                 | ISO 8601 datetime                              | Publication timestamp (set when status → published)     |
| `_createdAt`       | datetime          | ✅       | auto              | System-generated                               | Creation timestamp                                      |
| `_updatedAt`       | datetime          | ✅       | auto              | System-generated                               | Last update timestamp                                   |

### Relationships

- **Many-to-One** with `Author` (many case studies, one author)
- **Many-to-Many** with `TechStack` (via `techStack` array)

### Validation Rules

- `title`: Must not be empty, min 5 chars
- `slug`: Auto-generated from `title`, must be unique across all WorkCaseStudy documents
- `summary`: Must be 50-300 characters
- `heroImage`: Required, recommended 1200x630px (16:9)
- `problemStatement`, `approach`, `architecture`, `impact`: Rich text arrays, must not be empty
- `techStack`: Must contain at least 1 TechStack reference
- `roleType`: Must be one of: `Lead Engineer`, `Senior Engineer`, `Engineer`
- `status`: Must be one of: `draft`, `review`, `published`

### State Transitions

```text
draft → review → published
  ↓                ↓
draft ← review ← published
```

- **draft → review**: Author requests editorial review
- **review → published**: Content approved, `publishedAt` timestamp set
- **published → draft**: Unpublish content (removes from public site)
- **Any state → Any state**: Author can transition freely (no enforcement, editorial process is guidance)

---

## Entity: LabProject

**Description**: Represents a side project or experiment with goals, learnings, and links to demos/repositories.

### Attributes

| Field            | Type              | Required | Default        | Validation                     | Description                                      |
| ---------------- | ----------------- | -------- | -------------- | ------------------------------ | ------------------------------------------------ |
| `_id`            | string            | ✅       | auto           | System-generated               | Sanity document ID                               |
| `_type`          | string            | ✅       | `'labProject'` | Fixed value                    | Document type identifier                         |
| `title`          | string            | ✅       | -              | Min 5 chars, max 100 chars     | Project title (e.g., "CSS Grid Explorer")        |
| `slug`           | slug              | ✅       | auto           | Unique, lowercase, URL-safe    | URL-safe identifier (e.g., "css-grid-explorer")  |
| `description`    | text              | ✅       | -              | Min 50 chars, max 300 chars    | Brief description for card preview               |
| `thumbnail`      | image             | ✅       | -              | Max 5MB, min 800x600px         | Project thumbnail (4:3 aspect ratio recommended) |
| `experimentGoal` | array (blocks)    | ✅       | -              | Min 100 chars                  | What the project aimed to explore (rich text)    |
| `keyLearnings`   | array (blocks)    | ✅       | -              | Min 100 chars                  | Key takeaways and insights (rich text)           |
| `techStack`      | array (reference) | ✅       | `[]`           | Min 1 item                     | Array of TechStack references                    |
| `demoUrl`        | url               | ❌       | -              | Valid URL                      | Live demo link (optional)                        |
| `repositoryUrl`  | url               | ❌       | -              | Valid URL                      | GitHub/GitLab repository link (optional)         |
| `status`         | string            | ✅       | `'draft'`      | Enum: draft, review, published | Editorial workflow status                        |
| `author`         | reference         | ✅       | -              | Valid Author reference         | Reference to Author document                     |
| `publishedAt`    | datetime          | ❌       | -              | ISO 8601 datetime              | Publication timestamp                            |
| `_createdAt`     | datetime          | ✅       | auto           | System-generated               | Creation timestamp                               |
| `_updatedAt`     | datetime          | ✅       | auto           | System-generated               | Last update timestamp                            |

### Relationships

- **Many-to-One** with `Author` (many lab projects, one author)
- **Many-to-Many** with `TechStack` (via `techStack` array)

### Validation Rules

- `title`: Must not be empty, min 5 chars
- `slug`: Auto-generated from `title`, must be unique across all LabProject documents
- `description`: Must be 50-300 characters
- `thumbnail`: Required, recommended 800x600px (4:3)
- `experimentGoal`, `keyLearnings`: Rich text arrays, must not be empty
- `techStack`: Must contain at least 1 TechStack reference
- `demoUrl`, `repositoryUrl`: Must be valid URLs if provided
- `status`: Must be one of: `draft`, `review`, `published`

### State Transitions

Same as `WorkCaseStudy` (draft → review → published).

---

## Entity: BlogPost

**Description**: Represents a blog article with rich text content, tags, and estimated reading time.

### Attributes

| Field         | Type              | Required | Default      | Validation                     | Description                                                 |
| ------------- | ----------------- | -------- | ------------ | ------------------------------ | ----------------------------------------------------------- |
| `_id`         | string            | ✅       | auto         | System-generated               | Sanity document ID                                          |
| `_type`       | string            | ✅       | `'blogPost'` | Fixed value                    | Document type identifier                                    |
| `title`       | string            | ✅       | -            | Min 5 chars, max 150 chars     | Blog post title (e.g., "React Performance Tips")            |
| `slug`        | slug              | ✅       | auto         | Unique, lowercase, URL-safe    | URL-safe identifier (e.g., "react-performance-tips")        |
| `summary`     | text              | ✅       | -            | Min 50 chars, max 300 chars    | Brief summary for card preview and meta description         |
| `heroImage`   | image             | ✅       | -            | Max 10MB, min 1200x630px       | Hero image (16:9 aspect ratio recommended)                  |
| `content`     | array (blocks)    | ✅       | -            | Min 500 chars                  | Full article content (rich text with code blocks)           |
| `tags`        | array (reference) | ✅       | `[]`         | Min 1 item                     | Array of Tag references                                     |
| `techStack`   | array (reference) | ❌       | `[]`         | -                              | Optional array of TechStack references                      |
| `readingTime` | number            | ❌       | auto         | Calculated                     | Estimated reading time in minutes (calculated from content) |
| `status`      | string            | ✅       | `'draft'`    | Enum: draft, review, published | Editorial workflow status                                   |
| `author`      | reference         | ✅       | -            | Valid Author reference         | Reference to Author document                                |
| `publishedAt` | datetime          | ❌       | -            | ISO 8601 datetime              | Publication timestamp                                       |
| `updatedAt`   | datetime          | ❌       | -            | ISO 8601 datetime              | Last content update timestamp                               |
| `_createdAt`  | datetime          | ✅       | auto         | System-generated               | Creation timestamp                                          |
| `_updatedAt`  | datetime          | ✅       | auto         | System-generated               | Last update timestamp                                       |

### Relationships

- **Many-to-One** with `Author` (many blog posts, one author)
- **Many-to-Many** with `Tag` (via `tags` array)
- **Many-to-Many** with `TechStack` (via optional `techStack` array)

### Validation Rules

- `title`: Must not be empty, min 5 chars, max 150 chars
- `slug`: Auto-generated from `title`, must be unique across all BlogPost documents
- `summary`: Must be 50-300 characters
- `heroImage`: Required, recommended 1200x630px (16:9)
- `content`: Rich text array, must be at least 500 characters (approx. 2-3 paragraphs)
- `tags`: Must contain at least 1 Tag reference
- `techStack`: Optional, but if present, must contain valid TechStack references
- `readingTime`: Auto-calculated based on word count (avg. 200 words/minute)
- `status`: Must be one of: `draft`, `review`, `published`

### State Transitions

Same as `WorkCaseStudy` (draft → review → published).

### Reading Time Calculation

```typescript
// lib/utils/reading-time.ts
export function calculateReadingTime(content: any[]): number {
  const text = content
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children.map((child: any) => child.text).join("");
      }
      return "";
    })
    .join(" ");

  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/minute
  return readingTime;
}
```

---

## Entity Relationships Diagram

```text
┌──────────┐
│  Author  │ (Singleton)
└────┬─────┘
     │
     │ 1:N (one author, many case studies)
     ├─────────────────────────────────────────┐
     │                                         │
     │                                         │
┌────▼────────────┐         ┌─────────────┐  │
│ WorkCaseStudy   │ M:N     │  TechStack  │  │
│                 ├─────────►             │  │
│ - title         │         │ - name      │  │
│ - slug          │         │ - slug      │  │
│ - summary       │         │ - category  │  │
│ - heroImage     │         └─────────────┘  │
│ - problem       │                           │
│ - approach      │                           │
│ - architecture  │                           │
│ - impact        │         ┌─────────────┐  │
│ - roleType      │         │     Tag     │  │
│ - status        │         │             │  │
│ - publishedAt   │         │ - name      │  │
└─────────────────┘         │ - slug      │  │
                            └─────────────┘  │
                                              │
┌──────────────┐           ┌─────────────┐  │
│  LabProject  │ M:N       │  TechStack  │  │
│              ├───────────►             │  │
│ - title      │           └─────────────┘  │
│ - slug       │                             │
│ - description│                             │
│ - thumbnail  │                             │
│ - goal       │                             │
│ - learnings  │                             │
│ - demoUrl    │                             │
│ - repoUrl    │                             │
│ - status     │                             │
│ - publishedAt│                             │
└──────────────┘                             │
                                              │
┌──────────────┐           ┌─────────────┐  │
│   BlogPost   │ M:N       │     Tag     │  │
│              ├───────────►             │  │
│ - title      │           └─────────────┘  │
│ - slug       │                             │
│ - summary    │           ┌─────────────┐  │
│ - heroImage  │ M:N       │  TechStack  │  │
│ - content    ├───────────► (optional)  │  │
│ - tags       │           └─────────────┘  │
│ - techStack  │                             │
│ - readingTime│                             │
│ - status     │                             │
│ - publishedAt│                             │
│ - updatedAt  │                             │
└──────────────┘                             │
     │                                       │
     └───────────────────────────────────────┘
         1:N (one author, many blog posts)
```

---

## Data Access Patterns

### Pattern 1: Fetch All Published Case Studies with Tech Stack

**Use Case**: Work Experience index page

**GROQ Query**:

```groq
*[_type == "workCaseStudy" && status == "published"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  summary,
  "heroImageUrl": heroImage.asset->url,
  techStack[]->{
    name,
    slug,
    category
  },
  roleType,
  publishedAt
}
```

---

### Pattern 2: Fetch Single Case Study by Slug

**Use Case**: Case study detail page

**GROQ Query**:

```groq
*[_type == "workCaseStudy" && slug.current == $slug && status == "published"][0] {
  _id,
  title,
  slug,
  summary,
  heroImage,
  problemStatement,
  approach,
  architecture,
  impact,
  techStack[]->{
    name,
    slug,
    category
  },
  roleType,
  author->{
    name,
    role,
    profileImage
  },
  publishedAt
}
```

---

### Pattern 3: Fetch Paginated Blog Posts with Tags and Reading Time

**Use Case**: Blog index page with "Load More" pagination

**GROQ Query** (Initial load - first 20 posts):

```groq
*[_type == "blogPost" && status == "published"]
 | order(publishedAt desc) [0...20] {
  _id,
  title,
  slug,
  summary,
  "heroImageUrl": heroImage.asset->url,
  tags[]->{
    name,
    slug
  },
  readingTime,
  publishedAt,
  author->{
    name,
    profileImage
  }
}
```

**GROQ Query** (Subsequent loads - offset-based):

```groq
*[_type == "blogPost" && status == "published"]
 | order(publishedAt desc) [$offset...$offset + 20] {
  _id,
  title,
  slug,
  summary,
  "heroImageUrl": heroImage.asset->url,
  tags[]->{
    name,
    slug
  },
  readingTime,
  publishedAt,
  author->{
    name,
    profileImage
  }
}
```

**Total Count Query**:

```groq
count(*[_type == "blogPost" && status == "published"])
```

---

### Pattern 3a: Fetch Paginated Work Case Studies

**Use Case**: Work index page with "Load More" pagination

**GROQ Query** (Initial load - first 20 case studies):

```groq
*[_type == "workCaseStudy" && status == "published"]
 | order(publishedAt desc) [0...20] {
  _id,
  title,
  slug,
  summary,
  "heroImageUrl": heroImage.asset->url,
  techStack[]->{
    name,
    slug,
    category
  },
  roleType,
  publishedAt
}
```

**Total Count Query**:

```groq
count(*[_type == "workCaseStudy" && status == "published"])
```

---

### Pattern 3b: Fetch Paginated Lab Projects

**Use Case**: Labs index page with "Load More" pagination

**GROQ Query** (Initial load - first 20 projects):

```groq
*[_type == "labProject" && status == "published"]
 | order(publishedAt desc) [0...20] {
  _id,
  title,
  slug,
  description,
  "thumbnailUrl": thumbnail.asset->url,
  techStack[]->{
    name,
    slug,
    category
  },
  demoUrl,
  repositoryUrl,
  publishedAt
}
```

**Total Count Query**:

```groq
count(*[_type == "labProject" && status == "published"])
```

---

### Pattern 4: Fetch Related Blog Posts by Shared Tags

**Use Case**: Related posts section on blog post detail page

**GROQ Query**:

```groq
*[
  _type == "blogPost" &&
  status == "published" &&
  _id != $currentPostId &&
  count((tags[]->slug.current)[@ in $currentPostTags]) > 0
] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  summary,
  "heroImageUrl": heroImage.asset->url,
  publishedAt
}
```

---

### Pattern 5: Build Search Index (All Published Content)

**Use Case**: Pre-build search index for client-side search

**GROQ Query**:

```groq
{
  "workCaseStudies": *[_type == "workCaseStudy" && status == "published"] {
    _id,
    "type": "work",
    title,
    "url": "/work/" + slug.current,
    summary,
    "tags": techStack[]->name,
    "content": pt::text(problemStatement) + " " + pt::text(approach)
  },
  "labProjects": *[_type == "labProject" && status == "published"] {
    _id,
    "type": "lab",
    title,
    "url": "/labs/" + slug.current,
    "summary": description,
    "tags": techStack[]->name,
    "content": pt::text(experimentGoal) + " " + pt::text(keyLearnings)
  },
  "blogPosts": *[_type == "blogPost" && status == "published"] {
    _id,
    "type": "blog",
    title,
    "url": "/blog/" + slug.current,
    summary,
    "tags": tags[]->name,
    "content": pt::text(content)[0...500]
  }
}
```

---

## Pagination Strategy

### Overview

To handle content volumes (10-20 case studies, 50-100 blog posts, 10-20 lab projects) efficiently while maintaining performance and UX quality, the system implements a **"Load More" pagination pattern** across all content index pages (Work, Labs, Blog).

### Pagination Configuration

| Content Type     | Initial Load | Per Load    | Expected Total | Strategy                |
| ---------------- | ------------ | ----------- | -------------- | ----------------------- |
| **Blog Posts**   | 20 posts     | 20 posts    | 50-100 posts   | Load More (recommended) |
| **Work Studies** | 20 studies   | 20 studies  | 10-20 studies  | Load More (optional)    |
| **Lab Projects** | 20 projects  | 20 projects | 10-20 projects | Load More (optional)    |

### Implementation Pattern

**1. Initial SSG/ISR Page Load**:

- Fetch first 20 items via GROQ query with `[0...20]` slice
- Render server-side for optimal LCP and SEO
- Include total count for pagination logic

**2. "Load More" Button (Client-Side)**:

- Display button if `currentCount < totalCount`
- On click, fetch next batch via `/api/{content-type}/items?offset={offset}&limit=20`
- Append new items to existing list (no page reload)
- Update button state and remaining count

**3. API Route for Pagination**:

- Accept `offset` and `limit` query parameters
- Query Sanity with `[$offset...$offset + $limit]` slice
- Return JSON array of items
- Cache responses with short TTL (e.g., 5 minutes)

### Benefits

- ✅ **Performance**: Initial load remains fast (LCP ≤2.5s) with only 20 items
- ✅ **UX**: Modern interaction pattern with clear user control
- ✅ **SEO**: All items included in sitemap.xml for discoverability
- ✅ **Accessibility**: Button is keyboard-accessible, announces loading state
- ✅ **Progressive Enhancement**: Works without JavaScript (fallback to paginated URLs if needed)

### SEO Considerations

1. **Sitemap.xml**: Include ALL items (not just first page) for search engine crawlability
2. **Structured Data**: Add JSON-LD for `ItemList` with `numberOfItems` property
3. **Meta Tags**: First page has canonical URL, no rel="next/prev" needed for "Load More" pattern
4. **Search Index**: All items included in pre-built search index for instant discovery

### Example: Blog Pagination Flow

```typescript
// 1. Initial SSG page load
const initialPosts = await sanityClient.fetch(
  `*[_type == "blogPost" && status == "published"] 
   | order(publishedAt desc) [0...20] { ... }`
);
const totalPosts = await sanityClient.fetch(
  `count(*[_type == "blogPost" && status == "published"])`
);

// 2. Client-side "Load More"
const loadMore = async (offset: number) => {
  const response = await fetch(`/api/blog/posts?offset=${offset}&limit=20`);
  const newPosts = await response.json();
  return newPosts;
};

// 3. API route
export async function GET(request: NextRequest) {
  const offset = parseInt(request.nextUrl.searchParams.get("offset") || "0");
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "20");

  const posts = await sanityClient.fetch(
    `*[_type == "blogPost" && status == "published"] 
     | order(publishedAt desc) [${offset}...${offset + limit}] { ... }`
  );

  return NextResponse.json(posts);
}
```

### Alternative: Traditional Pagination (Optional Fallback)

For users with JavaScript disabled or search engines that prefer paginated URLs:

- Generate static pages at `/blog/page/[pageNumber]` (e.g., `/blog/page/2`)
- Use `generateStaticParams` to pre-render all pages
- Include `rel="next"` and `rel="prev"` link tags
- "Load More" button falls back to these URLs if JavaScript unavailable

---

## Validation Summary

| Entity            | Required Fields                                                                                                        | Unique Fields | Status Enum              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------ |
| **Author**        | name, slug, role, bio, profileImage, socialLinks                                                                       | name, slug    | N/A                      |
| **TechStack**     | name, slug, category                                                                                                   | name, slug    | N/A                      |
| **Tag**           | name, slug                                                                                                             | name, slug    | N/A                      |
| **WorkCaseStudy** | title, slug, summary, heroImage, problemStatement, approach, architecture, impact, techStack, roleType, status, author | slug          | draft, review, published |
| **LabProject**    | title, slug, description, thumbnail, experimentGoal, keyLearnings, techStack, status, author                           | slug          | draft, review, published |
| **BlogPost**      | title, slug, summary, heroImage, content, tags, status, author                                                         | slug          | draft, review, published |

---

## Next Steps

Proceed to generate:

1. **contracts/**: Sanity schemas, TypeScript types, search index schema
2. **quickstart.md**: Setup instructions, environment configuration, development workflow
