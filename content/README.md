# Content Directory

This directory contains all markdown-based content for the portfolio site.

## Structure

```
content/
├── blog/          # Blog posts
├── work/          # Case studies from professional work
├── labs/          # Side projects and experiments
└── README.md      # This file
```

## Content Guidelines

### File Naming

- Use lowercase with hyphens: `my-awesome-post.md`
- The filename becomes the URL slug
- Ensure unique filenames within each directory

### Frontmatter Requirements

#### Blog Posts (`content/blog/`)

```yaml
---
title: "Your Blog Post Title" # Required
date: "YYYY-MM-DD" # Required
author: "Author Name" # Required
summary: "Brief description" # Required
tags: ["Tag1", "Tag2"] # Required (array)
heroImage: "/images/blog/image.jpg" # Optional
---
```

#### Work Case Studies (`content/work/`)

```yaml
---
title: "Case Study Title" # Required
date: "YYYY-MM-DD" # Required
summary: "Brief description" # Required
role: "Your Role" # Required
techStack: ["Tech1", "Tech2"] # Required (array)
heroImage: "/images/work/image.jpg" # Optional
impact: # Optional (array of metrics)
  - metric: "35% improvement in X"
  - metric: "50% reduction in Y"
---
```

#### Lab Projects (`content/labs/`)

```yaml
---
title: "Project Title" # Required
date: "YYYY-MM-DD" # Required
summary: "Brief description" # Required
techStack: ["Tech1", "Tech2"] # Required (array)
thumbnail: "/images/labs/image.jpg" # Optional
demoUrl: "https://demo.example.com" # Optional
repoUrl: "https://github.com/user/repo" # Optional
---
```

## Markdown Content

### Headings

Use proper heading hierarchy (H1 for title is auto-generated from frontmatter):

```markdown
## Section Heading (H2)

### Subsection (H3)

#### Detail (H4)
```

### Code Blocks

Use fenced code blocks with language specification for syntax highlighting:

````markdown
```javascript
const example = "code here";
```
````

Supported languages: javascript, typescript, jsx, tsx, css, scss, html, json, bash, python, etc.

### Images

Reference images from the `public` directory:

```markdown
![Alt text](/images/blog/my-image.jpg)
```

Store images in:

- `/public/images/blog/` for blog posts
- `/public/images/work/` for case studies
- `/public/images/labs/` for lab projects

### Links

Internal links (to other pages):

```markdown
[Check out my work](/work)
```

External links:

```markdown
[Visit React docs](https://react.dev)
```

## Draft Content

To keep content as draft (not published):

1. **Option 1**: Keep it in a separate Git branch
2. **Option 2**: Prefix filename with underscore: `_draft-my-post.md`
3. **Option 3**: Set `draft: true` in frontmatter (requires code implementation)

Files prefixed with underscore are automatically ignored during build.

## Publishing Workflow

1. Create/edit markdown file in appropriate directory
2. Commit changes to a feature branch
3. Preview locally with `npm run dev`
4. When ready, merge to `main` branch
5. GitHub Actions automatically rebuilds and deploys the site

## Tips

- **Reading Time**: Calculated automatically from word count
- **Related Posts**: Determined by matching tags
- **SEO**: Title, summary, and tags are used for meta tags
- **Slugs**: Automatically derived from filename (no need to specify in frontmatter)
- **Dates**: Use ISO format (YYYY-MM-DD) for consistent sorting

## Example Content

Check the example files in each directory:

- `blog/example-blog-post.md`
- `work/modernizing-checkout-flow.md`
- `labs/css-grid-explorer.md`

These demonstrate proper structure and best practices.
