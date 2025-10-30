import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient, sanityConfig } from "./client";

/**
 * Sanity Image URL Builder
 *
 * Generates optimized, responsive image URLs from Sanity Image CDN
 * with automatic format conversion (WebP/AVIF) and on-the-fly transformations.
 *
 * @example
 * ```tsx
 * import { urlForImage } from '@/lib/sanity/image-builder'
 *
 * // Basic usage
 * const imageUrl = urlForImage(heroImage).url()
 *
 * // With transformations
 * const thumbnailUrl = urlForImage(heroImage)
 *   .width(400)
 *   .height(300)
 *   .fit('crop')
 *   .format('webp')
 *   .quality(80)
 *   .url()
 *
 * // For next/image component
 * <Image
 *   src={urlForImage(heroImage).url()}
 *   width={1200}
 *   height={630}
 *   alt="Hero image"
 * />
 * ```
 */

const builder = imageUrlBuilder(sanityClient);

/**
 * Generate Sanity Image URL with builder API
 *
 * @param source - Sanity image object or asset reference
 * @returns Image URL builder instance with transformation methods
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Generate optimized image URL with default transformations
 *
 * @param source - Sanity image object
 * @param width - Desired width in pixels
 * @param height - Desired height in pixels (optional, maintains aspect ratio if omitted)
 * @param quality - Image quality 1-100 (default: 80)
 * @returns Optimized image URL string
 */
export function getOptimizedImageUrl(
  source: SanityImageSource,
  width: number,
  height?: number,
  quality: number = 80
): string {
  const imageBuilder = urlForImage(source)
    .width(width)
    .quality(quality)
    .auto("format");

  if (height) {
    imageBuilder.height(height).fit("crop");
  }

  return imageBuilder.url();
}

/**
 * Generate responsive image srcset for next/image
 *
 * @param source - Sanity image object
 * @param widths - Array of widths for srcset (default: [640, 750, 828, 1080, 1200, 1920])
 * @returns Object with src and srcset strings
 */
export function getResponsiveImageUrls(
  source: SanityImageSource,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920]
) {
  const src = urlForImage(source).width(1200).auto("format").url();

  const srcset = widths
    .map((width) => {
      const url = urlForImage(source).width(width).auto("format").url();
      return `${url} ${width}w`;
    })
    .join(", ");

  return { src, srcset };
}

/**
 * Extract image dimensions from Sanity image metadata
 *
 * @param source - Sanity image object with metadata
 * @returns Object with width and height, or undefined if not available
 */
export function getImageDimensions(source: any):
  | {
      width: number;
      height: number;
    }
  | undefined {
  if (!source?.asset?._ref) return undefined;

  // Parse dimensions from asset reference string
  // Format: image-{assetId}-{width}x{height}-{format}
  const dimensionMatch = source.asset._ref.match(/-(\d+)x(\d+)-/);

  if (dimensionMatch) {
    return {
      width: parseInt(dimensionMatch[1], 10),
      height: parseInt(dimensionMatch[2], 10),
    };
  }

  return undefined;
}

/**
 * Configuration helpers
 */
export const imageConfig = {
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  cdnUrl: `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/`,
} as const;
