import Image from "next/image";
import {
  type SanityBlockContent,
  type SanityBlock,
  type SanityImage,
} from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image-builder";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface RichTextProps {
  content: SanityBlockContent;
  className?: string;
}

/**
 * RichText Component
 *
 * Renders Sanity block content with proper HTML semantics.
 * Supports text blocks, headings, images, and code blocks.
 *
 * @example
 * ```tsx
 * <RichText content={caseStudy.problemStatement} />
 * ```
 */
export function RichText({ content, className = "" }: RichTextProps) {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className={`rich-text ${className}`.trim()}>
      {content.map((block, index) => {
        // Image block
        if (block._type === "image") {
          const imageBlock = block as SanityImage & { _key?: string };
          const imageUrl = urlForImage(imageBlock).width(1200).url();

          return (
            <figure key={imageBlock._key || index} className="rich-text__image">
              <Image
                src={imageUrl}
                alt="Content image"
                width={1200}
                height={675}
                className="rich-text__image__img"
                loading="lazy"
              />
            </figure>
          );
        }

        // Code block
        if (block._type === "code") {
          const codeBlock = block as any;
          return (
            <CodeBlock
              key={block._key || index}
              code={codeBlock.code}
              language={codeBlock.language || "typescript"}
              filename={codeBlock.filename}
              showLineNumbers={true}
              enableCopy={true}
            />
          );
        }

        // Text block
        if (block._type === "block") {
          const textBlock = block as SanityBlock;
          const style = textBlock.style || "normal";

          // Get text content from children
          const textContent = textBlock.children
            .map((child) => child.text)
            .join("");

          // Render based on style
          switch (style) {
            case "h1":
              return (
                <h1 key={textBlock._key} className="rich-text__h1">
                  {textContent}
                </h1>
              );
            case "h2":
              return (
                <h2 key={textBlock._key} className="rich-text__h2">
                  {textContent}
                </h2>
              );
            case "h3":
              return (
                <h3 key={textBlock._key} className="rich-text__h3">
                  {textContent}
                </h3>
              );
            case "h4":
              return (
                <h4 key={textBlock._key} className="rich-text__h4">
                  {textContent}
                </h4>
              );
            case "h5":
              return (
                <h5 key={textBlock._key} className="rich-text__h5">
                  {textContent}
                </h5>
              );
            case "h6":
              return (
                <h6 key={textBlock._key} className="rich-text__h6">
                  {textContent}
                </h6>
              );
            case "blockquote":
              return (
                <blockquote
                  key={textBlock._key}
                  className="rich-text__blockquote"
                >
                  {textContent}
                </blockquote>
              );
            default:
              return (
                <p key={textBlock._key} className="rich-text__p">
                  {textContent}
                </p>
              );
          }
        }

        return null;
      })}
    </div>
  );
}
