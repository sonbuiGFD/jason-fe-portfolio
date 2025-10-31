"use client";

import { useState } from "react";
import { type TechStackPreview, type RoleType } from "@/lib/sanity/types";
import { Button } from "@/components/ui/Button";

interface FilterBarProps {
  /**
   * Available tech stacks to filter by
   */
  techStacks: TechStackPreview[];

  /**
   * Available role types to filter by
   */
  roleTypes?: RoleType[];

  /**
   * Callback when filters change
   */
  onFilterChange: (filters: FilterBarState) => void;

  /**
   * Initial filter state from URL params
   */
  initialFilters?: FilterBarState;

  /**
   * Show role type filters (for Work page only)
   */
  showRoleTypes?: boolean;
}

export interface FilterBarState {
  techStack: string | null; // slug of selected tech stack
  roleType: RoleType | null;
}

/**
 * FilterBar Component
 *
 * Provides filtering controls for tech stack and role type.
 * Used on Work, Labs, and Blog index pages.
 *
 * @example
 * ```tsx
 * <FilterBar
 *   techStacks={techStacks}
 *   roleTypes={["Lead Engineer", "Senior Engineer", "Engineer"]}
 *   onFilterChange={handleFilterChange}
 *   showRoleTypes={true}
 * />
 * ```
 */
export function FilterBar({
  techStacks,
  roleTypes = [],
  onFilterChange,
  initialFilters,
  showRoleTypes = false,
}: FilterBarProps) {
  const [filters, setFilters] = useState<FilterBarState>(
    initialFilters || { techStack: null, roleType: null }
  );

  const handleTechStackChange = (techStackSlug: string | null) => {
    const newFilters = { ...filters, techStack: techStackSlug };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRoleTypeChange = (roleType: RoleType | null) => {
    const newFilters = { ...filters, roleType };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const newFilters = { techStack: null, roleType: null };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const hasActiveFilters = filters.techStack || filters.roleType;

  return (
    <div className="filter-bar" role="search" aria-label="Filter content">
      {/* Tech Stack Filter */}
      <div className="filter-bar__group">
        <label htmlFor="tech-stack-filter" className="filter-bar__label">
          Tech Stack
        </label>
        <select
          id="tech-stack-filter"
          value={filters.techStack || ""}
          onChange={(e) => handleTechStackChange(e.target.value || null)}
          className="filter-bar__select"
          aria-label="Filter by tech stack"
        >
          <option value="">All Technologies</option>
          {techStacks.map((tech) => (
            <option key={tech._id} value={tech.slug.current}>
              {tech.name}
            </option>
          ))}
        </select>
      </div>

      {/* Role Type Filter (Work page only) */}
      {showRoleTypes && roleTypes.length > 0 && (
        <div className="filter-bar__group">
          <label htmlFor="role-type-filter" className="filter-bar__label">
            Role Type
          </label>
          <select
            id="role-type-filter"
            value={filters.roleType || ""}
            onChange={(e) =>
              handleRoleTypeChange((e.target.value as RoleType) || null)
            }
            className="filter-bar__select"
            aria-label="Filter by role type"
          >
            <option value="">All Roles</option>
            {roleTypes.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="secondary"
          size="sm"
          onClick={handleClearFilters}
          className="filter-bar__clear"
          aria-label="Clear all filters"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
