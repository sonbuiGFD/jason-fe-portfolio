import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { SearchIndex } from "@/types/api";

/**
 * Search API Route
 *
 * Serves the pre-built search index as JSON for client-side search functionality.
 * The search index is generated at build time and cached for optimal performance.
 */

const SEARCH_INDEX_PATH = path.join(
  process.cwd(),
  "public",
  "search-index.json"
);

/**
 * GET /api/search
 *
 * Returns the search index JSON file with appropriate caching headers.
 */
export async function GET() {
  try {
    // Check if search index file exists
    try {
      await fs.access(SEARCH_INDEX_PATH);
    } catch {
      return NextResponse.json(
        {
          error: "Search index not found. Run build:search-index to generate.",
        },
        { status: 404 }
      );
    }

    // Read and parse search index
    const indexData = await fs.readFile(SEARCH_INDEX_PATH, "utf8");
    const searchIndex: SearchIndex = JSON.parse(indexData);

    // Return with caching headers (cache for 1 hour)
    return NextResponse.json(searchIndex, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error serving search index:", error);
    return NextResponse.json(
      { error: "Failed to load search index" },
      { status: 500 }
    );
  }
}
