import { defineField, defineType } from "sanity";

/**
 * Author Schema (Singleton)
 * Represents the portfolio owner or content creator.
 */
export const authorSchema = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
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
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(500),
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "github",
          title: "GitHub",
          type: "url",
          validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
          validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
        }),
        defineField({
          name: "twitter",
          title: "Twitter",
          type: "url",
          validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "profileImage",
    },
  },
});
