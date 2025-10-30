/**
 * Slug Generation Utilities
 *
 * Functions for generating URL-safe slugs from titles and strings.
 */

/**
 * Generate a URL-safe slug from a string
 *
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes special characters
 * - Handles accented characters
 * - Collapses multiple hyphens
 * - Trims leading/trailing hyphens
 *
 * @param text - Input string to convert to slug
 * @returns URL-safe slug
 *
 * @example
 * ```tsx
 * generateSlug("Hello World! This is a Test")
 * // => "hello-world-this-is-a-test"
 *
 * generateSlug("React Performance Tips & Tricks")
 * // => "react-performance-tips-tricks"
 * ```
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}

/**
 * Generate a unique slug by appending a number if slug already exists
 *
 * @param text - Input string to convert to slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique URL-safe slug
 *
 * @example
 * ```tsx
 * generateUniqueSlug("My Post", ["my-post", "my-post-2"])
 * // => "my-post-3"
 * ```
 */
export function generateUniqueSlug(
  text: string,
  existingSlugs: string[]
): string {
  const baseSlug = generateSlug(text);
  let slug = baseSlug;
  let counter = 2;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Validate if a string is a valid slug
 *
 * - Only lowercase letters, numbers, and hyphens
 * - No leading/trailing hyphens
 * - No consecutive hyphens
 *
 * @param slug - String to validate
 * @returns True if valid slug format
 *
 * @example
 * ```tsx
 * isValidSlug("hello-world")       // => true
 * isValidSlug("Hello-World")       // => false (uppercase)
 * isValidSlug("hello--world")      // => false (consecutive hyphens)
 * isValidSlug("-hello-world")      // => false (leading hyphen)
 * ```
 */
export function isValidSlug(slug: string): boolean {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
}

/**
 * Extract slug from a URL path
 *
 * @param url - URL or path string
 * @returns Slug portion of the URL
 *
 * @example
 * ```tsx
 * extractSlugFromUrl("/blog/my-post")
 * // => "my-post"
 *
 * extractSlugFromUrl("https://example.com/work/case-study-name")
 * // => "case-study-name"
 * ```
 */
export function extractSlugFromUrl(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

/**
 * Truncate text and generate slug
 *
 * @param text - Input string
 * @param maxLength - Maximum slug length (default: 60)
 * @returns Truncated URL-safe slug
 */
export function generateTruncatedSlug(
  text: string,
  maxLength: number = 60
): string {
  const slug = generateSlug(text);

  if (slug.length <= maxLength) {
    return slug;
  }

  // Truncate at word boundary
  const truncated = slug.substring(0, maxLength);
  const lastHyphen = truncated.lastIndexOf("-");

  return lastHyphen > 0 ? truncated.substring(0, lastHyphen) : truncated;
}
