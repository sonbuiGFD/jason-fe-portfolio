import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity/client";
import {
  getLabProjectBySlugQuery,
  getAllLabProjectSlugsQuery,
} from "@/lib/sanity/queries";
import { type LabProjectDetail } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image-builder";
import { formatDate } from "@/lib/utils/date-formatter";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { RichText } from "@/components/content/RichText";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

interface LabDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static paths for all published lab projects
 */
export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(getAllLabProjectSlugsQuery);

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate metadata for lab project detail page
 */
export async function generateMetadata({
  params,
}: LabDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const labProject = await sanityClient.fetch<LabProjectDetail>(
    getLabProjectBySlugQuery,
    { slug }
  );

  if (!labProject) {
    return {
      title: "Lab Project Not Found",
    };
  }

  const thumbnailUrl = labProject.thumbnail
    ? urlForImage(labProject.thumbnail).width(1200).height(630).url()
    : undefined;

  return {
    title: `${labProject.title} | Labs | Jason Bui`,
    description: labProject.description,
    openGraph: {
      title: labProject.title,
      description: labProject.description,
      type: "article",
      publishedTime: labProject.publishedAt,
      authors: [labProject.author.name],
      images: thumbnailUrl
        ? [
            {
              url: thumbnailUrl,
              width: 1200,
              height: 630,
              alt: labProject.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: labProject.title,
      description: labProject.description,
      images: thumbnailUrl ? [thumbnailUrl] : [],
    },
  };
}

/**
 * Lab Project Detail Page
 *
 * Displays a single lab project with full details including experiment goal,
 * key learnings, tech stack, and links to demo/repository.
 */
export default async function LabDetailPage({ params }: LabDetailPageProps) {
  const { slug } = await params;

  const labProject = await sanityClient.fetch<LabProjectDetail>(
    getLabProjectBySlugQuery,
    { slug }
  );

  // Return 404 if lab project not found or not published
  if (!labProject) {
    notFound();
  }

  const thumbnailUrl = labProject.thumbnail
    ? urlForImage(labProject.thumbnail).width(1600).url()
    : null;

  return (
    <main role="main">
      {/* Hero Section */}
      <section className="container-custom py-12">
        <ScrollReveal>
          <Link
            href="/labs"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Labs</span>
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {labProject.demoUrl && (
              <a
                href={labProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 rounded hover:bg-primary/20 transition-colors"
              >
                <span>🚀</span>
                <span>Live Demo</span>
              </a>
            )}
            {labProject.repositoryUrl && (
              <a
                href={labProject.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground bg-muted rounded hover:bg-muted/80 transition-colors"
              >
                <span>📦</span>
                <span>Repository</span>
              </a>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h1 className="heading-1 mb-6">{labProject.title}</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="body-large text-muted max-w-3xl mb-8">
            {labProject.description}
          </p>
        </ScrollReveal>

        {/* Meta Information */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Author:</span>
              <span>
                {labProject.author.name}, {labProject.author.role}
              </span>
            </div>
            <span aria-hidden="true">•</span>
            {labProject.publishedAt && (
              <time dateTime={labProject.publishedAt}>
                {formatDate(labProject.publishedAt)}
              </time>
            )}
          </div>
        </ScrollReveal>

        {/* Tech Stack Tags */}
        {labProject.techStack && labProject.techStack.length > 0 && (
          <ScrollReveal delay={0.5}>
            <div className="flex flex-wrap gap-2 mb-12">
              {labProject.techStack.map((tech) => (
                <span
                  key={tech._id}
                  className="px-3 py-1 text-sm font-medium text-foreground bg-muted rounded border-l-2"
                  style={{
                    borderLeftColor:
                      tech.category === "language"
                        ? "#3b82f6"
                        : tech.category === "framework"
                          ? "#8b5cf6"
                          : tech.category === "tool"
                            ? "#10b981"
                            : "#f59e0b",
                  }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Thumbnail Image */}
        {thumbnailUrl && (
          <ScrollReveal delay={0.6}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-16">
              <Image
                src={thumbnailUrl}
                alt={`${labProject.title} - Project Thumbnail`}
                fill
                priority
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* Content Sections */}
      <section className="container-custom py-12">
        {/* Experiment Goal */}
        {labProject.experimentGoal && (
          <ScrollReveal>
            <article className="mb-16">
              <h2 className="heading-2 mb-6">Experiment Goal</h2>
              <RichText content={labProject.experimentGoal} />
            </article>
          </ScrollReveal>
        )}

        {/* Key Learnings */}
        {labProject.keyLearnings && (
          <ScrollReveal delay={0.1}>
            <article className="mb-16">
              <h2 className="heading-2 mb-6">Key Learnings</h2>
              <RichText content={labProject.keyLearnings} />
            </article>
          </ScrollReveal>
        )}

        {/* External Links Section */}
        {(labProject.demoUrl || labProject.repositoryUrl) && (
          <ScrollReveal delay={0.2}>
            <article className="mb-16 p-8 bg-muted/50 rounded-lg border border-border">
              <h2 className="heading-3 mb-6">Explore This Project</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                {labProject.demoUrl && (
                  <a
                    href={labProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button variant="primary" className="w-full sm:w-auto">
                      <span className="mr-2">🚀</span>
                      View Live Demo
                    </Button>
                  </a>
                )}
                {labProject.repositoryUrl && (
                  <a
                    href={labProject.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button variant="secondary" className="w-full sm:w-auto">
                      <span className="mr-2">📦</span>
                      View Repository
                    </Button>
                  </a>
                )}
              </div>
            </article>
          </ScrollReveal>
        )}
      </section>

      {/* Navigation */}
      <section className="container-custom py-12 border-t border-border">
        <ScrollReveal>
          <div className="flex justify-center">
            <Link href="/labs">
              <Button variant="secondary">View More Lab Projects</Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
