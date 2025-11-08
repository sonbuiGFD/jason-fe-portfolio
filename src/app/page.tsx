import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main role="main">
      {/* Hero Section */}
      <section className="container-custom min-h-[80vh] flex flex-col justify-center py-20">
        <ScrollReveal>
          <h1 className="heading-1 mb-6">
            Hi, I'm <span className="text-primary">Jason Bui</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="body-large text-muted max-w-2xl mb-8">
            A frontend engineer passionate about building beautiful, accessible,
            and performant web experiences. I specialize in React, TypeScript,
            and modern web technologies.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/work">
              <Button variant="primary" size="lg">
                View My Work
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg">
                About Me
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Overview Section */}
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
                Articles about frontend development, performance optimization,
                and lessons learned along the way.
              </p>
              <Link href="/blog" className="text-primary hover:underline">
                Read Blog →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
