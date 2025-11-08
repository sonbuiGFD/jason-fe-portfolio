import type { ContentBlock } from "../../types/api";

/**
 * Calculate Reading Time
 *
 * Estimates reading time in minutes based on word count.
 * Uses average reading speed of 200 words per minute.
 *
 * @param content - Content block array
 * @returns Reading time in minutes (rounded up)
 *
 * @example
 * ```tsx
 * const readingTime = calculateReadingTime(blogPost.content)
 * // => 5 (minutes)
 * ```
 */
export function calculateReadingTime(content: ContentBlock): number {
  if (!content || content.length === 0) {
    return 1; // Minimum 1 minute
  }

  // Extract text from content blocks
  const text = content
    .map((block) => {
      if (block.type === "block" && "children" in block) {
        return block.children.map((child) => child.text || "").join("");
      }
      return "";
    })
    .join(" ");

  // Count words
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;

  // Calculate reading time (200 words/minute average)
  const readingTime = Math.ceil(wordCount / 200);

  return readingTime > 0 ? readingTime : 1;
}

/**
 * Format word count as readable text
 *
 * @param wordCount - Number of words
 * @returns Formatted string (e.g., "1,234 words")
 */
export function formatWordCount(wordCount: number): string {
  return `${wordCount.toLocaleString()} word${wordCount === 1 ? "" : "s"}`;
}

/**
 * Extract plain text from content blocks
 *
 * @param content - Content block array
 * @returns Plain text string
 */
export function extractPlainText(content: ContentBlock): string {
  if (!content || content.length === 0) {
    return "";
  }

  return content
    .map((block) => {
      if (block.type === "block" && "children" in block) {
        return block.children.map((child) => child.text || "").join("");
      }
      return "";
    })
    .join("\n\n")
    .trim();
}
