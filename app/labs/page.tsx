import { type Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Pagination from "@/components/ui/Pagination";
import {
  getPaginatedContent,
  CONTENT_TYPES,
  type LabFrontmatter,
} from "@/lib/markdown";
import { formatDate } from "@/lib/utils/date-formatter";

export const metadata: Metadata = {
  title: "Side-Project Labs | Jason Bui - Frontend Engineer Portfolio",
  description:
    "Explore my experimental side projects and technical explorations. See what I've learned through hands-on experimentation with new technologies and approaches.",
  openGraph: {
    title: "Side-Project Labs | Jason Bui",
    description:
      "Experimental side projects and technical explorations showcasing continuous learning and innovation.",
    type: "website",
    url: "/labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Side-Project Labs | Jason Bui",
    description:
      "Experimental side projects and technical explorations showcasing continuous learning and innovation.",
  },
};

/**
 * Labs Index Page
 *
 * Displays all published lab projects with static generation and pagination.
 * No filtering functionality - replaced with pagination for better performance.
 */
export default async function LabsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams;

  // Parse page from URL params (default to 1)
  const currentPage = parseInt(params.page || "1", 10);
  const itemsPerPage = 12; // Labs: 12 items per page

  // Fetch paginated lab projects
  const { items: labProjects, pagination } =
    await getPaginatedContent<LabFrontmatter>(
      CONTENT_TYPES.LABS,
      currentPage,
      itemsPerPage
    );

  return (
    <main role="main">
      {/* Hero Section */}
      <section className="container-custom py-20">
        <ScrollReveal>
          <h1 className="heading-1 mb-6">Side-Project Labs</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="body-large text-muted max-w-3xl mb-12">
            My experimental playground for exploring new technologies,
            techniques, and ideas. Each project represents a learning journey
            with documented goals and key insights. Browse through my technical
            explorations and experiments.
          </p>
        </ScrollReveal>

        {/* Results Summary */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted">
              Showing {labProjects.length} of {pagination.totalItems} lab
              projects
            </p>
          </div>
        </ScrollReveal>

        {/* Lab Projects Grid */}
        {labProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {labProjects.map((project, index) => {
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
                  <ScrollReveal key={project.slug} delay={0.1 * (index % 3)}>
                    <article className="card__container h-full">
                      <Link
                        href={`/labs/${slug}`}
                        className="block h-full hover:opacity-80 transition-opacity"
                      >
                        {/* Thumbnail Image */}
                        {thumbnail && (
                          <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={thumbnail}
                              alt={`${title} - Project Thumbnail`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="space-y-3">
                          {/* Links Badge (if available) */}
                          {hasLinks && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {demoUrl && (
                                <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 rounded">
                                  Live Demo
                                </span>
                              )}
                              {repoUrl && (
                                <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 rounded">
                                  Repository
                                </span>
                              )}
                            </div>
                          )}

                          {/* Title */}
                          <h2 className="heading-3">{title}</h2>

                          {/* Description */}
                          <p className="body-small text-muted line-clamp-3">
                            {summary}
                          </p>

                          {/* Tech Stack Tags */}
                          {techStack && techStack.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {techStack.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-1 rounded-full bg-muted text-foreground"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Published Date */}
                          <div className="text-sm text-muted">
                            <time dateTime={date}>{formatDate(date)}</time>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <ScrollReveal delay={0.2}>
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  basePath="/labs"
                />
              </ScrollReveal>
            )}
          </>
        ) : (
          <ScrollReveal delay={0.3}>
            <div className="text-center py-20">
              <p className="body-large text-muted">
                No lab projects found. Check back later for new experimental
                projects and technical explorations.
              </p>
            </div>
          </ScrollReveal>
        )}
      </section>
    </main>
  );
}
