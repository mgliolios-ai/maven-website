import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts are included in dev only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** "1 December 2026". Dates in front matter are plain days, so read them as UTC. */
export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

/** Whole minutes to read, at an easy 200 words a minute. */
export const readingMinutes = (markdown = '') =>
  Math.max(1, Math.round(markdown.split(/\s+/).filter(Boolean).length / 200));
