import { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { sanityClient } from "@/lib/sanity/client";
import { getAuthorQuery } from "@/lib/sanity/queries";
import { Author } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "About | Jason Bui",
  description:
    "Learn more about Jason Bui, a frontend engineer passionate about building beautiful, accessible, and performant web experiences.",
};

async function getAuthor(): Promise<Author | null> {
  try {
    const author = await sanityClient.fetch<Author>(getAuthorQuery);
    return author;
  } catch (error) {
    console.error("Error fetching author:", error);
    return null;
  }
}

export default async function AboutPage() {
  const author = await getAuthor();

  return (
    <main role="main">
      <article className="container-custom py-20">
        <ScrollReveal>
          <h1 className="heading-1 mb-8">About Me</h1>
        </ScrollReveal>

        {author ? (
          <>
            <ScrollReveal delay={0.2}>
              <div className="max-w-3xl mb-12">
                <h2 className="heading-3 mb-4">{author.name}</h2>
                <p className="body-large text-primary mb-6">{author.role}</p>
                {author.bio && (
                  <div className="prose prose-lg dark:prose-invert">
                    {author.bio.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="body mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>

            {author.socialLinks &&
              (author.socialLinks.github ||
                author.socialLinks.linkedin ||
                author.socialLinks.twitter) && (
                <ScrollReveal delay={0.4}>
                  <div className="mb-12">
                    <h3 className="heading-3 mb-6">Connect With Me</h3>
                    <div className="flex flex-wrap gap-4">
                      {author.socialLinks.github && (
                        <a
                          href={author.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Visit GitHub profile"
                        >
                          <Button variant="secondary" size="md">
                            GitHub
                          </Button>
                        </a>
                      )}
                      {author.socialLinks.linkedin && (
                        <a
                          href={author.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Visit LinkedIn profile"
                        >
                          <Button variant="secondary" size="md">
                            LinkedIn
                          </Button>
                        </a>
                      )}
                      {author.socialLinks.twitter && (
                        <a
                          href={author.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Visit Twitter profile"
                        >
                          <Button variant="secondary" size="md">
                            Twitter
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              )}

            {author.email && (
              <ScrollReveal delay={0.6}>
                <div>
                  <h3 className="heading-3 mb-6">Get In Touch</h3>
                  <p className="body text-muted mb-4">
                    Feel free to reach out if you'd like to collaborate or just
                    say hi!
                  </p>
                  <a href={`mailto:${author.email}`} aria-label="Send email">
                    <Button variant="primary" size="md">
                      Send Email
                    </Button>
                  </a>
                </div>
              </ScrollReveal>
            )}
          </>
        ) : (
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="body-large text-muted mb-8">
                I'm a frontend engineer passionate about building beautiful,
                accessible, and performant web experiences. I specialize in
                React, TypeScript, and modern web technologies.
              </p>
              <p className="body text-muted mb-8">
                With years of experience in frontend development, I focus on
                creating user-centric interfaces that are not only visually
                appealing but also highly functional and accessible to all
                users.
              </p>
              <p className="body text-muted">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge
                through blog posts and talks.
              </p>
            </div>
          </ScrollReveal>
        )}
      </article>
    </main>
  );
}
