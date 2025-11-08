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
  type WorkFrontmatter,
} from "@/lib/markdown";

/**
 * Generate static paths for all published case studies
 * Pre-renders case study detail pages at build time
 */
export async function generateStaticParams() {
  const slugs = getAllSlugs(CONTENT_TYPES.WORK);

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate metadata for case study detail pages
 * Includes OpenGraph and Twitter Card data for social sharing
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const caseStudy = await getContentBySlug<WorkFrontmatter>(
    CONTENT_TYPES.WORK,
    slug,
    false
  );

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const ogImage = caseStudy.frontmatter.heroImage;

  return {
    title: `${caseStudy.frontmatter.title} | Work | Jason Bui`,
    description: caseStudy.frontmatter.summary,
    openGraph: {
      title: caseStudy.frontmatter.title,
      description: caseStudy.frontmatter.summary,
      type: "article",
      url: `/work/${slug}`,
      publishedTime: caseStudy.frontmatter.date,
      authors: ["Jason Bui"],
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.frontmatter.title,
      description: caseStudy.frontmatter.summary,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/**
 * Work Case Study Detail Page
 *
 * Displays full case study content with metadata and structured sections.
 * Uses SSG for fully static pages.
 */
export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch case study data with HTML content
  const caseStudy = await getContentBySlug<WorkFrontmatter>(
    CONTENT_TYPES.WORK,
    slug,
    true
  );

  // Return 404 if case study not found
  if (!caseStudy) {
    notFound();
  }

  return (
    <main role="main">
      {/* Hero Section */}
      <section className="container-custom py-12">
        <ScrollReveal>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Work</span>
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-6">
            {caseStudy.frontmatter.role && (
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 rounded">
                {caseStudy.frontmatter.role}
              </span>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h1 className="heading-1 mb-6">{caseStudy.frontmatter.title}</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="body-large text-muted max-w-3xl mb-8">
            {caseStudy.frontmatter.summary}
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
            <time dateTime={caseStudy.frontmatter.date}>
              {formatDate(caseStudy.frontmatter.date)}
            </time>
          </div>
        </ScrollReveal>

        {/* Tech Stack Tags */}
        {caseStudy.frontmatter.techStack &&
          caseStudy.frontmatter.techStack.length > 0 && (
            <ScrollReveal delay={0.5}>
              <div className="flex flex-wrap gap-2 mb-12">
                {caseStudy.frontmatter.techStack.map((tech) => (
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

        {/* Impact Metrics */}
        {caseStudy.frontmatter.impact &&
          caseStudy.frontmatter.impact.length > 0 && (
            <ScrollReveal delay={0.6}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {caseStudy.frontmatter.impact.map((impact, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-muted rounded-lg"
                  >
                    <p className="text-lg font-semibold text-primary">
                      {impact.metric}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

        {/* Hero Image */}
        {caseStudy.frontmatter.heroImage && (
          <ScrollReveal delay={0.7}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-16">
              <Image
                src={caseStudy.frontmatter.heroImage}
                alt={`${caseStudy.frontmatter.title} - Hero Image`}
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
            dangerouslySetInnerHTML={{ __html: caseStudy.htmlContent || "" }}
          />
        </ScrollReveal>
      </section>

      {/* Navigation */}
      <section className="container-custom py-12 border-t border-border">
        <ScrollReveal>
          <div className="flex justify-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              View More Case Studies
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
