import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Pagination from "@/components/ui/Pagination";
import {
  getPaginatedContent,
  CONTENT_TYPES,
  type BlogFrontmatter,
} from "@/lib/markdown";
import { formatDate } from "@/lib/utils/date-formatter";

export const metadata: Metadata = {
  title: "Blog | Jason Bui - Frontend Engineer Portfolio",
  description:
    "Explore articles and tutorials on frontend development, performance optimization, accessibility, and modern web technologies. Learn from practical insights and real-world examples.",
  openGraph: {
    title: "Blog | Jason Bui",
    description:
      "Articles and tutorials on frontend development, performance, accessibility, and modern web technologies.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Jason Bui",
    description:
      "Articles and tutorials on frontend development, performance, accessibility, and modern web technologies.",
  },
};

const ITEMS_PER_PAGE = 15;

/**
 * Blog Index Page
 *
 * Displays all published blog posts with pagination.
 * Fully static generation with no revalidation.
 */
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);

  // Fetch paginated blog posts from markdown
  const { items: blogPosts, pagination } =
    await getPaginatedContent<BlogFrontmatter>(
      CONTENT_TYPES.BLOG,
      currentPage,
      ITEMS_PER_PAGE
    );

  return (
    <main role="main">
      {/* Hero Section */}
      <section className="container-custom py-20">
        <ScrollReveal>
          <h1 className="heading-1 mb-6">Blog</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="body-large text-muted max-w-3xl mb-12">
            Sharing insights, tutorials, and lessons learned from building
            modern web applications. Topics include frontend development,
            performance optimization, accessibility, and emerging technologies.
          </p>
        </ScrollReveal>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={0.1 * (index % 3)}>
              <article className="card__container h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full hover:opacity-80 transition-opacity"
                >
                  {/* Hero Image */}
                  {post.frontmatter.heroImage && (
                    <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={post.frontmatter.heroImage}
                        alt={post.frontmatter.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="space-y-3">
                    {/* Tags */}
                    {post.frontmatter.tags &&
                      post.frontmatter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.frontmatter.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-muted text-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Title */}
                    <h2 className="heading-3">{post.frontmatter.title}</h2>

                    {/* Summary */}
                    <p className="body-small text-muted line-clamp-3">
                      {post.frontmatter.summary}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <time dateTime={post.frontmatter.date}>
                        {formatDate(post.frontmatter.date)}
                      </time>
                      {post.readingTime && (
                        <>
                          <span>•</span>
                          <span>{post.readingTime} min read</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <ScrollReveal delay={0.3}>
            <div className="text-center py-20">
              <p className="body-large text-muted">
                No blog posts found. Check back soon for new content!
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <ScrollReveal delay={0.4}>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              basePath="/blog"
            />
          </ScrollReveal>
        )}
      </section>
    </main>
  );
}
