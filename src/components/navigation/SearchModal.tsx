"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useSearch } from "@/lib/search/search-client";
import type { SearchResult, SearchResponse } from "@/types/api";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SearchModal Component
 *
 * Full-screen search modal with fuzzy search, grouped results, and keyboard navigation.
 * Supports Cmd+K/Ctrl+K shortcut and arrow key navigation.
 */
export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { search, initialize, isReady } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Initialize search client on mount
  useEffect(() => {
    if (isOpen && !isReady()) {
      initialize().catch(console.error);
    }
  }, [isOpen, isReady, initialize]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search
  const handleSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim() || !isReady()) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = (await search(
          searchQuery,
          10
        )) as unknown as SearchResponse;
        setResults(response.results);
        setSelectedIndex(0);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [search, isReady]
  );

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, handleSearch]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          if (results[selectedIndex]) {
            e.preventDefault();
            router.push(results[selectedIndex].item.url);
            onClose();
          }
          break;
      }
    },
    [isOpen, results, selectedIndex, onClose, router]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "work":
        return "Work";
      case "lab":
        return "Labs";
      case "blog":
        return "Blog";
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-primary/10 text-primary";
      case "lab":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-300";
      case "blog":
        return "bg-green-500/10 text-green-700 dark:text-green-300";
      default:
        return "bg-muted";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="search-modal fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="search-modal__content w-full max-w-2xl mt-20 bg-background border border-border rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="search-modal__input-container p-4 border-b border-border">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search all content..."
                className="w-full text-lg bg-transparent border-none outline-none placeholder-muted"
              />
            </div>

            {/* Results */}
            <div
              ref={resultsRef}
              className="search-modal__results max-h-96 overflow-y-auto"
            >
              {isSearching ? (
                <div className="p-8 text-center text-muted">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div className="p-2">
                  {results.map((result, index) => (
                    <button
                      key={result.item.id}
                      onClick={() => {
                        router.push(result.item.url);
                        onClose();
                      }}
                      className={`search-modal__result w-full text-left p-3 rounded-lg transition-colors ${
                        index === selectedIndex
                          ? "bg-muted"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Type Badge */}
                        <span
                          className={`search-modal__type-badge text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(result.item.type)}`}
                        >
                          {getTypeLabel(result.item.type)}
                        </span>

                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h3 className="search-modal__result-title font-semibold mb-1 line-clamp-1">
                            {result.item.title}
                          </h3>

                          {/* Summary */}
                          <p className="search-modal__result-summary text-sm text-muted line-clamp-2 mb-2">
                            {result.item.summary}
                          </p>

                          {/* Tags */}
                          {result.item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {result.item.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {result.item.tags.length > 3 && (
                                <span className="text-xs text-muted">
                                  +{result.item.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : query.trim().length > 0 ? (
                <div className="p-8 text-center text-muted">
                  <p>No results found for "{query}"</p>
                  <p className="text-sm mt-1">
                    Try different keywords or check your spelling
                  </p>
                </div>
              ) : (
                <div className="p-8 text-center text-muted">
                  <p>Start typing to search all content...</p>
                  <p className="text-sm mt-1">
                    Use ↑↓ to navigate, Enter to select, Esc to close
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="search-modal__footer p-3 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>Search across work, labs, and blog posts</span>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">
                    ↑↓
                  </kbd>
                  <span>navigate</span>
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">
                    ↵
                  </kbd>
                  <span>select</span>
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">
                    esc
                  </kbd>
                  <span>close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
