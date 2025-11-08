/**
 * Date Formatting Utilities
 *
 * Functions for formatting dates in consistent, readable formats.
 */

/**
 * Format date as "Month Day, Year" (e.g., "October 30, 2025")
 *
 * @param dateString - ISO 8601 date string or Date object
 * @returns Formatted date string
 */
export function formatDate(dateString: string | Date): string {
  if (!dateString) return "";
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format date as short format "Mon DD, YYYY" (e.g., "Oct 30, 2025")
 *
 * @param dateString - ISO 8601 date string or Date object
 * @returns Formatted date string
 */
export function formatDateShort(dateString: string | Date): string {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format date as relative time (e.g., "2 days ago", "3 months ago")
 *
 * @param dateString - ISO 8601 date string or Date object
 * @returns Relative time string
 */
export function formatRelativeTime(dateString: string | Date): string {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) {
    return "just now";
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour === 1 ? "" : "s"} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  } else if (diffWeek < 4) {
    return `${diffWeek} week${diffWeek === 1 ? "" : "s"} ago`;
  } else if (diffMonth < 12) {
    return `${diffMonth} month${diffMonth === 1 ? "" : "s"} ago`;
  } else {
    return `${diffYear} year${diffYear === 1 ? "" : "s"} ago`;
  }
}

/**
 * Format date for datetime attribute (ISO 8601)
 *
 * @param dateString - ISO 8601 date string or Date object
 * @returns ISO 8601 date string
 */
export function formatDatetime(dateString: string | Date): string {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  return date.toISOString();
}

/**
 * Check if date is recent (within last N days)
 *
 * @param dateString - ISO 8601 date string or Date object
 * @param days - Number of days to consider recent (default: 7)
 * @returns True if date is within last N days
 */
export function isRecent(dateString: string | Date, days: number = 7): boolean {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays <= days;
}
