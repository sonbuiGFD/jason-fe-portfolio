import { groq } from "next-sanity";

/**
 * GROQ Query Library
 *
 * Centralized GROQ queries for fetching content from Sanity CMS.
 * All queries filter by status == "published" to exclude draft/review content.
 *
 * Based on data-model.md access patterns.
 */

// ============================================================================
// Common Projections (Reusable)
// ============================================================================

const authorProjection = groq`
  _id,
  name,
  role,
  profileImage
`;

const techStackProjection = groq`
  _id,
  name,
  slug,
  category
`;

const tagProjection = groq`
  _id,
  name,
  slug
`;

// ============================================================================
// Author Queries
// ============================================================================

/**
 * Fetch author profile (singleton)
 */
export const getAuthorQuery = groq`
  *[_type == "author"][0] {
    _id,
    name,
    slug,
    role,
    bio,
    profileImage,
    email,
    socialLinks
  }
`;

// ============================================================================
// Work Case Study Queries
// ============================================================================

/**
 * Fetch all published case studies (for index page)
 * With pagination support
 */
export const getAllCaseStudiesQuery = groq`
  *[_type == "workCaseStudy" && status == "published"] | order(publishedAt desc) [$offset...$offset + $limit] {
    _id,
    title,
    slug,
    summary,
    "heroImageUrl": heroImage.asset->url,
    techStack[]->{
      ${techStackProjection}
    },
    roleType,
    publishedAt
  }
`;

/**
 * Get total count of published case studies
 */
export const getCaseStudiesCountQuery = groq`
  count(*[_type == "workCaseStudy" && status == "published"])
`;

/**
 * Fetch single case study by slug (for detail page)
 */
export const getCaseStudyBySlugQuery = groq`
  *[_type == "workCaseStudy" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    summary,
    heroImage,
    problemStatement,
    approach,
    architecture,
    impact,
    techStack[]->{
      ${techStackProjection}
    },
    roleType,
    author->{
      ${authorProjection}
    },
    publishedAt
  }
`;

/**
 * Get all published case study slugs (for static params generation)
 */
export const getAllCaseStudySlugsQuery = groq`
  *[_type == "workCaseStudy" && status == "published"].slug.current
`;

/**
 * Fetch case studies by tech stack filter
 */
export const getCaseStudiesByTechStackQuery = groq`
  *[
    _type == "workCaseStudy" && 
    status == "published" &&
    $techStackSlug in techStack[]->slug.current
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    summary,
    "heroImageUrl": heroImage.asset->url,
    techStack[]->{
      ${techStackProjection}
    },
    roleType,
    publishedAt
  }
`;

// ============================================================================
// Lab Project Queries
// ============================================================================

/**
 * Fetch all published lab projects (for index page)
 * With pagination support
 */
export const getAllLabProjectsQuery = groq`
  *[_type == "labProject" && status == "published"] | order(publishedAt desc) [$offset...$offset + $limit] {
    _id,
    title,
    slug,
    description,
    "thumbnailUrl": thumbnail.asset->url,
    techStack[]->{
      ${techStackProjection}
    },
    demoUrl,
    repositoryUrl,
    publishedAt
  }
`;

/**
 * Get total count of published lab projects
 */
export const getLabProjectsCountQuery = groq`
  count(*[_type == "labProject" && status == "published"])
`;

/**
 * Fetch single lab project by slug (for detail page)
 */
export const getLabProjectBySlugQuery = groq`
  *[_type == "labProject" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    description,
    thumbnail,
    experimentGoal,
    keyLearnings,
    techStack[]->{
      ${techStackProjection}
    },
    demoUrl,
    repositoryUrl,
    author->{
      ${authorProjection}
    },
    publishedAt
  }
`;

/**
 * Get all published lab project slugs (for static params generation)
 */
export const getAllLabProjectSlugsQuery = groq`
  *[_type == "labProject" && status == "published"].slug.current
`;

/**
 * Fetch lab projects by tech stack filter
 */
export const getLabProjectsByTechStackQuery = groq`
  *[
    _type == "labProject" && 
    status == "published" &&
    $techStackSlug in techStack[]->slug.current
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    "thumbnailUrl": thumbnail.asset->url,
    techStack[]->{
      ${techStackProjection}
    },
    demoUrl,
    repositoryUrl,
    publishedAt
  }
`;

// ============================================================================
// Blog Post Queries
// ============================================================================

/**
 * Fetch all published blog posts (for index page)
 * With pagination support
 */
