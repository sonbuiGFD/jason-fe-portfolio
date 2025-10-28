/**
 * Sanity Schema Contract
 *
 * This file defines the Sanity CMS schema for the portfolio website.
 * It serves as a contract for content structure and validation rules.
 *
 * Implementation note: This schema should be placed in the Sanity Studio
 * project under `sanity/schemas/` directory.
 */

import { defineField, defineType } from "sanity";

// ============================================================================
// Author Schema (Singleton)
// ============================================================================

export const authorSchema = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: "role",
      title: "Role/Title",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
      description: "Professional bio (200-500 words)",
    }),
    defineField({
      name: "profilePhoto",
      title: "Profile Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "Square aspect ratio, minimum 400x400px",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        {
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
          validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
        },
        {
          name: "github",
          title: "GitHub URL",
          type: "url",
          validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
        },
        {
          name: "twitter",
          title: "Twitter URL",
          type: "url",
          validation: (Rule) => Rule.uri({ scheme: ["https"] }),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL",
      type: "url",
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ["https"] })
          .custom((url) => {
            if (!url) return true;
            return url.endsWith(".pdf") || "URL must point to a PDF file";
          }),
      description: "URL to hosted PDF resume",
    }),
  ],
});

// ============================================================================
// Tag Schema
// ============================================================================

export const tagSchema = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(30),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.min(50).max(200),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Technology", value: "technology" },
          { title: "Topic", value: "topic" },
          { title: "Skill", value: "skill" },
        ],
      },
    }),
  ],
});

// ============================================================================
// TechStack Schema
// ============================================================================

export const techStackSchema = defineType({
  name: "techStack",
  title: "Tech Stack",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Language", value: "language" },
          { title: "Framework", value: "framework" },
          { title: "Tool", value: "tool" },
          { title: "Platform", value: "platform" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "SVG preferred, square aspect ratio",
    }),
  ],
});

// ============================================================================
// WorkCaseStudy Schema
// ============================================================================

export const workCaseStudySchema = defineType({
  name: "workCaseStudy",
  title: "Work Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        // Custom slug generation with numeric suffix for duplicates
        slugify: (input) => {
          const base = input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
          return base;
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
      description: 'e.g., "Lead Frontend Engineer", "Senior IC"',
    }),
    defineField({
      name: "publishStatus",
      title: "Publish Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
      description: "Aspect ratio 16:9, minimum 1200x675px",
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
      description: "Describe the problem (100-300 words)",
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "code",
          options: {
            language: "typescript",
            languageAlternatives: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "CSS", value: "css" },
              { title: "HTML", value: "html" },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
      description: "Describe technical solution (300-800 words)",
    }),
    defineField({
      name: "impact",
      title: "Impact",
      type: "object",
      fields: [
        {
          name: "metrics",
          title: "Metrics",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "label",
                  type: "string",
                  title: "Label",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "before",
                  type: "string",
                  title: "Before",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "after",
                  type: "string",
                  title: "After",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "improvement",
                  type: "string",
                  title: "Improvement",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
          validation: (Rule) => Rule.required().min(1).max(5),
        },
        {
          name: "narrative",
          title: "Narrative",
          type: "array",
          of: [{ type: "block" }],
          validation: (Rule) => Rule.required(),
          description: "Summarize impact (100-200 words)",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "reference", to: [{ type: "techStack" }] }],
      validation: (Rule) => Rule.required().min(3).max(10),
    }),
    defineField({
      name: "roleDetails",
      title: "Role & Responsibilities",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
      description: "Describe your role (100-300 words)",
    }),
    defineField({
      name: "visuals",
      title: "Visuals",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(8),
      description: "Screenshots, diagrams (0-8 items)",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (Rule) => Rule.required().min(2).max(8),
    }),
    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "labProject" }] }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      title: "title",
      company: "company",
      media: "heroImage",
      status: "publishStatus",
    },
    prepare({ title, company, media, status }) {
      return {
        title,
        subtitle: `${company} - ${status}`,
        media,
      };
    },
  },
});

// ============================================================================
// LabProject Schema
// ============================================================================

export const labProjectSchema = defineType({
  name: "labProject",
  title: "Lab Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, ""),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishStatus",
      title: "Publish Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
      description: "Aspect ratio 16:9, minimum 800x450px",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
      description: "What was built (100-300 words)",
    }),
    defineField({
      name: "keyLearnings",
      title: "Key Learnings",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
      description: "What was learned (100-300 words)",
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "reference", to: [{ type: "techStack" }] }],
      validation: (Rule) => Rule.required().min(2).max(8),
    }),
    defineField({
      name: "liveDemoUrl",
      title: "Live Demo URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "sourceCodeUrl",
      title: "Source Code URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "maintenanceStatus",
      title: "Maintenance Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "active",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (Rule) => Rule.required().min(2).max(8),
    }),
    defineField({
      name: "relatedBlogPosts",
      title: "Related Blog Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      status: "publishStatus",
      maintenance: "maintenanceStatus",
    },
    prepare({ title, media, status, maintenance }) {
      return {
        title,
        subtitle: `${status} - ${maintenance}`,
        media,
      };
    },
  },
});

// ============================================================================
// BlogPost Schema
// ============================================================================

export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, ""),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishStatus",
      title: "Publish Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          validation: (Rule) => Rule.required(),
        },
      ],
      description: "Optional, aspect ratio 16:9, minimum 1200x675px",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "string",
      validation: (Rule) => Rule.required().min(100).max(200),
      description: "Plain text summary (100-200 characters)",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "code",
          options: {
            language: "typescript",
            languageAlternatives: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "CSS", value: "css" },
              { title: "HTML", value: "html" },
              { title: "Python", value: "python" },
              { title: "Bash", value: "bash" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
      description: "500-5000 words",
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      validation: (Rule) => Rule.required().positive().integer(),
      description: "Calculated from word count (word count / 225)",
      // Note: This should be auto-calculated in Sanity Studio or on save
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "heroImage",
      status: "publishStatus",
    },
    prepare({ title, author, media, status }) {
      return {
        title,
        subtitle: `${author} - ${status}`,
        media,
      };
    },
  },
});

// ============================================================================
// Schema Export
// ============================================================================

export const schemaTypes = [
  authorSchema,
  tagSchema,
  techStackSchema,
  workCaseStudySchema,
  labProjectSchema,
  blogPostSchema,
];
