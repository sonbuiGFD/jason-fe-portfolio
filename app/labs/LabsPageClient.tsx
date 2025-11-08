"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type LabProjectCard as LabProjectCardType,
  type TechStackPreview,
} from "@/lib/sanity/types";
import { LabProjectCard } from "@/components/content/LabProjectCard";
import { FilterBar, type FilterBarState } from "@/components/content/FilterBar";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface LabsPageClientProps {
  initialLabProjects: LabProjectCardType[];
  techStacks: TechStackPreview[];
  initialFilter: string | null;
}

/**
 * LabsPageClient Component
 *
 * Client-side component for Labs index page with filtering.
 * Handles URL params and client-side filtering logic.
 */
export function LabsPageClient({
  initialLabProjects,
  techStacks,
  initialFilter,
}: LabsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [labProjects, setLabProjects] =
    useState<LabProjectCardType[]>(initialLabProjects);
  const [isFiltering, setIsFiltering] = useState(false);

  // Filter lab projects based on current tech stack filter
  const filterLabProjects = (filters: FilterBarState) => {
    setIsFiltering(true);

    let filtered = initialLabProjects;

    // Filter by tech stack
    if (filters.techStack) {
      filtered = filtered.filter((project) =>
        project.techStack.some(
          (tech) => tech.slug.current === filters.techStack
        )
      );
    }

    setLabProjects(filtered);
    setIsFiltering(false);
  };

  // Update URL params when filters change
  const handleFilterChange = (filters: FilterBarState) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update tech stack param
    if (filters.techStack) {
      params.set("tech", filters.techStack);
    } else {
      params.delete("tech");
    }

    // Update URL without page reload
    const queryString = params.toString();
    const url = queryString ? `/labs?${queryString}` : "/labs";
    router.push(url, { scroll: false });

    // Apply filters
    filterLabProjects(filters);
  };

  // Apply initial filter on mount (only once)
  useEffect(() => {
    if (initialFilter) {
      filterLabProjects({
        techStack: initialFilter,
        roleType: null,
        tag: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run once on mount

  return (
    <>
      {/* Filter Bar */}
      <ScrollReveal delay={0.1}>
        <FilterBar
          techStacks={techStacks}
          onFilterChange={handleFilterChange}
          initialFilters={{
            techStack: initialFilter,
            roleType: null,
            tag: null,
          }}
          showRoleTypes={false}
          showTechStacks={true}
          showTags={false}
        />
      </ScrollReveal>

      {/* Lab Projects Grid */}
      {isFiltering ? (
        <LoadingState />
      ) : labProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labProjects.map((project, index) => (
            <ScrollReveal key={project._id} delay={0.1 * (index % 3)}>
              <LabProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No lab projects found"
          message="Try adjusting your filters to see more results."
        />
      )}
    </>
  );
}
