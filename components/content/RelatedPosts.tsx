"use client";

import Link from "next/link";
import Image from "next/image";
import type { BlogPostCard } from "@/lib/sanity/types";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { formatDate } from "@/lib/utils/date-formatter";

interface RelatedPostsProps {
  posts: BlogPostCard[];
  className?: string;
}

/**
 * RelatedPosts Component
 *
 * Displays a list of related blog posts based on shared tags.
 * Shows up to 3 related posts with title, summary, and hero image.
 *
 * @example
 * ```tsx
 * <RelatedPosts posts={relatedPosts} />
 * ```
 */
export function RelatedPosts({ posts, className = "" }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className={`related-posts ${className}`}>
      <ScrollReveal>
        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <ScrollReveal key={post._id} delay={0.1 * index}>
            <Card className="related-posts__card h-full">
              <Link
                href={`/blog/${post.slug.current}`}
                className="block group h-full"
              >
                {/* Hero Image */}
                {post.heroImageUrl && (
                  <div className="related-posts__image-container relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={post.heroImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="related-posts__content">
                  {/* Title */}
                  <h3 className="related-posts__title font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="related-posts__summary text-muted text-sm mb-3 line-clamp-2">
                    {post.summary}
                  </p>

                  {/* Metadata */}
                  <div className="related-posts__metadata flex items-center gap-2 text-xs text-muted">
                    {/* Publish Date */}
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>

                    <span>•</span>

                    {/* Reading Time */}
                    <span>{post.readingTime} min read</span>

                    {/* Author */}
                    {post.author && (
                      <>
                        <span>•</span>
                        <span>By {post.author.name}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
