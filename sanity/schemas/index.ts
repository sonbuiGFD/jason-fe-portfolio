/**
 * Sanity Schema Index
 * Exports all schema types for configuration in sanity.config.ts
 */

import { authorSchema } from "./author";
import { techStackSchema } from "./techStack";
import { tagSchema } from "./tag";
import { workCaseStudySchema } from "./workCaseStudy";
import { labProjectSchema } from "./labProject";
import { blogPostSchema } from "./blogPost";

export const schemaTypes = [
  // Taxonomy types (referenced by content types)
  authorSchema,
  techStackSchema,
  tagSchema,

  // Content types
  workCaseStudySchema,
  labProjectSchema,
  blogPostSchema,
];
