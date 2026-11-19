// The blog's posts: one Markdown file each in content/blog/, named
// YYYY-MM-DD-slug.md, with a title, date, summary and author at the top
// (start from content/blog/_template.md). The date is the moment the post is
// published, with its time and offset (2026-11-18T06:19:05-07:00): the feed
// carries it, and a channel that follows the feed dates its post by it. A
// date without a time stops the build. A post with `draft: true` shows
// under `yarn dev` only, never in the built site. Files whose names begin
// with an underscore, the template among them, are never posts.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { toHtml } from './markdown';

const folder = path.join(process.cwd(), 'content/blog');

function read(file) {
  const text = fs.readFileSync(path.join(folder, file), 'utf8');
  const { data, content } = matter(text);
  // The day as written, which is the day shown: read from the text, because
  // the parsed date is in UTC, and an evening post would show the next day.
  const written = text.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?/m);
  if (!written?.[2]) {
    throw new Error(`content/blog/${file}: date needs its time and offset, as 2026-11-18T06:19:05-07:00`);
  }
  const day = written[1];
  return {
    slug: file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''),
    title: data.title,
    date: day,
    // The moment it was published, in UTC (2026-11-18T13:19:05.000Z).
    published: new Date(data.date).toISOString(),
    summary: data.summary,
    author: data.author,
    // The card shown where the post is shared, 1200 by 630, in
    // public/images/blog/, and what it shows in words; the site's card when
    // there is none.
    image: data.image,
    imageAlt: data.imageAlt,
    // Its hashtags, without the #: written in the feed as categories, which a
    // channel following the feed adds to its post as hashtags, five at most.
    tags: data.tags ?? [],
    draft: Boolean(data.draft),
    content,
  };
}

export function getPosts() {
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map(read)
    .filter((post) => !post.draft || process.env.NODE_ENV === 'development')
    .sort((a, b) => b.published.localeCompare(a.published));
}

export function getPost(slug) {
  return getPosts().find((post) => post.slug === slug);
}

export { toHtml };

export function formatDate(date) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
