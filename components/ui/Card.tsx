import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  href?: string;
}

/**
 * Card Component
 *
 * Reusable card container with consistent styling.
 * Can render as a link if href is provided.
 *
 * @example
 * ```tsx
 * <Card href="/work/case-study">
 *   <h3>Case Study Title</h3>
 *   <p>Summary text...</p>
 * </Card>
 * ```
 */
export function Card({
  children,
  className = "",
  as: Component = "div",
  href,
}: CardProps) {
  const baseClasses = "card";
  const interactiveClasses = href ? "card__interactive" : "";
  const combinedClasses =
    `${baseClasses} ${interactiveClasses} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        <Component className="card__content">{children}</Component>
      </Link>
    );
  }

  return <Component className={combinedClasses}>{children}</Component>;
}
