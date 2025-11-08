import { type Metadata } from "next";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LabsPageClient } from "./LabsPageClient";
import {
  getPaginatedContent,
  CONTENT_TYPES,
  type LabFrontmatter,
} from "@/lib/markdown";

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

        {/* Client Component for Display and Pagination */}
        <LabsPageClient
          initialLabProjects={labProjects}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
        />
      </section>
    </main>
  );
}
