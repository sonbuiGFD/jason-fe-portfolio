import fs from "fs/promises";
import path from "path";
import { sanityClient } from "../sanity/client";
import { buildSearchIndexQuery } from "../sanity/queries";
import type { SearchIndex } from "../sanity/types";

/**
 * Build Search Index Script
 *
 * Generates a JSON search index from all published content in Sanity CMS.
 * This index is used by the client-side search functionality.
 *
 * Usage:
 * ```bash
 * npm run build:search-index
 * # or
 * npx tsx lib/search/build-index.ts
 * ```
 */

// Search index configuration
const SEARCH_INDEX_PATH = path.join(
  process.cwd(),
  "public",
  "search-index.json"
);

/**
 * Validate search index structure
 */
function validateSearchIndex(searchIndex: SearchIndex): boolean {
  const requiredKeys = ["workCaseStudies", "labProjects", "blogPosts"];

  for (const key of requiredKeys) {
    if (!Array.isArray(searchIndex[key as keyof SearchIndex])) {
      console.error(`Invalid search index: missing or invalid ${key}`);
      return false;
    }
  }

  return true;
}

/**
 * Build and save search index
 */
async function buildSearchIndex() {
  try {
    // eslint-disable-next-line no-console
    console.log("🔍 Building search index...");

    // Fetch all published content from Sanity using the structured query
    const searchIndex = await sanityClient.fetch<SearchIndex>(
      buildSearchIndexQuery
    );

    // Validate the structure
    if (!validateSearchIndex(searchIndex)) {
      throw new Error("Invalid search index structure returned from query");
    }

    // Calculate totals
    const totalItems =
      searchIndex.workCaseStudies.length +
      searchIndex.labProjects.length +
      searchIndex.blogPosts.length;

    // eslint-disable-next-line no-console
    console.log(`📝 Found ${totalItems} published items`);

    // Ensure public directory exists
    await fs.mkdir(path.dirname(SEARCH_INDEX_PATH), { recursive: true });

    // Write search index to file
    await fs.writeFile(
      SEARCH_INDEX_PATH,
      JSON.stringify(searchIndex, null, 2),
      "utf8"
    );

    // eslint-disable-next-line no-console
    console.log(`✅ Search index built successfully`);
    // eslint-disable-next-line no-console
    console.log(`📍 Saved to: ${SEARCH_INDEX_PATH}`);
    // eslint-disable-next-line no-console
    console.log(`📊 Total items indexed: ${totalItems}`);
    // eslint-disable-next-line no-console
    console.log(`🕐 Generated at: ${new Date().toISOString()}`);

    // Log breakdown by content type
    const contentTypeBreakdown = {
      work: searchIndex.workCaseStudies.length,
      labs: searchIndex.labProjects.length,
      blog: searchIndex.blogPosts.length,
    };

    // eslint-disable-next-line no-console
    console.log("📋 Content breakdown:", contentTypeBreakdown);
  } catch (error) {
    console.error("❌ Error building search index:", error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  buildSearchIndex();
}

export { buildSearchIndex };
