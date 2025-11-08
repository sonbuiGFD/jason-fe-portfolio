import Fuse from "fuse.js";
import type {
  SearchIndex,
  SearchIndexFlat,
  SearchIndexItem,
  SearchQuery,
  SearchResult,
  SearchResponse,
} from "../sanity/types";

/**
 * Extended search query interface for internal use
 */
interface InternalSearchQuery extends SearchQuery {
  limit?: number;
}

/**
 * Extended search response interface for internal use
 */
interface InternalSearchResponse extends SearchResponse {
  hasResults: boolean;
}

/**
 * Client-Side Search Implementation
 *
 * Provides fuzzy search functionality using Fuse.js with pre-built search index.
 * Supports searching across all content types with weighted keys and result grouping.
 */

// Fuse.js configuration for fuzzy matching
const FUSE_OPTIONS = {
  // Fuzzy matching threshold (0.0 = exact match, 1.0 = anything matches)
  threshold: 0.3,

  // Include match information for highlighting
  includeMatches: true,
  includeScore: true,

  // Minimum character length before fuzzy matching kicks in
  minMatchCharLength: 2,

  // Fields to search with weights (higher = more important)
  keys: [
    { name: "title", weight: 0.4 },
    { name: "summary", weight: 0.3 },
    { name: "tags", weight: 0.2 },
    { name: "content", weight: 0.1 },
  ],
};

/**
 * Search client class for handling search operations
 */
export class SearchClient {
  private fuse: Fuse<SearchIndexItem> | null = null;
  private searchIndex: SearchIndexFlat | null = null;

  /**
   * Initialize search client with index data
   */
  async initialize(): Promise<void> {
    try {
      // Fetch search index from API
      const response = await fetch("/api/search");
      if (!response.ok) {
        throw new Error(`Failed to fetch search index: ${response.statusText}`);
      }

      const index: SearchIndex = await response.json();

      // Flatten search index for Fuse.js
      this.searchIndex = [
        ...index.workCaseStudies,
        ...index.labProjects,
        ...index.blogPosts,
      ];

      // Initialize Fuse.js with flattened data
      this.fuse = new Fuse(this.searchIndex, FUSE_OPTIONS);
    } catch (error) {
      console.error("Failed to initialize search client:", error);
      throw error;
    }
  }

  /**
   * Perform fuzzy search across all content
   */
  search(query: InternalSearchQuery): InternalSearchResponse {
    if (!this.fuse || !this.searchIndex) {
      throw new Error(
        "Search client not initialized. Call initialize() first."
      );
    }

    if (!query.query || query.query.trim().length < 2) {
      return {
        query: query.query || "",
        results: [],
        totalResults: 0,
        hasResults: false,
      };
    }

    // Perform search using Fuse.js
    const fuseResults = this.fuse.search(query.query.trim());

    // Transform Fuse results to our format
    const searchResults: SearchResult[] = fuseResults
      .slice(0, query.limit || 20)
      .map((result) => ({
        item: result.item,
        score: result.score || 0,
        matches: result.matches || [],
      }));

    // Group results by type
    const groupedResults = this.groupResultsByType(searchResults);

    return {
      query: query.query,
      results: groupedResults,
      totalResults: fuseResults.length,
      hasResults: fuseResults.length > 0,
    };
  }

  /**
   * Group search results by content type
   */
  private groupResultsByType(results: SearchResult[]): SearchResult[] {
    const grouped: { [key: string]: SearchResult[] } = {
      work: [],
      lab: [],
      blog: [],
    };

    // Group results
    results.forEach((result) => {
      const type = result.item.type;
      if (grouped[type]) {
        grouped[type].push(result);
      }
    });

    // Flatten back to array with type priority: work -> blog -> labs
    return [...grouped.work, ...grouped.blog, ...grouped.lab];
  }

  /**
   * Get search suggestions based on partial query
   */
  getSuggestions(partialQuery: string, limit: number = 5): string[] {
    if (!this.searchIndex || partialQuery.length < 2) {
      return [];
    }

    // Simple suggestion algorithm based on titles
    const suggestions = this.searchIndex
      .filter((item) =>
        item.title.toLowerCase().includes(partialQuery.toLowerCase())
      )
      .map((item) => item.title)
      .slice(0, limit);

    return [...new Set(suggestions)]; // Remove duplicates
  }

  /**
   * Check if search client is ready
   */
  isReady(): boolean {
    return this.fuse !== null && this.searchIndex !== null;
  }

  /**
   * Get total number of indexed items
   */
  getIndexSize(): number {
    return this.searchIndex?.length || 0;
  }
}

// Singleton instance for app-wide use
let searchClientInstance: SearchClient | null = null;

/**
 * Get or create search client singleton
 */
export function getSearchClient(): SearchClient {
  if (!searchClientInstance) {
    searchClientInstance = new SearchClient();
  }
  return searchClientInstance;
}

/**
 * Utility function for quick search
 * Automatically initializes client if needed
 */
export async function quickSearch(
  query: string,
  options: { limit?: number } = {}
): Promise<SearchResponse> {
  const client = getSearchClient();

  if (!client.isReady()) {
    await client.initialize();
  }

  return client.search({
    query,
    limit: options.limit || 10,
  });
}

/**
 * React hook for search functionality
 */
export function useSearch() {
  const client = getSearchClient();

  return {
    search: (query: string, limit?: number) => client.search({ query, limit }),
    getSuggestions: (query: string, limit?: number) =>
      client.getSuggestions(query, limit),
    initialize: () => client.initialize(),
    isReady: () => client.isReady(),
    indexSize: () => client.getIndexSize(),
  };
}
