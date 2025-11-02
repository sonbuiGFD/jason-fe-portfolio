"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  BlogPostCard as BlogPostCardType,
  TagPreview,
} from "@/lib/sanity/types";
import { BlogPostCard } from "@/components/content/BlogPostCard";
import { FilterBar, type FilterBarState } from "@/components/content/FilterBar";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface BlogPageClientProps {
  initialBlogPosts: BlogPostCardType[];
  tags: TagPreview[];
  initialFilter: string | null;
}

/**
 * BlogPageClient Component
 *
 * Client-side component for Blog index page with filtering.
 * Handles URL params and client-side filtering logic.
 */
export function BlogPageClient({
  initialBlogPosts,
  tags,
  initialFilter,
}: BlogPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [blogPosts, setBlogPosts] =
    useState<BlogPostCardType[]>(initialBlogPosts);
  const [isFiltering, setIsFiltering] = useState(false);

  // Filter blog posts based on current tag filter
  const filterBlogPosts = (filters: FilterBarState) => {
    setIsFiltering(true);

    let filtered = initialBlogPosts;

    // Filter by tag
    if (filters.tag) {
      filtered = filtered.filter((post) =>
        post.tags.some((tag) => tag.slug.current === filters.tag)
      );
    }

    setBlogPosts(filtered);
    setIsFiltering(false);
  };

  // Update URL params when filters change
  const handleFilterChange = (filters: FilterBarState) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update tag param
    if (filters.tag) {
      params.set("tag", filters.tag);
    } else {
      params.delete("tag");
    }

    // Update URL without page reload
    const queryString = params.toString();
    const url = queryString ? `/blog?${queryString}` : "/blog";
    router.push(url, { scroll: false });

    // Apply filters
    filterBlogPosts(filters);
  };

  // Apply initial filter on mount (only once)
  useEffect(() => {
    if (initialFilter) {
      filterBlogPosts({ tag: initialFilter, techStack: null, roleType: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run once on mount

  return (
    <>
      {/* Filter Bar */}
      <ScrollReveal delay={0.1}>
        <FilterBar
          tags={tags}
          onFilterChange={handleFilterChange}
          initialFilters={{
            tag: initialFilter,
            techStack: null,
            roleType: null,
          }}
          showTags={true}
          showTechStacks={false}
          showRoleTypes={false}
        />
      </ScrollReveal>

      {/* Blog Posts Grid */}
      {isFiltering ? (
        <LoadingState />
      ) : blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post._id} delay={0.1 * (index % 3)}>
              <BlogPostCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No blog posts found"
          message="Try adjusting your filters to see more results."
        />
      )}
    </>
  );
}
