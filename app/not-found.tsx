import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * Custom 404 Not Found Page
 *
 * Displays when users navigate to non-existent pages or unpublished content.
 * Provides helpful navigation and maintains branding consistency.
 */
export default function NotFound() {
  return (
    <main className="not-found" role="main">
      <div className="container-custom py-20 text-center">
        <ScrollReveal>
          <div className="not-found__content max-w-2xl mx-auto">
            {/* 404 Heading */}
            <h1 className="not-found__title text-6xl md:text-8xl font-bold mb-6 text-muted">
              404
            </h1>

            {/* Error Message */}
            <h2 className="not-found__heading heading-2 mb-6">
              Page Not Found
            </h2>

            <p className="not-found__description body-large text-muted mb-12">
              Sorry, the page you're looking for doesn't exist or may have been
              moved. This could be an unpublished piece of content or a broken
              link.
            </p>

            {/* Navigation Links */}
            <div className="not-found__actions space-y-4">
              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  href="/"
                  className="not-found__home-link inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9,22 9,12 15,12 15,22" />
                  </svg>
                  Go Home
                </Link>

                <Link
                  href="/work"
                  className="not-found__work-link inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  View My Work
                </Link>
              </div>

              {/* Secondary Navigation */}
              <div className="not-found__nav-links">
                <p className="text-sm text-muted mb-4">
                  Or explore other sections:
                </p>

                <nav className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/labs"
                    className="not-found__nav-link text-sm px-4 py-2 rounded-md hover:bg-muted transition-colors"
                  >
                    Side Projects
                  </Link>
                  <Link
                    href="/blog"
                    className="not-found__nav-link text-sm px-4 py-2 rounded-md hover:bg-muted transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    className="not-found__nav-link text-sm px-4 py-2 rounded-md hover:bg-muted transition-colors"
                  >
                    About Me
                  </Link>
                </nav>
              </div>
            </div>

            {/* Help Text */}
            <div className="not-found__help mt-12 p-6 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Need help?</h3>
              <p className="text-sm text-muted">
                If you believe this is an error, or if you were looking for
                specific content, try using the search function (Cmd+K) or check
                the main navigation above.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
