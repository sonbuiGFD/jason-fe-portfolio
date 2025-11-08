import Image from "next/image";
import { type ContentItem, type LabFrontmatter } from "@/lib/markdown";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date-formatter";

interface LabProjectCardProps {
  project: ContentItem<LabFrontmatter>;
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
    slug,
    frontmatter: {
      title,
      summary,
      techStack,
      thumbnail,
      demoUrl,
      repoUrl,
      date,
    },
  } = project;

  const hasLinks = demoUrl || repoUrl;

  return (
    <Card href={`/labs/${slug}`} as="article" className="lab-project-card">
      {/* Thumbnail Image */}
      {thumbnail && (
        <div className="lab-project-card__image">
          <Image
            src={thumbnail}
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
            {repoUrl && (
              <span className="lab-project-card__badges__badge lab-project-card__badges__badge__repo">
                Repository
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="lab-project-card__title">{title}</h3>

        {/* Description */}
        <p className="lab-project-card__description">{summary}</p>

        {/* Tech Stack Tags */}
        {techStack && techStack.length > 0 && (
          <div className="lab-project-card__tags">
            {techStack.map((tech) => (
              <span key={tech} className="lab-project-card__tags__tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Published Date */}
        <time
          className="lab-project-card__date"
          dateTime={date}
          aria-label={`Published ${formatDate(date)}`}
        >
          {formatDate(date)}
        </time>
      </div>
    </Card>
  );
}
