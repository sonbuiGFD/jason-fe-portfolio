import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio | Jason Bui Portfolio",
  description: "Sanity Studio - Content Management System",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
