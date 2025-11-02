import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image-builder";
import {
  getBlogPostBySlugQuery,
  getAllBlogPostSlugsQuery,
  getRelatedBlogPostsQuery,
} from "@/lib/sanity/queries";
import type { BlogPostDetail, BlogPostCard } from "@/lib/sanity/types";
import { RichText } from "@/components/content/RichText";
import { RelatedPosts } from "@/components/content/RelatedPosts";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { formatDate } from "@/lib/utils/date-formatter";
import { calculateReadingTime } from "@/lib/utils/reading-time";

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

/**
 * Generate static paths for all published blog posts
 * Pre-renders blog post detail pages at build time
 */
export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(getAllBlogPostSlugsQuery);

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

  const blogPost = await sanityClient.fetch<BlogPostDetail>(
    getBlogPostBySlugQuery,
    { slug }
  );

  if (!blogPost) {
    return {
      title: "Blog Post Not Found",
    };
  }

  // Generate OG image URL if hero image exists
  const ogImage = blogPost.heroImage?.asset
    ? urlForImage(blogPost.heroImage.asset).width(1200).height(630).url()
    : undefined;

  return {
    title: `${blogPost.title} | Jason Bui`,
    description: blogPost.summary,
    openGraph: {
      title: blogPost.title,
      description: blogPost.summary,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: blogPost.publishedAt,
      modifiedTime: blogPost.updatedAt || blogPost.publishedAt,
      authors: [blogPost.author.name],
      tags: blogPost.tags.map((tag) => tag.name),
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.title,
      description: blogPost.summary,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/**
 * Blog Post Detail Page
 *
 * Displays full blog post content with metadata, author info, and related posts.
 * Uses SSG with ISR for optimal performance.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch blog post data
  const blogPost = await sanityClient.fetch<BlogPostDetail>(
    getBlogPostBySlugQuery,
    { slug }
  );

  // Return 404 if blog post not found
  if (!blogPost) {
    notFound();
  }

  // Calculate reading time
  const readingTime = calculateReadingTime(blogPost.content);

  // Fetch related posts based on shared tags
  const currentPostTags = blogPost.tags.map((tag) => tag.slug.current);
  const relatedPosts = await sanityClient.fetch<BlogPostCard[]>(
    getRelatedBlogPostsQuery,
    {
      currentPostId: blogPost._id,
      currentPostTags,
    }
  );

  return (
    <main role="main">
      <article className="container-custom py-20">
        {/* Header Section */}
        <ScrollReveal>
          <header className="max-w-4xl mx-auto mb-12">
            {/* Tags */}
            {blogPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blogPost.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="text-sm px-3 py-1 rounded-full bg-muted text-foreground"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="heading-1 mb-6">{blogPost.title}</h1>

            {/* Summary */}
            <p className="body-large text-muted mb-8">{blogPost.summary}</p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-muted text-sm">
              {/* Author */}
              <div className="flex items-center gap-2">
                <span>By {blogPost.author.name}</span>
              </div>

              <span>•</span>

              {/* Publish Date */}
              {blogPost.publishedAt && (
                <time dateTime={blogPost.publishedAt}>
                  {formatDate(blogPost.publishedAt)}
                </time>
              )}

              {/* Updated Date */}
              {blogPost.updatedAt &&
                blogPost.updatedAt !== blogPost.publishedAt && (
                  <>
                    <span>•</span>
                    <span>Updated {formatDate(blogPost.updatedAt)}</span>
                  </>
                )}

              <span>•</span>

              {/* Reading Time */}
              <span>{readingTime} min read</span>
            </div>
          </header>
        </ScrollReveal>

        {/* Hero Image */}
        {blogPost.heroImage?.asset && (
          <ScrollReveal delay={0.2}>
            <div className="relative w-full aspect-video max-w-5xl mx-auto mb-16 rounded-lg overflow-hidden">
              <Image
                src={urlForImage(blogPost.heroImage.asset!)
                  .width(1200)
                  .height(675)
                  .url()}
                alt={blogPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>
        )}

        {/* Content */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-3xl mx-auto prose prose-lg">
            <RichText content={blogPost.content} />
          </div>
        </ScrollReveal>

        {/* Tags Section */}
        {blogPost.tags.length > 0 && (
          <ScrollReveal delay={0.4}>
            <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-border">
              <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-4">
                Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag) => (
                  <a
                    key={tag._id}
                    href={`/blog?tag=${tag.slug.current}`}
                    className="text-sm px-3 py-1 rounded-full bg-muted text-foreground hover:bg-muted-foreground/10 transition-colors"
                  >
                    {tag.name}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <ScrollReveal delay={0.5}>
            <div className="max-w-6xl mx-auto mt-20 pt-12 border-t border-border">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </ScrollReveal>
        )}
      </article>
    </main>
  );
}
