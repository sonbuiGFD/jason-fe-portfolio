import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { formatDate } from "@/lib/utils/date-formatter";
import {
  getContentBySlug,
  getAllSlugs,
  CONTENT_TYPES,
  type LabFrontmatter,
} from "@/lib/markdown";

/**
 * Generate static paths for all published lab projects
 * Pre-renders lab project detail pages at build time
 */
export async function generateStaticParams() {
  const slugs = getAllSlugs(CONTENT_TYPES.LABS);

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate metadata for lab project detail pages
 * Includes OpenGraph and Twitter Card data for social sharing
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const labProject = await getContentBySlug<LabFrontmatter>(
    CONTENT_TYPES.LABS,
    slug,
    false
  );

  if (!labProject) {
    return {
      title: "Lab Project Not Found",
    };
  }

  const ogImage = labProject.frontmatter.thumbnail;

  return {
    title: `${labProject.frontmatter.title} | Labs | Jason Bui`,
    description: labProject.frontmatter.summary,
    openGraph: {
      title: labProject.frontmatter.title,
      description: labProject.frontmatter.summary,
      type: "article",
      url: `/labs/${slug}`,
      publishedTime: labProject.frontmatter.date,
      authors: ["Jason Bui"],
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: labProject.frontmatter.title,
      description: labProject.frontmatter.summary,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/**
 * Lab Project Detail Page
 *
 * Displays full lab project content with metadata and structured sections.
 * Uses SSG for fully static pages.
 */
export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch lab project data with HTML content
  const labProject = await getContentBySlug<LabFrontmatter>(
    CONTENT_TYPES.LABS,
    slug,
    true
  );

  // Return 404 if lab project not found
  if (!labProject) {
    notFound();
  }

  return (
    <main role="main">
      {/* Hero Section */}
      <section className="container-custom py-12">
        <ScrollReveal>
          <Link
            href="/labs"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Labs</span>
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {labProject.frontmatter.demoUrl && (
              <a
                href={labProject.frontmatter.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 rounded hover:bg-primary/20 transition-colors"
              >
                <span>🚀</span>
                <span>Live Demo</span>
              </a>
            )}
            {labProject.frontmatter.repoUrl && (
              <a
                href={labProject.frontmatter.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground bg-muted rounded hover:bg-muted/80 transition-colors"
              >
                <span>📦</span>
                <span>Repository</span>
              </a>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h1 className="heading-1 mb-6">{labProject.frontmatter.title}</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="body-large text-muted max-w-3xl mb-8">
            {labProject.frontmatter.summary}
          </p>
        </ScrollReveal>

        {/* Meta Information */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Author:</span>
              <span>Jason Bui, Frontend Engineer</span>
            </div>
            <span aria-hidden="true">•</span>
            <time dateTime={labProject.frontmatter.date}>
              {formatDate(labProject.frontmatter.date)}
            </time>
          </div>
        </ScrollReveal>

        {/* Tech Stack Tags */}
        {labProject.frontmatter.techStack &&
          labProject.frontmatter.techStack.length > 0 && (
            <ScrollReveal delay={0.5}>
              <div className="flex flex-wrap gap-2 mb-12">
                {labProject.frontmatter.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-medium text-foreground bg-muted rounded border-l-2 border-l-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          )}

        {/* Thumbnail Image */}
        {labProject.frontmatter.thumbnail && (
          <ScrollReveal delay={0.6}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-16">
              <Image
                src={labProject.frontmatter.thumbnail}
                alt={`${labProject.frontmatter.title} - Project Thumbnail`}
                fill
                priority
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* Content */}
      <section className="container-custom py-12">
        <ScrollReveal>
          <div
            className="max-w-4xl mx-auto prose prose-lg dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: labProject.htmlContent || "" }}
          />
        </ScrollReveal>

        {/* External Links Section */}
        {(labProject.frontmatter.demoUrl || labProject.frontmatter.repoUrl) && (
          <ScrollReveal delay={0.1}>
            <article className="mt-16 p-8 bg-muted/50 rounded-lg border border-border">
              <h2 className="heading-3 mb-6">Explore This Project</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                {labProject.frontmatter.demoUrl && (
                  <a
                    href={labProject.frontmatter.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto">
                      <span>🚀</span>
                      View Live Demo
                    </button>
                  </a>
                )}
                {labProject.frontmatter.repoUrl && (
                  <a
                    href={labProject.frontmatter.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors w-full sm:w-auto">
                      <span>📦</span>
                      View Repository
                    </button>
                  </a>
                )}
              </div>
            </article>
          </ScrollReveal>
        )}
      </section>

      {/* Navigation */}
      <section className="container-custom py-12 border-t border-border">
        <ScrollReveal>
          <div className="flex justify-center">
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              View More Lab Projects
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
