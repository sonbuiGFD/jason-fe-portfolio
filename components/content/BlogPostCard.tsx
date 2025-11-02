import Image from "next/image";
import type { BlogPostCard as BlogPostCardType } from "@/lib/sanity/types";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date-formatter";

interface BlogPostCardProps {
  post: BlogPostCardType;
}

/**
 * BlogPostCard Component
 *
 * Displays a blog post card with title, summary, tags, reading time,
 * publish date, and author info for index pages.
 *
 * @example
 * ```tsx
 * <BlogPostCard post={blogPost} />
 * ```
 */
export function BlogPostCard({ post }: BlogPostCardProps) {
  const {
    title,
    slug,
    summary,
    heroImageUrl,
    tags,
    readingTime,
    publishedAt,
    author,
  } = post;

  return (
    <Card
      href={`/blog/${slug.current}`}
      as="article"
      className="blog-post-card"
    >
      {/* Hero Image */}
      {heroImageUrl && (
        <div className="blog-post-card__image">
          <Image
            src={heroImageUrl}
            alt={`${title} - Hero Image`}
            width={800}
            height={450}
            className="blog-post-card__image__img"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="blog-post-card__content">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="blog-post-card__tags">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag._id} className="blog-post-card__tags__tag">
                {tag.name}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="blog-post-card__tags__tag blog-post-card__tags__tag__more">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="blog-post-card__title">{title}</h3>

        {/* Summary */}
        <p className="blog-post-card__summary">{summary}</p>

        {/* Meta Information */}
        <div className="blog-post-card__meta">
          {/* Author */}
          {author && (
            <div className="blog-post-card__meta__author">
              <span className="blog-post-card__meta__author__name">
                {author.name}
              </span>
            </div>
          )}

          {/* Reading Time & Date */}
          <div className="blog-post-card__meta__info">
            {readingTime && (
              <span className="blog-post-card__meta__info__reading-time">
                {readingTime} min read
              </span>
            )}
            <span aria-hidden="true">•</span>
            <time
              className="blog-post-card__meta__info__date"
              dateTime={publishedAt}
              aria-label={`Published ${formatDate(publishedAt)}`}
            >
              {formatDate(publishedAt)}
            </time>
          </div>
        </div>
      </div>
    </Card>
  );
}
