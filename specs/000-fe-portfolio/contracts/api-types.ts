/**
 * TypeScript Type Definitions for FE Engineer Portfolio
 *
 * These types correspond to the Sanity CMS schemas and define the shape
 * of data returned from GROQ queries.
 */

// ============================================================================
// Base Types
// ============================================================================

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityReference {
  _ref: string;
  _type: "reference";
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityImage {
  _type: "image";
  asset: SanityReference;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanityBlock {
  _type: "block";
  _key: string;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    _key: string;
    [key: string]: any;
  }>;
}

export interface SanityCodeBlock {
  _type: "code";
  _key: string;
  language?: string;
  code: string;
  filename?: string;
}

export type SanityBlockContent = Array<
  SanityBlock | SanityImage | SanityCodeBlock
>;

// ============================================================================
// Author Type
// ============================================================================

export interface Author extends SanityDocument {
  _type: "author";
  name: string;
  slug: SanitySlug;
  role: string;
  bio: string;
  profileImage: SanityImage;
  email?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Author projection for queries (common fields only)
export interface AuthorPreview {
  _id: string;
  name: string;
  role: string;
  profileImage: SanityImage;
}

// ============================================================================
// TechStack Type
// ============================================================================

export type TechStackCategory = "language" | "framework" | "tool" | "platform";

export interface TechStack extends SanityDocument {
  _type: "techStack";
  name: string;
  slug: SanitySlug;
  category: TechStackCategory;
  icon?: SanityImage;
  description?: string;
}

// TechStack projection for queries
export interface TechStackPreview {
  _id: string;
  name: string;
  slug: SanitySlug;
  category: TechStackCategory;
}

// ============================================================================
// Tag Type
// ============================================================================

export interface Tag extends SanityDocument {
  _type: "tag";
  name: string;
  slug: SanitySlug;
  description?: string;
}

// Tag projection for queries
export interface TagPreview {
  _id: string;
  name: string;
  slug: SanitySlug;
}

// ============================================================================
// Content Status Type
// ============================================================================

export type ContentStatus = "draft" | "review" | "published";

// ============================================================================
// WorkCaseStudy Type
// ============================================================================

export type RoleType = "Lead Engineer" | "Senior Engineer" | "Engineer";

export interface WorkCaseStudy extends SanityDocument {
  _type: "workCaseStudy";
  title: string;
  slug: SanitySlug;
  summary: string;
  heroImage: SanityImage;
  problemStatement: SanityBlockContent;
  approach: SanityBlockContent;
  architecture: SanityBlockContent;
  impact: SanityBlockContent;
  techStack: SanityReference[]; // References to TechStack
  roleType: RoleType;
  status: ContentStatus;
  author: SanityReference; // Reference to Author
  publishedAt?: string; // ISO 8601 datetime
}

// WorkCaseStudy projection for index pages
export interface WorkCaseStudyCard {
  _id: string;
  title: string;
  slug: SanitySlug;
  summary: string;
  heroImageUrl: string; // Resolved from Sanity Image CDN
  techStack: TechStackPreview[];
  roleType: RoleType;
  publishedAt: string;
}

// WorkCaseStudy projection for detail pages
export interface WorkCaseStudyDetail
  extends Omit<WorkCaseStudy, "techStack" | "author"> {
  techStack: TechStackPreview[]; // Resolved references
  author: AuthorPreview; // Resolved reference
}

// ============================================================================
// LabProject Type
// ============================================================================

export interface LabProject extends SanityDocument {
  _type: "labProject";
  title: string;
  slug: SanitySlug;
  description: string;
  thumbnail: SanityImage;
  experimentGoal: SanityBlockContent;
  keyLearnings: SanityBlockContent;
  techStack: SanityReference[]; // References to TechStack
  demoUrl?: string;
  repositoryUrl?: string;
  status: ContentStatus;
  author: SanityReference; // Reference to Author
  publishedAt?: string; // ISO 8601 datetime
}

// LabProject projection for index pages
export interface LabProjectCard {
  _id: string;
  title: string;
  slug: SanitySlug;
  description: string;
  thumbnailUrl: string; // Resolved from Sanity Image CDN
  techStack: TechStackPreview[];
  demoUrl?: string;
  repositoryUrl?: string;
  publishedAt: string;
}

// LabProject projection for detail pages
export interface LabProjectDetail
  extends Omit<LabProject, "techStack" | "author"> {
  techStack: TechStackPreview[]; // Resolved references
  author: AuthorPreview; // Resolved reference
}

// ============================================================================
// BlogPost Type
// ============================================================================

export interface BlogPost extends SanityDocument {
  _type: "blogPost";
  title: string;
  slug: SanitySlug;
  summary: string;
  heroImage: SanityImage;
  content: SanityBlockContent;
  tags: SanityReference[]; // References to Tag
  techStack?: SanityReference[]; // Optional references to TechStack
  readingTime?: number; // In minutes
  status: ContentStatus;
  author: SanityReference; // Reference to Author
  publishedAt?: string; // ISO 8601 datetime
  updatedAt?: string; // ISO 8601 datetime
}

// BlogPost projection for index pages
export interface BlogPostCard {
  _id: string;
  title: string;
  slug: SanitySlug;
  summary: string;
  heroImageUrl: string; // Resolved from Sanity Image CDN
  tags: TagPreview[];
  readingTime: number;
  publishedAt: string;
  author: AuthorPreview; // Resolved reference
}

// BlogPost projection for detail pages
export interface BlogPostDetail
  extends Omit<BlogPost, "tags" | "techStack" | "author"> {
  tags: TagPreview[]; // Resolved references
  techStack?: TechStackPreview[]; // Resolved references (optional)
  author: AuthorPreview; // Resolved reference
}

// ============================================================================
// Search Index Types
// ============================================================================

export interface SearchIndexItem {
  _id: string;
  type: "work" | "lab" | "blog";
  title: string;
  url: string;
  summary: string;
  tags: string[]; // Tech stack names or tag names
  content: string; // First 500 chars of content for search
}

export interface SearchIndex {
  workCaseStudies: SearchIndexItem[];
  labProjects: SearchIndexItem[];
  blogPosts: SearchIndexItem[];
}

// Flattened search index for client-side search
export type SearchIndexFlat = SearchIndexItem[];

// ============================================================================
// API Response Types
// ============================================================================

// Generic paginated response (for "Load More" pattern)
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
}

// Pagination query parameters
export interface PaginationParams {
  offset?: number; // Default: 0
  limit?: number; // Default: 20
}

// Work index API response (with pagination support)
export interface WorkIndexResponse {
  caseStudies: WorkCaseStudyCard[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  techStackFilters: TechStackPreview[];
  roleFilters: RoleType[];
}

// Labs index API response (with pagination support)
export interface LabsIndexResponse {
  projects: LabProjectCard[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  techStackFilters: TechStackPreview[];
}

// Blog index API response (with pagination support)
export interface BlogIndexResponse {
  posts: BlogPostCard[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  tagFilters: TagPreview[];
}

// Related posts response
export interface RelatedPostsResponse {
  posts: BlogPostCard[];
}

// ============================================================================
// Filter & Search Types
// ============================================================================

export interface WorkFilters {
  techStack?: string[]; // TechStack slugs
  roleType?: RoleType;
}

export interface LabFilters {
  techStack?: string[]; // TechStack slugs
}

export interface BlogFilters {
  tags?: string[]; // Tag slugs
  techStack?: string[]; // TechStack slugs (optional)
}

export interface SearchQuery {
  query: string;
  types?: Array<"work" | "lab" | "blog">; // Filter by content type
}

export interface SearchResult {
  item: SearchIndexItem;
  score: number; // Relevance score from search algorithm
}

export interface SearchResponse {
  results: SearchResult[];
  query: string;
  totalResults: number;
}

// ============================================================================
// Utility Types
// ============================================================================

// Extract slug string from SanitySlug
export type SlugString<T extends { slug: SanitySlug }> = T["slug"]["current"];

// Omit Sanity metadata fields
export type OmitSanityMeta<T> = Omit<
  T,
  "_id" | "_type" | "_createdAt" | "_updatedAt" | "_rev"
>;

// Resolve reference to actual type
export type ResolveReference<T, R> = Omit<
  T,
  keyof { [K in keyof T]: T[K] extends SanityReference ? K : never }[keyof T]
> &
  R;

// ============================================================================
// Form Types (for Sanity Studio)
// ============================================================================

export interface WorkCaseStudyFormData extends OmitSanityMeta<WorkCaseStudy> {
  _id?: string;
}

export interface LabProjectFormData extends OmitSanityMeta<LabProject> {
  _id?: string;
}

export interface BlogPostFormData extends OmitSanityMeta<BlogPost> {
  _id?: string;
}
