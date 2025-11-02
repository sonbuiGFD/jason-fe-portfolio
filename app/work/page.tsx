import { type Metadata } from "next";
import { sanityClient } from "@/lib/sanity/client";
import {
  getAllCaseStudiesQuery,
  getAllTechStacksQuery,
} from "@/lib/sanity/queries";
import {
  type WorkCaseStudyCard,
  type TechStackPreview,
  type RoleType,
} from "@/lib/sanity/types";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { WorkPageClient } from "./WorkPageClient";

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

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

const ROLE_TYPES: RoleType[] = ["Lead Engineer", "Senior Engineer", "Engineer"];

/**
 * Work Index Page
 *
 * Displays all published work case studies with SSG/ISR.
 * Includes filtering by tech stack and role type.
 */
export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ tech?: string; role?: RoleType }>;
}) {
  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams;

  // Fetch case studies (first 20 items - pagination will be added in Phase 10)
  const caseStudies = await sanityClient.fetch<WorkCaseStudyCard[]>(
    getAllCaseStudiesQuery,
    { offset: 0, limit: 20 }
  );

  // Fetch all tech stacks for filter options
  const techStacks = await sanityClient.fetch<TechStackPreview[]>(
    getAllTechStacksQuery
  );

  // Parse filters from URL params
  const initialFilters = {
    techStack: params.tech || null,
    roleType: params.role || null,
    tag: null,
  };

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
            measurable impact. Filter by technology or role to explore specific
            areas.
          </p>
        </ScrollReveal>

        {/* Client Component for Filtering and Display */}
        <WorkPageClient
          initialCaseStudies={caseStudies}
          techStacks={techStacks}
          roleTypes={ROLE_TYPES}
          initialFilters={{ ...initialFilters, tag: null }}
        />
      </section>
    </main>
  );
}
