// The site's Atom feed, written once at build time, at the site's root
// (/feed.xml), where feed readers look; every page names it in its <head>.
// The blog's posts and the release days together, newest first: the
// Anahita channel on banu.io reads it, and posts each entry once
// (lib/releases.js says when a day is added).
import { getPosts, toHtml } from '../../lib/blog';
import { getReleaseDays, getReleaseHtml, releaseTags } from '../../lib/releases';
import { site } from '../../data/site';

export const dynamic = 'force-static';

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function entry({ title, url, published, author, summary, tags, html }) {
  return `  <entry>
    <title>${escape(title)}</title>
    <link href="${url}"/>
    <id>${url}</id>
    <published>${published}</published>
    <updated>${published}</updated>
    <author><name>${escape(author)}</name></author>
    <summary>${escape(summary)}</summary>
${tags.map((tag) => `    <category term="${escape(tag)}"/>\n`).join('')}    <content type="html">${escape(html)}</content>
  </entry>`;
}

export async function GET() {
  const posts = await Promise.all(
    getPosts().map(async (post) => ({
      title: post.title,
      url: `${site.url}/blog/${post.slug}/`,
      published: post.published,
      author: post.author,
      summary: post.summary,
      tags: post.tags,
      html: await toHtml(post.content),
    })),
  );
  const days = await Promise.all(
    getReleaseDays().map(async (day) => ({
      title: day.title,
      url: `${site.url}/releases/${day.date}/`,
      published: day.published,
      author: 'Anahita',
      summary: day.summary,
      tags: releaseTags,
      html: await getReleaseHtml(day),
    })),
  );
  const all = [...posts, ...days].sort((a, b) => (a.published < b.published ? 1 : -1));

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Anahita</title>
  <subtitle>News and releases from Anahita.</subtitle>
  <link href="${site.url}/blog/"/>
  <link rel="self" href="${site.url}/feed.xml"/>
  <id>${site.url}/blog/</id>
  <updated>${all[0]?.published ?? '2026-10-24T00:00:00Z'}</updated>
${all.map(entry).join('\n')}
</feed>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
}
