"use client";

import Link from "next/link";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g., '/blog', '/work', '/labs'
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  // Generate URL with page parameter
  const getPageUrl = (page: number): string => {
    if (page === 1) {
      return basePath; // First page doesn't need ?page=1
    }
    return `${basePath}?page=${page}`;
  };

  // Don't render pagination if only one page
  if (totalPages <= 1) {
    return null;
  }

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Generate page numbers to display (max 7: 1 ... 3 4 5 ... 10)
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the beginning: 1 2 3 4 ... 10
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end: 1 ... 7 8 9 10
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle: 1 ... 4 5 6 ... 10
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="pagination"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <div className="pagination__container">
        {/* Previous Button */}
        {hasPrevious ? (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="pagination__button pagination__button__prev"
            aria-label="Go to previous page"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Previous</span>
          </Link>
        ) : (
          <button
            className="pagination__button pagination__button__prev pagination__button__disabled"
            disabled
            aria-label="Previous page (disabled)"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Previous</span>
          </button>
        )}

        {/* Page Numbers */}
        <ul className="pagination__list">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <li key={`ellipsis-${index}`} className="pagination__item">
                  <span className="pagination__ellipsis" aria-hidden="true">
                    …
                  </span>
                </li>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <li key={pageNum} className="pagination__item">
                {isActive ? (
                  <span
                    className="pagination__link pagination__link__active"
                    aria-current="page"
                    aria-label={`Page ${pageNum} (current)`}
                  >
                    {pageNum}
                  </span>
                ) : (
                  <Link
                    href={getPageUrl(pageNum)}
                    className="pagination__link"
                    aria-label={`Go to page ${pageNum}`}
                  >
                    {pageNum}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Next Button */}
        {hasNext ? (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="pagination__button pagination__button__next"
            aria-label="Go to next page"
          >
            <span>Next</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ) : (
          <button
            className="pagination__button pagination__button__next pagination__button__disabled"
            disabled
            aria-label="Next page (disabled)"
          >
            <span>Next</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Screen reader text */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
}
