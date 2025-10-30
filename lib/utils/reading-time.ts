/**
 * Calculate Reading Time
 *
 * Estimates reading time in minutes based on word count.
 * Uses average reading speed of 200 words per minute.
 *
 * @param content - Sanity block content array
 * @returns Reading time in minutes (rounded up)
 *
 * @example
 * ```tsx
 * const readingTime = calculateReadingTime(blogPost.content)
 * // => 5 (minutes)
 * ```
 */
export function calculateReadingTime(content: any[]): number {
  if (!content || content.length === 0) {
    return 1; // Minimum 1 minute
  }

  // Extract text from Sanity block content
  const text = content
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children.map((child: any) => child.text || "").join("");
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
 * Extract plain text from Sanity block content
 *
 * @param content - Sanity block content array
 * @returns Plain text string
 */
export function extractPlainText(content: any[]): string {
  if (!content || content.length === 0) {
    return "";
  }

  return content
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children.map((child: any) => child.text || "").join("");
      }
      return "";
    })
    .join("\n\n")
    .trim();
}
