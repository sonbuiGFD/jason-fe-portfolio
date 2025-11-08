import { type Metadata } from "next";
import { sanityClient } from "@/lib/sanity/client";
import {
  getAllLabProjectsQuery,
  getAllTechStacksQuery,
} from "@/lib/sanity/queries";
import { type LabProjectCard, type TechStackPreview } from "@/lib/sanity/types";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LabsPageClient } from "./LabsPageClient";

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

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

/**
 * Labs Index Page
 *
 * Displays all published lab projects with SSG/ISR.
 * Includes filtering by tech stack.
 */
export default async function LabsPage({
  searchParams,
}: {
  searchParams: Promise<{ tech?: string }>;
}) {
  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams;

  // Fetch lab projects (first 20 items - pagination will be added in Phase 10)
  const labProjects = await sanityClient.fetch<LabProjectCard[]>(
    getAllLabProjectsQuery,
    { offset: 0, limit: 20 }
  );

  // Fetch all tech stacks for filter options
  const techStacks = await sanityClient.fetch<TechStackPreview[]>(
    getAllTechStacksQuery
  );

  // Parse filter from URL params
  const initialFilter = params.tech || null;

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
            with documented goals and key insights. Filter by technology to
            discover specific explorations.
          </p>
        </ScrollReveal>

        {/* Client Component for Filtering and Display */}
        <LabsPageClient
          initialLabProjects={labProjects}
          techStacks={techStacks}
          initialFilter={initialFilter}
        />
      </section>
    </main>
  );
}
