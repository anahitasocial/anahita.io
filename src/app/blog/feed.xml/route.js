// The blog's Atom feed, written once at build time.
import { getPosts, toHtml } from '../../../lib/blog';
import { site } from '../../../data/site';

export const dynamic = 'force-static';

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const posts = getPosts();
  const entries = await Promise.all(
    posts.map(async (post) => {
      const url = `${site.url}/blog/${post.slug}/`;
      return `  <entry>
    <title>${escape(post.title)}</title>
    <link href="${url}"/>
    <id>${url}</id>
    <updated>${post.date}T00:00:00Z</updated>
    <author><name>${escape(post.author)}</name></author>
    <summary>${escape(post.summary)}</summary>
    <content type="html">${escape(await toHtml(post.content))}</content>
  </entry>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Anahita</title>
  <subtitle>News from Anahita.</subtitle>
  <link href="${site.url}/blog/"/>
  <link rel="self" href="${site.url}/blog/feed.xml"/>
  <id>${site.url}/blog/</id>
  <updated>${posts[0]?.date ?? '2026-10-24'}T00:00:00Z</updated>
${entries.join('\n')}
</feed>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
}
