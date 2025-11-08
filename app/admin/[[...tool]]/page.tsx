"use client";

/**
 * Sanity Studio Route
 *
 * This route serves the Sanity Studio at /admin
 * The [[...tool]] catch-all route handles all Studio navigation
 */

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export default function AdminPage() {
  return <NextStudio config={config} />;
}
