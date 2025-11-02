"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type WorkCaseStudyCard,
  type TechStackPreview,
  type RoleType,
} from "@/lib/sanity/types";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { FilterBar, type FilterBarState } from "@/components/content/FilterBar";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface WorkPageClientProps {
  initialCaseStudies: WorkCaseStudyCard[];
  techStacks: TechStackPreview[];
  roleTypes: RoleType[];
  initialFilters: FilterBarState;
}

/**
 * WorkPageClient Component
 *
 * Client-side component for Work index page with filtering.
 * Handles URL params and client-side filtering logic.
 */
export function WorkPageClient({
  initialCaseStudies,
  techStacks,
  roleTypes,
  initialFilters,
}: WorkPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [caseStudies, setCaseStudies] =
    useState<WorkCaseStudyCard[]>(initialCaseStudies);
  const [isFiltering, setIsFiltering] = useState(false);

  // Filter case studies based on current filters
  const filterCaseStudies = (filters: FilterBarState) => {
    setIsFiltering(true);

    let filtered = initialCaseStudies;

    // Filter by tech stack
    if (filters.techStack) {
      filtered = filtered.filter((caseStudy) =>
        caseStudy.techStack.some(
          (tech) => tech.slug.current === filters.techStack
        )
      );
    }

    // Filter by role type
    if (filters.roleType) {
      filtered = filtered.filter(
        (caseStudy) => caseStudy.roleType === filters.roleType
      );
    }

    setCaseStudies(filtered);
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

    // Update role type param
    if (filters.roleType) {
      params.set("role", filters.roleType);
    } else {
      params.delete("role");
    }

    // Update URL without page reload
    const queryString = params.toString();
    const url = queryString ? `/work?${queryString}` : "/work";
    router.push(url, { scroll: false });

    // Apply filters
    filterCaseStudies(filters);
  };

  // Apply initial filters on mount (only once)
  useEffect(() => {
    if (initialFilters.techStack || initialFilters.roleType) {
      filterCaseStudies(initialFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run once on mount

  return (
    <>
      {/* Filter Bar */}
      <ScrollReveal delay={0.1}>
        <FilterBar
          techStacks={techStacks}
          roleTypes={roleTypes}
          onFilterChange={handleFilterChange}
          initialFilters={{ ...initialFilters, tag: null }}
          showRoleTypes={true}
          showTechStacks={true}
          showTags={false}
        />
      </ScrollReveal>

      {/* Case Studies Grid */}
      {isFiltering ? (
        <LoadingState />
      ) : caseStudies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <ScrollReveal key={caseStudy._id} delay={0.1 * (index % 3)}>
              <CaseStudyCard caseStudy={caseStudy} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No case studies found"
          message="Try adjusting your filters to see more results."
        />
      )}
    </>
  );
}
