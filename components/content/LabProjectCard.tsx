import Image from "next/image";
import { type LabProjectCard as LabProjectCardType } from "@/lib/sanity/types";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date-formatter";

interface LabProjectCardProps {
  project: LabProjectCardType;
}

/**
 * LabProjectCard Component
 *
 * Displays a lab project card with thumbnail, title, description,
 * and tech stack tags for index pages.
 *
 * @example
 * ```tsx
 * <LabProjectCard project={labProject} />
 * ```
 */
export function LabProjectCard({ project }: LabProjectCardProps) {
  const {
    title,
    slug,
    description,
    thumbnailUrl,
    techStack,
    demoUrl,
    repositoryUrl,
    publishedAt,
  } = project;

  const hasLinks = demoUrl || repositoryUrl;

  return (
    <Card
      href={`/labs/${slug.current}`}
      as="article"
      className="lab-project-card"
    >
      {/* Thumbnail Image */}
      {thumbnailUrl && (
        <div className="lab-project-card__image">
          <Image
            src={thumbnailUrl}
            alt={`${title} - Project Thumbnail`}
            width={800}
            height={600}
            className="lab-project-card__image__img"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="lab-project-card__content">
        {/* Links Badge (if available) */}
        {hasLinks && (
          <div className="lab-project-card__badges">
            {demoUrl && (
              <span className="lab-project-card__badges__badge lab-project-card__badges__badge__demo">
                Live Demo
              </span>
            )}
            {repositoryUrl && (
              <span className="lab-project-card__badges__badge lab-project-card__badges__badge__repo">
                Repository
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="lab-project-card__title">{title}</h3>

        {/* Description */}
        <p className="lab-project-card__description">{description}</p>

        {/* Tech Stack Tags */}
        {techStack && techStack.length > 0 && (
          <div className="lab-project-card__tags">
            {techStack.map((tech) => (
              <span
                key={tech._id}
                className="lab-project-card__tags__tag"
                data-category={tech.category}
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}

        {/* Published Date */}
        <time
          className="lab-project-card__date"
          dateTime={publishedAt}
          aria-label={`Published ${formatDate(publishedAt)}`}
        >
          {formatDate(publishedAt)}
        </time>
      </div>
    </Card>
  );
}
