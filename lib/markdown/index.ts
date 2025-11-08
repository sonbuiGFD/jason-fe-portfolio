import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const contentDirectory = path.join(process.cwd(), "content");

/**
 * Content type directories
 */
export const CONTENT_TYPES = {
  BLOG: "blog",
  WORK: "work",
  LABS: "labs",
} as const;

export type ContentType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];

/**
 * Base frontmatter interface
 */
export interface BaseFrontmatter {
  title: string;
  date: string;
  summary: string;
  [key: string]: unknown;
}

/**
 * Blog post frontmatter
 */
export interface BlogFrontmatter extends BaseFrontmatter {
  author: string;
  tags: string[];
  heroImage?: string;
}

/**
 * Work case study frontmatter
 */
export interface WorkFrontmatter extends BaseFrontmatter {
  role: string;
  techStack: string[];
  heroImage?: string;
  impact?: Array<{ metric: string }>;
}

/**
 * Lab project frontmatter
 */
export interface LabFrontmatter extends BaseFrontmatter {
  techStack: string[];
  thumbnail?: string;
  demoUrl?: string;
  repoUrl?: string;
}

/**
 * Content item with metadata
 */
export interface ContentItem<T extends BaseFrontmatter = BaseFrontmatter> {
  slug: string;
  frontmatter: T;
  content: string;
  htmlContent?: string;
  readingTime?: number;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated content result
 */
export interface PaginatedContent<T extends BaseFrontmatter = BaseFrontmatter> {
  items: ContentItem<T>[];
  pagination: PaginationMeta;
}

/**
 * Get the directory path for a content type
 */
export function getContentDirectory(contentType: ContentType): string {
  return path.join(contentDirectory, contentType);
}

/**
 * Check if a file should be included (not a draft or hidden file)
 */
function shouldIncludeFile(filename: string): boolean {
  return (
    filename.endsWith(".md") &&
    !filename.startsWith("_") &&
    !filename.startsWith(".")
  );
}

/**
 * Get all markdown files for a content type
 */
export function getContentFiles(contentType: ContentType): string[] {
  const dir = getContentDirectory(contentType);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter(shouldIncludeFile)
    .sort((a, b) => b.localeCompare(a)); // Reverse alphabetical for newest first
}

/**
 * Extract slug from filename
 */
export function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

/**
 * Calculate reading time in minutes based on word count
 * Average reading speed: 200-250 words per minute
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 225;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

/**
 * Convert markdown to HTML with syntax highlighting
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown (tables, strikethrough, etc.)
    .use(html, { sanitize: false }) // Allow HTML in markdown
    .process(markdown);

  return result.toString();
}

/**
 * Get a single content item by slug
 */
export async function getContentBySlug<T extends BaseFrontmatter>(
  contentType: ContentType,
  slug: string,
  includeHtml = false
): Promise<ContentItem<T> | null> {
  try {
    const dir = getContentDirectory(contentType);
    const fullPath = path.join(dir, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const item: ContentItem<T> = {
      slug,
      frontmatter: data as T,
      content,
      readingTime: calculateReadingTime(content),
    };

    if (includeHtml) {
      item.htmlContent = await markdownToHtml(content);
    }

    return item;
  } catch (error) {
    console.error(`Error reading content file ${slug}:`, error);
    return null;
  }
}

/**
 * Get all content items for a type (sorted by date, newest first)
 */
export async function getAllContent<T extends BaseFrontmatter>(
  contentType: ContentType,
  includeHtml = false
): Promise<ContentItem<T>[]> {
  const files = getContentFiles(contentType);

  const items = await Promise.all(
    files.map(async (filename) => {
      const slug = getSlugFromFilename(filename);
      return getContentBySlug<T>(contentType, slug, includeHtml);
    })
  );

  // Filter out nulls and sort by date (newest first)
  return items
    .filter((item): item is ContentItem<T> => item !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });
}

/**
 * Get paginated content
 */
export async function getPaginatedContent<T extends BaseFrontmatter>(
  contentType: ContentType,
  page = 1,
  itemsPerPage = 10
): Promise<PaginatedContent<T>> {
  const allItems = await getAllContent<T>(contentType, false);
  const totalItems = allItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = allItems.slice(startIndex, endIndex);

  return {
    items,
    pagination: {
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  };
}

/**
 * Get all slugs for a content type (for static generation)
 */
export function getAllSlugs(contentType: ContentType): string[] {
  const files = getContentFiles(contentType);
  return files.map(getSlugFromFilename);
}

/**
 * Get related content by matching tags
 */
export async function getRelatedContent<
  T extends BaseFrontmatter & { tags?: string[] },
>(
  contentType: ContentType,
  currentSlug: string,
  tags: string[] = [],
  limit = 3
): Promise<ContentItem<T>[]> {
  const allItems = await getAllContent<T>(contentType, false);

  // Filter out current item and calculate relevance score
  const scoredItems = allItems
    .filter((item) => item.slug !== currentSlug)
    .map((item) => {
      const itemTags = (item.frontmatter as { tags?: string[] }).tags || [];
      const matchingTags = itemTags.filter((tag) => tags.includes(tag));
      return {
        item,
        score: matchingTags.length,
      };
    })
    .filter((scored) => scored.score > 0) // Only items with at least one matching tag
    .sort((a, b) => b.score - a.score); // Sort by relevance

  return scoredItems.slice(0, limit).map((scored) => scored.item);
}

/**
 * Search content by query (simple title and summary search)
 */
export async function searchContent<T extends BaseFrontmatter>(
  contentType: ContentType,
  query: string
): Promise<ContentItem<T>[]> {
  const allItems = await getAllContent<T>(contentType, false);
  const lowerQuery = query.toLowerCase();

  return allItems.filter((item) => {
    const titleMatch = item.frontmatter.title
      .toLowerCase()
      .includes(lowerQuery);
    const summaryMatch = item.frontmatter.summary
      .toLowerCase()
      .includes(lowerQuery);
    const contentMatch = item.content.toLowerCase().includes(lowerQuery);

    return titleMatch || summaryMatch || contentMatch;
  });
}
