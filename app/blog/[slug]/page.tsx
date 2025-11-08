import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { formatDate } from "@/lib/utils/date-formatter";
import {
  getContentBySlug,
  getAllSlugs,
  getRelatedContent,
  CONTENT_TYPES,
  type BlogFrontmatter,
} from "@/lib/markdown";

/**
 * Generate static paths for all published blog posts
 * Pre-renders blog post detail pages at build time
 */
export async function generateStaticParams() {
  const slugs = getAllSlugs(CONTENT_TYPES.BLOG);

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate metadata for blog post detail pages
 * Includes OpenGraph and Twitter Card data for social sharing
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getContentBySlug<BlogFrontmatter>(
    CONTENT_TYPES.BLOG,
    slug,
    false
  );

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const ogImage = post.frontmatter.heroImage;

  return {
    title: `${post.frontmatter.title} | Blog | Jason Bui`,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/**
 * Blog Post Detail Page
 *
 * Displays full blog post content with metadata, reading time, and related posts.
 * Uses SSG for fully static pages.
 */
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch blog post data with HTML content
  const post = await getContentBySlug<BlogFrontmatter>(
    CONTENT_TYPES.BLOG,
    slug,
    true
  );

  // Return 404 if post not found
  if (!post) {
    notFound();
  }

  // Fetch related posts based on tags
  const relatedPosts = await getRelatedContent<BlogFrontmatter>(
    CONTENT_TYPES.BLOG,
    slug,
    post.frontmatter.tags,
    3
  );

  return (
    <main role="main">
      {/* Hero Section */}
      <section className="container-custom py-12">
        <ScrollReveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Blog</span>
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="heading-1 mb-6">{post.frontmatter.title}</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="body-large text-muted max-w-3xl mb-8">
            {post.frontmatter.summary}
          </p>
        </ScrollReveal>

        {/* Meta Information */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Author:</span>
              <span>{post.frontmatter.author}</span>
            </div>
            <span aria-hidden="true">•</span>
            <time dateTime={post.frontmatter.date}>
              {formatDate(post.frontmatter.date)}
            </time>
            {post.readingTime && (
              <>
                <span aria-hidden="true">•</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
          </div>
        </ScrollReveal>

        {/* Tags */}
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap gap-2 mb-12">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Hero Image */}
        {post.frontmatter.heroImage && (
          <ScrollReveal delay={0.5}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-16">
              <Image
                src={post.frontmatter.heroImage}
                alt={`${post.frontmatter.title} - Hero Image`}
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
            dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}
          />
        </ScrollReveal>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container-custom py-12 border-t border-border">
          <ScrollReveal>
            <h2 className="heading-2 mb-8">Related Posts</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost, index) => (
              <ScrollReveal key={relatedPost.slug} delay={0.1 * index}>
                <article className="group">
                  <Link href={`/blog/${relatedPost.slug}`} className="block">
                    <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <h3 className="heading-4 mb-3 group-hover:text-primary transition-colors">
                        {relatedPost.frontmatter.title}
                      </h3>
                      <p className="text-muted text-sm mb-4 line-clamp-3">
                        {relatedPost.frontmatter.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted">
                        <time dateTime={relatedPost.frontmatter.date}>
                          {formatDate(relatedPost.frontmatter.date)}
                        </time>
                        {relatedPost.readingTime && (
                          <span>{relatedPost.readingTime} min read</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="container-custom py-12 border-t border-border">
        <ScrollReveal>
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              View More Posts
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
