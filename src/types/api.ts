/**
 * TypeScript Type Definitions for FE Engineer Portfolio
 *
 * Generic types for content management, independent of any specific CMS.
 */

// ============================================================================
// Base Types
// ============================================================================

export interface Document {
  id: string;
  type: string;
  createdAt: string;
  updatedAt?: string;
  rev?: string;
}

export interface Reference {
  id: string;
}

export interface Slug {
  current: string;
}

export interface Image {
  type: "image";
  url: string;
  alt?: string;
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

export interface Block {
  type: "block";
  key: string;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
  children: Array<{
    type: "span";
    key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    type: string;
    key: string;
    [key: string]: unknown;
  }>;
}

export interface CodeBlock {
  type: "code";
  key: string;
  language?: string;
  code: string;
  filename?: string;
}

export type ContentBlock = Array<Block | Image | CodeBlock>;

// ============================================================================
// Author Type
// ============================================================================

export interface Author extends Document {
  type: "author";
  name: string;
  slug: Slug;
  role: string;
  bio: string;
  profileImage: Image;
  email?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Author projection for queries (common fields only)
export interface AuthorPreview {
  id: string;
  name: string;
  role: string;
  profileImage: Image;
}

// ============================================================================
// TechStack Type
// ============================================================================

export type TechStackCategory = "language" | "framework" | "tool" | "platform";

export interface TechStack extends Document {
  type: "techStack";
  name: string;
  slug: Slug;
  category: TechStackCategory;
  icon?: Image;
  description?: string;
}

// TechStack projection for queries
export interface TechStackPreview {
  id: string;
  name: string;
  slug: Slug;
  category: TechStackCategory;
}

// ============================================================================
// Tag Type
// ============================================================================

export interface Tag extends Document {
  type: "tag";
  name: string;
  slug: Slug;
  description?: string;
}

// Tag projection for queries
export interface TagPreview {
  id: string;
  name: string;
  slug: Slug;
}

// ============================================================================
// Content Status Type
// ============================================================================

export type ContentStatus = "draft" | "review" | "published";

// ============================================================================
// WorkCaseStudy Type
// ============================================================================

export type RoleType = "Lead Engineer" | "Senior Engineer" | "Engineer";

export interface WorkCaseStudy extends Document {
  type: "workCaseStudy";
  title: string;
  slug: Slug;
  summary: string;
  heroImage: Image;
  problemStatement: ContentBlock;
  approach: ContentBlock;
  architecture: ContentBlock;
  impact: ContentBlock;
  techStack: Reference[]; // References to TechStack
  roleType: RoleType;
  status: ContentStatus;
  author: Reference; // Reference to Author
  publishedAt?: string; // ISO 8601 datetime
}

// WorkCaseStudy projection for index pages
export interface WorkCaseStudyCard {
  id: string;
  title: string;
  slug: Slug;
  summary: string;
  heroImageUrl: string; // Resolved from Image CDN
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

export interface LabProject extends Document {
  type: "labProject";
  title: string;
  slug: Slug;
  description: string;
  thumbnail: Image;
  experimentGoal: ContentBlock;
  keyLearnings: ContentBlock;
  techStack: Reference[]; // References to TechStack
  demoUrl?: string;
  repositoryUrl?: string;
  status: ContentStatus;
  author: Reference; // Reference to Author
  publishedAt?: string; // ISO 8601 datetime
}

// LabProject projection for index pages
export interface LabProjectCard {
  id: string;
  title: string;
  slug: Slug;
  description: string;
  thumbnailUrl: string; // Resolved from Image CDN
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

export interface BlogPost extends Document {
  type: "blogPost";
  title: string;
  slug: Slug;
  summary: string;
  heroImage: Image;
  content: ContentBlock;
  tags: Reference[]; // References to Tag
  techStack?: Reference[]; // Optional references to TechStack
  readingTime?: number; // In minutes
  status: ContentStatus;
  author: Reference; // Reference to Author
  publishedAt?: string; // ISO 8601 datetime
  updatedAt?: string; // ISO 8601 datetime
}

// BlogPost projection for index pages
export interface BlogPostCard {
  id: string;
  title: string;
  slug: Slug;
  summary: string;
  heroImageUrl: string; // Resolved from Image CDN
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
  id: string;
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

// Extract slug string from Slug
export type SlugString<T extends { slug: Slug }> = T["slug"]["current"];

// Omit document metadata fields
export type OmitDocumentMeta<T> = Omit<
  T,
  "id" | "type" | "createdAt" | "updatedAt" | "rev"
>;

// Resolve reference to actual type
export type ResolveReference<T, R> = Omit<
  T,
  keyof { [K in keyof T]: T[K] extends Reference ? K : never }[keyof T]
> &
  R;

// ============================================================================
// Form Types
// ============================================================================

export interface WorkCaseStudyFormData extends OmitDocumentMeta<WorkCaseStudy> {
  id?: string;
}

export interface LabProjectFormData extends OmitDocumentMeta<LabProject> {
  id?: string;
}

export interface BlogPostFormData extends OmitDocumentMeta<BlogPost> {
  id?: string;
}