export const getAllBlogPostsQuery = groq`
  *[_type == "blogPost" && status == "published"] | order(publishedAt desc) [$offset...$offset + $limit] {
    _id,
    title,
    slug,
    summary,
    "heroImageUrl": heroImage.asset->url,
    tags[]->{
      ${tagProjection}
    },
    readingTime,
    publishedAt,
    author->{
      ${authorProjection}
    }
  }
`;

/**
 * Get total count of published blog posts
 */
export const getBlogPostsCountQuery = groq`
  count(*[_type == "blogPost" && status == "published"])
`;

/**
 * Fetch single blog post by slug (for detail page)
 */
export const getBlogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    summary,
    heroImage,
    content,
    tags[]->{
      ${tagProjection}
    },
    techStack[]->{
      ${techStackProjection}
    },
    readingTime,
    author->{
      ${authorProjection}
    },
    publishedAt,
    updatedAt
  }
`;

/**
 * Get all published blog post slugs (for static params generation)
 */
export const getAllBlogPostSlugsQuery = groq`
  *[_type == "blogPost" && status == "published"].slug.current
`;

/**
 * Fetch blog posts by tag filter
 */
export const getBlogPostsByTagQuery = groq`
  *[
    _type == "blogPost" && 
    status == "published" &&
    $tagSlug in tags[]->slug.current
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    summary,
    "heroImageUrl": heroImage.asset->url,
    tags[]->{
      ${tagProjection}
    },
    readingTime,
    publishedAt,
    author->{
      ${authorProjection}
    }
  }
`;

/**
 * Fetch related blog posts by shared tags
 * Excludes current post, returns top 3 matches
 */
export const getRelatedBlogPostsQuery = groq`
  *[
    _type == "blogPost" &&
    status == "published" &&
    _id != $currentPostId &&
    count((tags[]->slug.current)[@ in $currentPostTags]) > 0
  ] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    summary,
    "heroImageUrl": heroImage.asset->url,
    publishedAt
  }
`;

// ============================================================================
// Taxonomy Queries
// ============================================================================

/**
 * Fetch all tech stacks (for filter options)
 */
export const getAllTechStacksQuery = groq`
  *[_type == "techStack"] | order(name asc) {
    ${techStackProjection}
  }
`;

/**
 * Fetch all tags (for filter options)
 */
export const getAllTagsQuery = groq`
  *[_type == "tag"] | order(name asc) {
    ${tagProjection}
  }
`;

// ============================================================================
// Search Index Query (for build-time search index generation)
// ============================================================================

/**
 * Build complete search index with all published content
 * Used at build time to generate client-side search index
 */
export const buildSearchIndexQuery = groq`
  {
    "workCaseStudies": *[_type == "workCaseStudy" && status == "published"] {
      _id,
      "type": "work",
      title,
      "url": "/work/" + slug.current,
      summary,
      "tags": techStack[]->name,
      "content": pt::text(problemStatement) + " " + pt::text(approach)
    },
    "labProjects": *[_type == "labProject" && status == "published"] {
      _id,
      "type": "lab",
      title,
      "url": "/labs/" + slug.current,
      "summary": description,
      "tags": techStack[]->name,
      "content": pt::text(experimentGoal) + " " + pt::text(keyLearnings)
    },
    "blogPosts": *[_type == "blogPost" && status == "published"] {
      _id,
      "type": "blog",
      title,
      "url": "/blog/" + slug.current,
      summary,
      "tags": tags[]->name,
      "content": pt::text(content)[0...500]
    }
  }
`;

// ============================================================================
// Sitemap Query (for dynamic sitemap generation)
// ============================================================================

/**
 * Fetch all published content URLs for sitemap.xml
 */
export const getSitemapDataQuery = groq`
  {
    "caseStudies": *[_type == "workCaseStudy" && status == "published"] {
      "slug": slug.current,
      "updatedAt": _updatedAt
    },
    "labProjects": *[_type == "labProject" && status == "published"] {
      "slug": slug.current,
      "updatedAt": _updatedAt
    },
    "blogPosts": *[_type == "blogPost" && status == "published"] {
      "slug": slug.current,
      "updatedAt": _updatedAt
    }
  }
`;

// ============================================================================
// RSS Feed Query (for blog RSS generation)
// ============================================================================

/**
 * Fetch latest 20 blog posts for RSS feed
 */
export const getRssFeedQuery = groq`
  *[_type == "blogPost" && status == "published"] | order(publishedAt desc) [0...20] {
    _id,
    title,
    slug,
    summary,
    content,
    publishedAt,
    updatedAt,
    author->{
      name
    }
  }
`;
