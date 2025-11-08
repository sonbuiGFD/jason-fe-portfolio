import type { Metadata } from "next";
import { sanityClient } from "@/lib/sanity/client";
import { getAllBlogPostsQuery, getAllTagsQuery } from "@/lib/sanity/queries";
import type { BlogPostCard, TagPreview } from "@/lib/sanity/types";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { BlogPageClient } from "./BlogPageClient";

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

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

/**
 * Blog Index Page
 *
 * Displays all published blog posts with SSG/ISR.
 * Includes filtering by tags and search functionality.
 */
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams;

  // Fetch blog posts (first 20 items - pagination will be added in Phase 10)
  const blogPosts = await sanityClient.fetch<BlogPostCard[]>(
    getAllBlogPostsQuery,
    { offset: 0, limit: 20 }
  );

  // Fetch all tags for filter options
  const tags = await sanityClient.fetch<TagPreview[]>(getAllTagsQuery);

  // Parse filter from URL params
  const initialFilter = params.tag || null;

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

        {/* Client Component for Filtering and Display */}
        <BlogPageClient
          initialBlogPosts={blogPosts}
          tags={tags}
          initialFilter={initialFilter}
        />
      </section>
    </main>
  );
}
