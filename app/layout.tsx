import type { Metadata } from "next";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Jason Bui - Frontend Engineer",
  description:
    "Professional portfolio showcasing frontend engineering work, side projects, and technical blog posts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
