"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "./Button";

interface CodeBlockProps {
  /**
   * The code content to display
   */
  code: string;
  /**
   * The programming language for syntax highlighting
   */
  language?: string;
  /**
   * Optional filename to display
   */
  filename?: string;
  /**
   * Whether to show line numbers (default: true)
   */
  showLineNumbers?: boolean;
  /**
   * Whether to enable copy-to-clipboard button (default: true)
   */
  enableCopy?: boolean;
  /**
   * Custom theme override (default: uses theme context)
   */
  theme?: "light" | "dark";
}

/**
 * CodeBlock Component
 *
 * Displays syntax-highlighted code with optional filename, line numbers,
 * and copy-to-clipboard functionality.
 *
 * @example
 * ```tsx
 * <CodeBlock
 *   code="const greeting = 'Hello, World!';"
 *   language="typescript"
 *   filename="example.ts"
 * />
 * ```
 */
export function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = true,
  enableCopy = true,
  theme,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Use theme prop if provided, otherwise rely on CSS variable
  const isDark =
    theme === "dark" ||
    (!theme &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="code-block" role="region" aria-label="Code snippet">
      {/* Header with filename and copy button */}
      {(filename || enableCopy) && (
        <div className="code-block__header">
          {filename && (
            <span
              className="code-block__header__filename"
              aria-label={`Filename: ${filename}`}
            >
              {filename}
            </span>
          )}
          {enableCopy && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="code-block__header__copy-button"
              aria-label={
                isCopied ? "Copied to clipboard" : "Copy code to clipboard"
              }
            >
              {isCopied ? (
                <>
                  <span
                    className="code-block__header__copy-button__icon"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <span
                    className="code-block__header__copy-button__icon"
                    aria-hidden="true"
                  >
                    📋
                  </span>
                  <span>Copy</span>
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* Code content with syntax highlighting */}
      <div className="code-block__content">
        <SyntaxHighlighter
          language={language}
          style={isDark ? vscDarkPlus : vs}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            borderRadius:
              filename || enableCopy ? "0 0 0.5rem 0.5rem" : "0.5rem",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                "var(--font-mono, 'Consolas', 'Monaco', 'Courier New', monospace)",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
