import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

function SectionHero() {
  return (
    <section className="container-custom min-h-[80vh] flex flex-col justify-center py-20">
      <ScrollReveal>
        <h1 className="heading-1 mb-6">
          Hi, I'm <span className="text-primary">Jason Bui</span>
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p className="body-large text-muted max-w-2xl mb-8">
          A frontend engineer passionate about building beautiful, accessible,
          and performant web experiences. I specialize in React, TypeScript, and
          modern web technologies.
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
  );
}

export default SectionHero;
