import { defineField, defineType } from "sanity";

/**
 * WorkCaseStudy Schema
 * Represents a detailed case study of professional work.
 */
export const workCaseStudySchema = defineType({
  name: "workCaseStudy",
  title: "Work Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(300),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "problemStatement",
      title: "Problem Statement",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "architecture",
      title: "Architecture",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "impact",
      title: "Impact",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "reference", to: [{ type: "techStack" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "roleType",
      title: "Role Type",
      type: "string",
      options: {
        list: [
          { title: "Lead Engineer", value: "Lead Engineer" },
          { title: "Senior Engineer", value: "Senior Engineer" },
          { title: "Engineer", value: "Engineer" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Review", value: "review" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
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
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "heroImage",
    },
  },
});
