import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";

export default function SectionOverview() {
  return (
    <section className="container-custom py-20">
      <ScrollReveal>
        <h2 className="heading-2 mb-12 text-center">What I Do</h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ScrollReveal delay={0.1}>
          <div className="p-6 rounded-lg border border-border bg-background hover:border-primary transition-colors">
            <h3 className="heading-3 mb-4">Work Experience</h3>
            <p className="body text-muted mb-4">
              Detailed case studies of my professional work, showcasing
              problem-solving approaches and technical implementations.
            </p>
            <Link href="/work" className="text-primary hover:underline">
              View Case Studies →
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="p-6 rounded-lg border border-border bg-background hover:border-primary transition-colors">
            <h3 className="heading-3 mb-4">Side Projects</h3>
            <p className="body text-muted mb-4">
              Experimental projects and learning labs where I explore new
              technologies and share my discoveries.
            </p>
            <Link href="/labs" className="text-primary hover:underline">
              Explore Labs →
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="p-6 rounded-lg border border-border bg-background hover:border-primary transition-colors">
            <h3 className="heading-3 mb-4">Blog & Insights</h3>
            <p className="body text-muted mb-4">
              Articles about frontend development, performance optimization, and
              lessons learned along the way.
            </p>
            <Link href="/blog" className="text-primary hover:underline">
              Read Blog →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
