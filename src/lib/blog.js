// The blog's posts: one Markdown file each in content/blog/, named
// YYYY-MM-DD-slug.md, with a title, date, summary and author at the top
// (start from content/blog/_template.md). A post with `draft: true` shows
// under `yarn dev` only, never in the built site. Files whose names begin
// with an underscore, the template among them, are never posts.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { toHtml } from './markdown';

const folder = path.join(process.cwd(), 'content/blog');

function read(file) {
  const { data, content } = matter(fs.readFileSync(path.join(folder, file), 'utf8'));
  return {
    slug: file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''),
    title: data.title,
    date: new Date(data.date).toISOString().slice(0, 10),
    summary: data.summary,
    author: data.author,
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
    .sort((a, b) => b.date.localeCompare(a.date));
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
