/**
 * LoadingState Component
 *
 * Skeleton loader with animations for content loading states.
 * Provides accessible loading indication for screen readers.
 *
 * @example
 * ```tsx
 * {isLoading ? (
 *   <LoadingState count={3} type="card" />
 * ) : (
 *   <ContentList items={items} />
 * )}
 * ```
 */

interface LoadingStateProps {
  count?: number;
  type?: "text" | "card" | "image";
  className?: string;
}

export function LoadingState({
  count = 1,
  type = "card",
  className = "",
}: LoadingStateProps) {
  const skeletonItems = Array.from({ length: count }, (_, i) => i);

  const renderSkeleton = () => {
    switch (type) {
      case "text":
        return (
          <div className="loading-state__text">
            <div className="loading-state__text__line loading-state__text__line__wide" />
            <div className="loading-state__text__line loading-state__text__line__medium" />
            <div className="loading-state__text__line loading-state__text__line__narrow" />
          </div>
        );
      case "image":
        return (
          <div className="loading-state__image">
            <div className="loading-state__image__placeholder" />
          </div>
        );
      case "card":
      default:
        return (
          <div className="loading-state__card">
            <div className="loading-state__card__image" />
            <div className="loading-state__card__content">
              <div className="loading-state__card__title" />
              <div className="loading-state__card__text" />
              <div className="loading-state__card__text" />
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`loading-state ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading content...</span>
      {skeletonItems.map((i) => (
        <div key={i} className="loading-state__item">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}
