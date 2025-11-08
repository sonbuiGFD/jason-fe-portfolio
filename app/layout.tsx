import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/styles/tailwind.css";
import "@/styles/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Jason Bui | Frontend Engineer Portfolio",
    template: "%s | Jason Bui",
  },
  description:
    "Portfolio showcasing professional work, side projects, and technical writing by Jason Bui, Senior Frontend Engineer.",
  keywords: [
    "frontend engineer",
    "portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "web development",
  ],
  authors: [{ name: "Jason Bui" }],
  creator: "Jason Bui",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Jason Bui | Frontend Engineer Portfolio",
    description:
      "Portfolio showcasing professional work, side projects, and technical writing by Jason Bui, Senior Frontend Engineer.",
    siteName: "Jason Bui Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jason Bui | Frontend Engineer Portfolio",
    description:
      "Portfolio showcasing professional work, side projects, and technical writing by Jason Bui, Senior Frontend Engineer.",
    creator: "@jasonbui",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          <div className="layout">
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <Header />
            <main id="main" className="main" role="main">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
