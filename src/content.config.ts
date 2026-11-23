import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
 * Blog posts live in src/content/blog as Markdown, one file per post. The
 * file name is the web address: my-post.md is served at /blog/my-post/.
 *
 * See "Blog" in the README for how to add one.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      /** The headline on the page and in search results. */
      title: z.string(),
      /** One or two sentences for search results and the blog index. */
      description: z.string().max(165),
      pubDate: z.coerce.date(),
      /** Only set this when the content itself changes. */
      updatedDate: z.coerce.date().optional(),
      author: z.object({
        name: z.string(),
        role: z.string().optional(),
      }),
      /** Add once someone has checked the post, e.g. the Clinical Lead. */
      reviewedBy: z
        .object({
          name: z.string(),
          role: z.string(),
          date: z.coerce.date(),
        })
        .optional(),
      /** 16:9, no words in it. Shown on the post and the blog index. */
      cover: image(),
      coverAlt: z.string(),
      /** 16:9 with the headline on it, for link previews. Falls back to cover. */
      shareImage: image().optional(),
      sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
      /** Drafts show in `npm run dev` but are left out of the built site. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
