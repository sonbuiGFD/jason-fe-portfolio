"use client";

import { type ContentItem, type LabFrontmatter } from "@/lib/markdown";
import { LabProjectCard } from "@/components/content/LabProjectCard";
import Pagination from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface LabsPageClientProps {
  initialLabProjects: ContentItem<LabFrontmatter>[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

/**
 * LabsPageClient Component
 *
 * Client-side component for Labs index page with pagination.
 * Displays lab projects and handles pagination navigation.
 */
export function LabsPageClient({
  initialLabProjects,
  currentPage,
  totalPages,
  totalItems,
}: LabsPageClientProps) {
  return (
    <>
      {/* Results Summary */}
      <ScrollReveal delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted">
            Showing {initialLabProjects.length} of {totalItems} lab projects
          </p>
        </div>
      </ScrollReveal>

      {/* Lab Projects Grid */}
      {initialLabProjects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {initialLabProjects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={0.1 * (index % 3)}>
                <LabProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <ScrollReveal delay={0.2}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/labs"
              />
            </ScrollReveal>
          )}
        </>
      ) : (
        <EmptyState
          title="No lab projects found"
          message="Check back later for new experimental projects and technical explorations."
        />
      )}
    </>
  );
}
