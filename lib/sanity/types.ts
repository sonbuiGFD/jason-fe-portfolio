/**
 * TypeScript Type Definitions for Sanity Content
 *
 * These types correspond to the Sanity CMS schemas and define the shape
 * of data returned from GROQ queries. Imported from contracts/api-types.ts
 */

export type {
  // Base types
  SanityDocument,
  SanityReference,
  SanitySlug,
  SanityImage,
  SanityBlock,
  SanityCodeBlock,
  SanityBlockContent,
  // Author types
  Author,
  AuthorPreview,
  // TechStack types
  TechStack,
  TechStackCategory,
  TechStackPreview,
  // Tag types
  Tag,
  TagPreview,
  // Content status
  ContentStatus,
  // WorkCaseStudy types
  WorkCaseStudy,
  WorkCaseStudyCard,
  WorkCaseStudyDetail,
  RoleType,
  // LabProject types
  LabProject,
  LabProjectCard,
  LabProjectDetail,
  // BlogPost types
  BlogPost,
  BlogPostCard,
  BlogPostDetail,
  // Search types
  SearchIndexItem,
  SearchIndex,
  SearchIndexFlat,
  SearchQuery,
  SearchResult,
  SearchResponse,
  // API response types
  PaginatedResponse,
  PaginationParams,
  WorkIndexResponse,
  LabsIndexResponse,
  BlogIndexResponse,
  RelatedPostsResponse,
  // Filter types
  WorkFilters,
  LabFilters,
  BlogFilters,
  // Utility types
  SlugString,
  OmitSanityMeta,
  ResolveReference,
  // Form types
  WorkCaseStudyFormData,
  LabProjectFormData,
  BlogPostFormData,
} from "../../specs/000-fe-portfolio/contracts/api-types";
