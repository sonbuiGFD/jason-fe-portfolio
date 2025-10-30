import { createClient } from "@sanity/client";

/**
 * Sanity Client Configuration
 *
 * Creates two client instances:
 * - CDN client: Uses edge-cached CDN for fast reads (production)
 * - Non-CDN client: Direct API access for real-time data (admin, webhooks)
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId || !dataset) {
  throw new Error(
    "Missing Sanity project configuration. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET environment variables."
  );
}

/**
 * Sanity client with CDN enabled
 * Use for all public-facing reads (faster, edge-cached)
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Enable CDN for production reads
  perspective: "published", // Only return published documents
});

/**
 * Sanity client without CDN
 * Use for admin operations, webhooks, or when real-time data is required
 */
export const sanityClientNoCdn = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for real-time data
  token: process.env.SANITY_API_TOKEN, // Required for write operations
});

/**
 * Configuration object for exports
 */
export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
} as const;
