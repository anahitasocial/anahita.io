// Every page of the docs as Markdown, cut into sections, in one file at
// /docs/index.json, written once at build time. It is what anahita-mcp, the
// MCP server people run on their own computers, reads and searches; the API
// reference it reads is /api/anahita.json.
import { site } from '../../../data/site';
import { getDocSections, getPages, getSources } from '../../../lib/docs';

export const dynamic = 'force-static';

export function GET() {
  const sources = getSources().map(({ key, title, side, repo }) => ({ key, title, side, repo }));
  const pages = getSources().flatMap(({ key }) =>
    [{ slug: 'README', group: null }, ...getPages(key)].map(({ slug, group }) => {
      const { title, sections } = getDocSections(key, slug);
      const url = slug === 'README' ? `${site.url}/docs/${key}/` : `${site.url}/docs/${key}/${slug}/`;
      return { source: key, slug, title, group, url, sections };
    }),
  );
  const index = { version: 1, site: site.url, api: `${site.url}/api/anahita.json`, sources, pages };
  return new Response(JSON.stringify(index), { headers: { 'content-type': 'application/json; charset=utf-8' } });
}
