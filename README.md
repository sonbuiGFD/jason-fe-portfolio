# Jason Bui - Frontend Engineer Portfolio

A modern, static portfolio website built with Next.js 16, TypeScript, and TailwindCSS. Features a markdown-based content management system for blog posts, work case studies, and lab projects.

## 🚀 Features

- **Static Site Generation**: Fast, SEO-friendly pages generated at build time with no external dependencies
- **Markdown Content**: Easy-to-write content using Markdown with frontmatter, version controlled in Git
- **Search Functionality**: Client-side fuzzy search across all content
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Dark Mode Support**: Automatic theme switching
- **Performance Optimized**: Code splitting, image optimization, and lazy loading
- **TypeScript**: Full type safety throughout the application
- **No Runtime Costs**: Fully static, no database or API calls

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.3+
- **Styling**: TailwindCSS 4.1+
- **Content**: Markdown with gray-matter
- **Search**: Fuse.js for fuzzy search
- **Animations**: Framer Motion
- **Icons**: SVGR for React components

## 📁 Project Structure

```text
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog listing and detail pages
│   ├── labs/              # Labs listing and detail pages
│   ├── work/              # Work listing and detail pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── ui/               # UI components (Button, Card, etc.)
│   ├── content/          # Content-specific components
│   ├── layout/           # Layout components (Header, Footer)
│   └── navigation/       # Navigation components
├── content/              # Markdown content files
│   ├── blog/            # Blog posts
│   ├── work/            # Work case studies
│   └── labs/            # Lab projects
├── lib/                 # Utility libraries
│   ├── markdown/        # Markdown processing utilities
│   └── search/          # Search functionality
├── public/              # Static assets
│   ├── fonts/          # Custom fonts
│   ├── icons/          # SVG icons
│   └── images/         # Image assets
└── styles/             # Global styles and themes
```

## 📝 Content Management

Content is managed through Markdown files with YAML frontmatter. Each content type has its own directory under `content/`.

### Blog Posts

Located in `content/blog/`. Each post is a `.md` file with frontmatter:

```yaml
---
title: "Getting Started with React Performance Optimization"
date: "2025-01-15"
author: "Jason Bui"
tags: ["React", "Performance", "JavaScript"]
heroImage: "/images/blog/react-performance.jpg"
summary: "Learn practical techniques to improve React application performance..."
---
# Blog post content here

Your markdown content goes here...
```

### Work Case Studies

Located in `content/work/`. Each case study includes:

```yaml
---
title: "Modernizing E-Commerce Checkout Flow"
date: "2025-01-10"
role: "Senior Frontend Engineer"
techStack: ["React", "TypeScript", "Next.js", "Stripe"]
heroImage: "/images/work/checkout-flow.jpg"
summary: "Led the redesign and implementation of a streamlined checkout process..."
impact:
  - metric: "35% reduction in cart abandonment"
  - metric: "25% increase in conversion rate"
---
# Case Study Content

Detailed description of the project...
```

### Lab Projects

Located in `content/labs/`. Each lab project includes:

```yaml
---
title: "CSS Grid Layout Explorer"
date: "2025-01-05"
techStack: ["Vue.js", "CSS Grid", "TypeScript"]
thumbnail: "/images/labs/css-grid.jpg"
demoUrl: "https://css-grid-explorer.demo"
repoUrl: "https://github.com/username/css-grid-explorer"
summary: "An interactive tool for learning CSS Grid properties..."
---
# Experiment Goal

Description of the learning objectives...
```

## 🔍 Search Index

The search functionality automatically indexes all content at build time. To rebuild the search index:

```bash
npm run build:search-index
```

This generates `public/search-index.json` which is used by the client-side search.

## 🚀 Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sonbuiGFD/jason-fe-portfolio.git
cd jason-fe-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript type checking
npm run format       # Format code with Prettier
npm run build:search-index  # Build search index
```

## 📦 Deployment

This project uses static site generation (SSG) and can be deployed to any platform that supports static files or Next.js:

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure the build
3. The build process will:
   - Install dependencies
   - Generate static pages from markdown content
   - Build the search index
   - Deploy the application

### Netlify

1. Connect your GitHub repository to Netlify
2. Set the build command: `npm run build`
3. Set the publish directory: `.next` (or `out` for static export)
4. Add environment variables in Netlify dashboard

### Other Platforms

For platforms that support Node.js applications:

```bash
# Build the application
npm run build

# The build output will be in the `.next` directory
```

### Content Updates

Since this is a static site, content updates require rebuilding:

1. Edit markdown files in the `content/` directory
2. Commit and push changes to trigger automatic deployment
3. The build process will regenerate all pages with new content

## 🔄 Content Management Workflow

### Adding New Content

1. Create a markdown file in the appropriate directory:

   ```bash
   touch content/blog/my-new-post.md
   ```

2. Add frontmatter and content:

   ```markdown
   ---
   title: "My New Post"
   date: "2025-11-08"
   author: "Jason Bui"
   summary: "Brief description"
   tags: ["Tag1", "Tag2"]
   heroImage: "/images/blog/hero.jpg"
   ---

   # Your content here...
   ```

3. Add images to `/public/images/`

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

Keep drafts in separate branches or prefix with underscore: `_draft-post-name.md` (auto-ignored)

## 🎨 Styling Guidelines

### CSS Architecture

- **BEM Methodology**: Block Element Modifier naming convention
- **Utility Classes**: TailwindCSS for rapid styling
- **Component Styles**: Scoped styles for complex components

### BEM Naming Convention

```scss
.block__element__modifier {
  // Styles here
}

// Examples:
.card__header__centered
.button__icon__large
.nav__item__active
```

### Color System

Uses CSS custom properties defined in `styles/themes.scss`:

```css
/* Primary colors */
--color-primary: rgb(59 130 246); /* Blue */
--color-background: rgb(255 255 255); /* White */

/* Semantic colors */
--color-muted: rgb(156 163 175); /* Gray */
--color-border: rgb(229 231 235); /* Light gray */
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Jason Bui - Frontend Engineer

# Analytics (optional - Vercel Analytics or Plausible)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

### TailwindCSS

Configuration is handled through CSS custom properties in `styles/tailwind.css`. No `tailwind.config.js` file is needed for TailwindCSS v4.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `npm run lint && npm run type-check`
5. Commit your changes: `git commit -am 'Add your feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Jason Bui**

- Website: [jasonbui.dev](https://jasonbui.dev)
- LinkedIn: [linkedin.com/in/jasonbui-dev](https://linkedin.com/in/jasonbui-dev)
- GitHub: [github.com/sonbuiGFD](https://github.com/sonbuiGFD)

---

Built with ❤️ using Next.js, TypeScript, and TailwindCSS.
