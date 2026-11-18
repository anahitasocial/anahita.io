// The blog's posts: one Markdown file each in content/blog/, named
// YYYY-MM-DD-slug.md, with a title, date, summary and author at the top
// (start from content/blog/_template.md). The feed carries the moment each
// post was published, and a channel that follows the feed dates its post by
// it: a time written in the date (2026-11-18T06:19:00-07:00), or else the
// time of the first commit in which the post is not a draft, or else, for a
// post no commit has published yet, midnight UTC of its day. A post with `draft: true` shows
// under `yarn dev` only, never in the built site. Files whose names begin
// with an underscore, the template among them, are never posts.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { toHtml } from './markdown';

const folder = path.join(process.cwd(), 'content/blog');

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

// The time of the first commit in which the post is there and not a draft,
// or null. It needs the whole history: the build's checkout fetches it
// (fetch-depth: 0 in .github/workflows/pages.yml).
const publishedByCommit = new Map();
function firstPublished(file) {
  if (publishedByCommit.has(file)) return publishedByCommit.get(file);
  let time = null;
  try {
    const where = `content/blog/${file}`;
    const commits = git('log', '--reverse', '--format=%H %aI', '--', where).trim().split('\n').filter(Boolean);
    for (const line of commits) {
      const [hash, at] = line.split(' ');
      let text;
      try {
        text = git('show', `${hash}:${where}`);
      } catch {
        continue; // deleted in this commit
      }
      if (!/^draft:\s*true\s*$/m.test(text)) {
        time = new Date(at).toISOString();
        break;
      }
    }
  } catch {
    // No git, or no history: the day's midnight.
  }
  publishedByCommit.set(file, time);
  return time;
}

function read(file) {
  const text = fs.readFileSync(path.join(folder, file), 'utf8');
  const { data, content } = matter(text);
  // The day as written, which is the day shown: read from the text, because
  // the parsed date is in UTC, and an evening post would show the next day.
  const day = text.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})/m)[1];
  return {
    slug: file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''),
    title: data.title,
    date: day,
    // The moment it was published, in UTC (2026-11-18T13:19:05.000Z).
    published: /^date:\s*['"]?\d{4}-\d{2}-\d{2}T/m.test(text)
      ? new Date(data.date).toISOString()
      : (firstPublished(file) ?? `${day}T00:00:00.000Z`),
    summary: data.summary,
    author: data.author,
    // The card shown where the post is shared, 1200 by 630, in
    // public/images/blog/, and what it shows in words; the site's card when
    // there is none.
    image: data.image,
    imageAlt: data.imageAlt,
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
