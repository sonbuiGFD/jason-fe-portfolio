import { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

/**
 * EmptyState Component
 *
 * Displays contextual messaging when no content is available.
 * Supports custom actions (e.g., "Clear filters" button).
 *
 * @example
 * ```tsx
 * <EmptyState
 *   title="No results found"
 *   message="Try adjusting your filters or search query."
 *   action={<Button onClick={clearFilters}>Clear filters</Button>}
 * />
 * ```
 */
export function EmptyState({
  title = "No content found",
  message = "There are no items to display at this time.",
  action,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`empty-state ${className}`.trim()} role="status">
      {icon && <div className="empty-state__icon">{icon}</div>}
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__message">{message}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
