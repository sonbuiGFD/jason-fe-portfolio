import fs from "fs/promises";
import path from "path";
import {
  getAllContent,
  CONTENT_TYPES,
  type BlogFrontmatter,
  type WorkFrontmatter,
  type LabFrontmatter,
} from "../markdown";
import type {
  SearchIndex,
  SearchIndexItem,
} from "../../specs/000-fe-portfolio/contracts/api-types";

/**
 * Build Search Index Script
 *
 * Generates a JSON search index from all published markdown content.
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
function _validateSearchIndex(searchIndex: SearchIndex): boolean {
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
    console.log("🔍 Building search index from markdown files...");

    // Fetch all content from markdown files
    const [blogPosts, workCaseStudies, labProjects] = await Promise.all([
      getAllContent<BlogFrontmatter>(CONTENT_TYPES.BLOG),
      getAllContent<WorkFrontmatter>(CONTENT_TYPES.WORK),
      getAllContent<LabFrontmatter>(CONTENT_TYPES.LABS),
    ]);

    // Transform content to search index format
    const searchIndex: SearchIndex = {
      blogPosts: blogPosts.map(transformToSearchItem("blog")),
      workCaseStudies: workCaseStudies.map(transformToSearchItem("work")),
      labProjects: labProjects.map(transformToSearchItem("lab")),
    };

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

/**
 * Transform content item to search index item
 */
function transformToSearchItem(type: "blog" | "work" | "lab") {
  return function <
    T extends {
      title: string;
      summary: string;
      tags?: string[];
      techStack?: string[];
    },
  >(item: { slug: string; frontmatter: T; content: string }): SearchIndexItem {
    // Combine tags from different sources
    const tags = [
      ...(item.frontmatter.tags || []),
      ...(item.frontmatter.techStack || []),
    ];

    // Extract first 500 characters of content for search
    const content = item.content.substring(0, 500);

    return {
      _id: item.slug,
      type,
      title: item.frontmatter.title,
      url: `/${type}/${item.slug}`,
      summary: item.frontmatter.summary,
      tags,
      content,
    };
  };
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildSearchIndex();
}

export { buildSearchIndex };
