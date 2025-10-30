import Image from "next/image";
import { WorkCaseStudyCard } from "@/lib/sanity/types";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date-formatter";

interface CaseStudyCardProps {
  caseStudy: WorkCaseStudyCard;
}

/**
 * CaseStudyCard Component
 *
 * Displays a work case study card with title, summary, tech stack tags,
 * hero image, and role type for index pages.
 *
 * @example
 * ```tsx
 * <CaseStudyCard caseStudy={caseStudy} />
 * ```
 */
export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const {
    title,
    slug,
    summary,
    heroImageUrl,
    techStack,
    roleType,
    publishedAt,
  } = caseStudy;

  return (
    <Card
      href={`/work/${slug.current}`}
      as="article"
      className="case-study-card"
    >
      {/* Hero Image */}
      {heroImageUrl && (
        <div className="case-study-card__image">
          <Image
            src={heroImageUrl}
            alt={`${title} - Hero Image`}
            width={800}
            height={450}
            className="case-study-card__image__img"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="case-study-card__content">
        {/* Role Type Badge */}
        <div className="case-study-card__badge">
          <span className="case-study-card__badge__text">{roleType}</span>
        </div>

        {/* Title */}
        <h3 className="case-study-card__title">{title}</h3>

        {/* Summary */}
        <p className="case-study-card__summary">{summary}</p>

        {/* Tech Stack Tags */}
        {techStack && techStack.length > 0 && (
          <div className="case-study-card__tags">
            {techStack.map((tech) => (
              <span
                key={tech._id}
                className="case-study-card__tags__tag"
                data-category={tech.category}
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}

        {/* Published Date */}
        <time
          className="case-study-card__date"
          dateTime={publishedAt}
          aria-label={`Published ${formatDate(publishedAt)}`}
        >
          {formatDate(publishedAt)}
        </time>
      </div>
    </Card>
  );
}
