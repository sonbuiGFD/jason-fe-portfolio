import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Pagination from "@/components/ui/Pagination";
import {
  getPaginatedContent,
  CONTENT_TYPES,
  type WorkFrontmatter,
} from "@/lib/markdown";
import { formatDate } from "@/lib/utils/date-formatter";

export const metadata: Metadata = {
  title: "Work Experience | Jason Bui - Frontend Engineer Portfolio",
  description:
    "Explore detailed case studies of my professional work, showcasing problem-solving approaches, technical implementations, and measurable impact across various projects.",
  openGraph: {
    title: "Work Experience | Jason Bui",
    description:
      "Detailed case studies of professional work showcasing problem-solving and technical implementation.",
    type: "website",
    url: "/work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work Experience | Jason Bui",
    description:
      "Detailed case studies of professional work showcasing problem-solving and technical implementation.",
  },
};

const ITEMS_PER_PAGE = 10;

/**
 * Work Index Page
 *
 * Displays all published work case studies with pagination.
 * Fully static generation with no revalidation.
 */
export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);

  // Fetch paginated case studies from markdown
  const { items: caseStudies, pagination } =
    await getPaginatedContent<WorkFrontmatter>(
      CONTENT_TYPES.WORK,
      currentPage,
      ITEMS_PER_PAGE
    );

  return (
    <main role="main">
      {/* Hero Section */}
      <section className="container-custom py-20">
        <ScrollReveal>
          <h1 className="heading-1 mb-6">Work Experience</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="body-large text-muted max-w-3xl mb-12">
            Detailed case studies of my professional work, showcasing
            problem-solving approaches, technical implementations, and
            measurable impact across various projects.
          </p>
        </ScrollReveal>

        {/* Case Studies Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {caseStudies.map((caseStudy, index) => (
            <ScrollReveal key={caseStudy.slug} delay={0.1 * (index % 4)}>
              <article className="card__container h-full">
                <Link
                  href={`/work/${caseStudy.slug}`}
                  className="block h-full hover:opacity-80 transition-opacity"
                >
                  {/* Hero Image */}
                  {caseStudy.frontmatter.heroImage && (
                    <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={caseStudy.frontmatter.heroImage}
                        alt={caseStudy.frontmatter.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="space-y-3">
                    {/* Role Badge */}
                    {caseStudy.frontmatter.role && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 rounded">
                        {caseStudy.frontmatter.role}
                      </span>
                    )}

                    {/* Title */}
                    <h2 className="heading-3">{caseStudy.frontmatter.title}</h2>

                    {/* Summary */}
                    <p className="body-small text-muted line-clamp-3">
                      {caseStudy.frontmatter.summary}
                    </p>

                    {/* Tech Stack */}
                    {caseStudy.frontmatter.techStack &&
                      caseStudy.frontmatter.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.frontmatter.techStack
                            .slice(0, 4)
                            .map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-2 py-1 rounded-full bg-muted text-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                        </div>
                      )}

                    {/* Impact Metrics */}
                    {caseStudy.frontmatter.impact &&
                      caseStudy.frontmatter.impact.length > 0 && (
                        <div className="space-y-1">
                          {caseStudy.frontmatter.impact
                            .slice(0, 2)
                            .map((impact, idx) => (
                              <p
                                key={idx}
                                className="text-sm font-medium text-primary"
                              >
                                {impact.metric}
                              </p>
                            ))}
                        </div>
                      )}

                    {/* Metadata */}
                    <div className="text-sm text-muted">
                      <time dateTime={caseStudy.frontmatter.date}>
                        {formatDate(caseStudy.frontmatter.date)}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty State */}
        {caseStudies.length === 0 && (
          <ScrollReveal delay={0.3}>
            <div className="text-center py-20">
              <p className="body-large text-muted">
                No case studies found. Check back soon for new work!
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <ScrollReveal delay={0.4}>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              basePath="/work"
            />
          </ScrollReveal>
        )}
      </section>
    </main>
  );
}
