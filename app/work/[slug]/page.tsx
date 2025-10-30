import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity/client";
import {
  getCaseStudyBySlugQuery,
  getAllCaseStudySlugsQuery,
} from "@/lib/sanity/queries";
import { WorkCaseStudyDetail } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image-builder";
import { formatDate } from "@/lib/utils/date-formatter";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { RichText } from "@/components/content/RichText";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

interface WorkDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static paths for all published case studies
 */
export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(getAllCaseStudySlugsQuery);

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate metadata for case study detail page
 */
export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const caseStudy = await sanityClient.fetch<WorkCaseStudyDetail>(
    getCaseStudyBySlugQuery,
    { slug }
  );

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const heroImageUrl = caseStudy.heroImage
    ? urlForImage(caseStudy.heroImage).width(1200).height(630).url()
    : undefined;

  return {
    title: `${caseStudy.title} | Work | Jason Bui`,
    description: caseStudy.summary,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      type: "article",
      publishedTime: caseStudy.publishedAt,
      authors: [caseStudy.author.name],
      images: heroImageUrl
        ? [
            {
              url: heroImageUrl,
              width: 1200,
              height: 630,
              alt: caseStudy.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.title,
      description: caseStudy.summary,
      images: heroImageUrl ? [heroImageUrl] : [],
    },
  };
}

/**
 * Work Case Study Detail Page
 *
 * Displays a single work case study with full details.
 */
export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;

  const caseStudy = await sanityClient.fetch<WorkCaseStudyDetail>(
    getCaseStudyBySlugQuery,
    { slug }
  );

  // Return 404 if case study not found or not published
  if (!caseStudy) {
    notFound();
  }

  const heroImageUrl = caseStudy.heroImage
    ? urlForImage(caseStudy.heroImage).width(1600).url()
    : null;

  return (
    <main role="main">
      {/* Hero Section */}
      <section className="container-custom py-12">
        <ScrollReveal>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Work</span>
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 rounded">
              {caseStudy.roleType}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h1 className="heading-1 mb-6">{caseStudy.title}</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="body-large text-muted max-w-3xl mb-8">
            {caseStudy.summary}
          </p>
        </ScrollReveal>

        {/* Meta Information */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Author:</span>
              <span>
                {caseStudy.author.name}, {caseStudy.author.role}
              </span>
            </div>
            <span aria-hidden="true">•</span>
            {caseStudy.publishedAt && (
              <time dateTime={caseStudy.publishedAt}>
                {formatDate(caseStudy.publishedAt)}
              </time>
            )}
          </div>
        </ScrollReveal>

        {/* Tech Stack Tags */}
        {caseStudy.techStack && caseStudy.techStack.length > 0 && (
          <ScrollReveal delay={0.5}>
            <div className="flex flex-wrap gap-2 mb-12">
              {caseStudy.techStack.map((tech) => (
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

        {/* Hero Image */}
        {heroImageUrl && (
          <ScrollReveal delay={0.6}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-16">
              <Image
                src={heroImageUrl}
                alt={`${caseStudy.title} - Hero Image`}
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
        {/* Problem Statement */}
        {caseStudy.problemStatement && (
          <ScrollReveal>
            <article className="mb-16">
              <h2 className="heading-2 mb-6">Problem Statement</h2>
              <RichText content={caseStudy.problemStatement} />
            </article>
          </ScrollReveal>
        )}

        {/* Approach */}
        {caseStudy.approach && (
          <ScrollReveal delay={0.1}>
            <article className="mb-16">
              <h2 className="heading-2 mb-6">Approach</h2>
              <RichText content={caseStudy.approach} />
            </article>
          </ScrollReveal>
        )}

        {/* Architecture */}
        {caseStudy.architecture && (
          <ScrollReveal delay={0.2}>
            <article className="mb-16">
              <h2 className="heading-2 mb-6">Architecture</h2>
              <RichText content={caseStudy.architecture} />
            </article>
          </ScrollReveal>
        )}

        {/* Impact */}
        {caseStudy.impact && (
          <ScrollReveal delay={0.3}>
            <article className="mb-16">
              <h2 className="heading-2 mb-6">Impact</h2>
              <RichText content={caseStudy.impact} />
            </article>
          </ScrollReveal>
        )}
      </section>

      {/* Navigation */}
      <section className="container-custom py-12 border-t border-border">
        <ScrollReveal>
          <div className="flex justify-center">
            <Link href="/work">
              <Button variant="secondary">View More Case Studies</Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
