// The blog's posts: one Markdown file each in content/blog/, named
// YYYY-MM-DD-slug.md, with a title, date, summary and author at the top.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

const folder = path.join(process.cwd(), 'content/blog');

function read(file) {
  const { data, content } = matter(fs.readFileSync(path.join(folder, file), 'utf8'));
  return {
    slug: file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''),
    title: data.title,
    date: new Date(data.date).toISOString().slice(0, 10),
    summary: data.summary,
    author: data.author,
    content,
  };
}

export function getPosts() {
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith('.md'))
    .map(read)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug) {
  return getPosts().find((post) => post.slug === slug);
}

export async function toHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

export function formatDate(date) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
