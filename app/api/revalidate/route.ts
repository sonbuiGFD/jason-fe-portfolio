import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * ISR Revalidation API Route
 *
 * Handles webhook-triggered revalidation of static pages when content is published in Sanity CMS.
 * Supports both tag-based and path-based revalidation for granular cache invalidation.
 *
 * Usage:
 * POST /api/revalidate?secret=<REVALIDATION_SECRET>&type=<content_type>&slug=<content_slug>
 */

/**
 * POST /api/revalidate
 *
 * Revalidates cached pages based on content type and slug.
 * Called by Sanity webhooks when content is published/updated.
 */
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  // Verify revalidation secret
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  // Validate required parameters
  if (!type) {
    return NextResponse.json(
      { error: "Missing type parameter" },
      { status: 400 }
    );
  }

  try {
    const revalidatedPaths: string[] = [];
    const revalidatedTags: string[] = [];

    // Revalidate based on content type
    switch (type) {
      case "workCaseStudy":
        // Revalidate work index page
        await revalidatePath("/work");
        revalidatedPaths.push("/work");

        // Revalidate specific case study page if slug provided
        if (slug) {
          await revalidatePath(`/work/${slug}`);
          revalidatedPaths.push(`/work/${slug}`);
        }

        // Tags for logging (revalidateTag not used in this implementation)
        revalidatedTags.push("work", "search-index");
        break;

      case "labProject":
        // Revalidate labs index page
        await revalidatePath("/labs");
        revalidatedPaths.push("/labs");

        // Revalidate specific lab project page if slug provided
        if (slug) {
          await revalidatePath(`/labs/${slug}`);
          revalidatedPaths.push(`/labs/${slug}`);
        }

        // Tags for logging (revalidateTag not used in this implementation)
        revalidatedTags.push("labs", "search-index");
        break;

      case "blogPost":
        // Revalidate blog index page
        await revalidatePath("/blog");
        revalidatedPaths.push("/blog");

        // Revalidate specific blog post page if slug provided
        if (slug) {
          await revalidatePath(`/blog/${slug}`);
          revalidatedPaths.push(`/blog/${slug}`);
        }

        // Tags for logging (revalidateTag not used in this implementation)
        revalidatedTags.push("blog", "search-index");
        break;

      case "author":
        // Revalidate all pages that display author info
        await revalidatePath("/about");
        await revalidatePath("/blog");
        revalidatedPaths.push("/about", "/blog");

        // Tags for logging (revalidateTag not used in this implementation)
        revalidatedTags.push("author");
        break;

      case "techStack":
      case "tag":
        // Revalidate all content pages since filters may change
        await revalidatePath("/work");
        await revalidatePath("/labs");
        await revalidatePath("/blog");
        revalidatedPaths.push("/work", "/labs", "/blog");
        revalidatedTags.push("search-index");
        break;

      default:
        return NextResponse.json(
          { error: `Unknown content type: ${type}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      message: "Revalidation successful",
      type,
      slug: slug || null,
      revalidatedPaths,
      revalidatedTags,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        error: "Revalidation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/revalidate (for testing)
 *
 * Returns API information and status for testing revalidation endpoint.
 */
export async function GET() {
  return NextResponse.json({
    message: "ISR Revalidation API",
    usage: "POST /api/revalidate?secret=<secret>&type=<type>&slug=<slug>",
    supportedTypes: [
      "workCaseStudy",
      "labProject",
      "blogPost",
      "author",
      "techStack",
      "tag",
    ],
    environment: {
      hasSecret: !!process.env.REVALIDATION_SECRET,
    },
  });
}
