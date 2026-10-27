import { site } from '../data/site';
import { getPosts } from '../lib/blog';
import { getApi, getServices } from '../lib/api';
import { getPages, getSources } from '../lib/docs';

export const dynamic = 'force-static';

// sitemap.xml: every page of the site, for search engines. robots.txt names it
// once the site is public (site.hidden off).
export default function sitemap() {
  const page = (path, priority = 0.5) => ({ url: `${site.url}${path}`, priority });
  return [
    page('/', 1),
    page('/products/', 0.8),
    page('/products/services/', 0.6),
    page('/docs/', 0.8),
    page('/faq/', 0.7),
    page('/blog/', 0.6),
    page('/about/', 0.6),
    ...(site.donations ? [page('/donate/', 0.4)] : []),
    ...getPosts().map((post) => ({ ...page(`/blog/${post.slug}/`, 0.5), lastModified: post.date })),
    ...getSources().flatMap(({ key }) => [
      page(`/docs/${key}/`, 0.6),
      ...getPages(key).map(({ slug }) => page(`/docs/${key}/${slug}/`, 0.5)),
    ]),
    ...(getApi()
      ? [page('/api/', 0.7), ...getServices().map(({ slug }) => page(`/api/${slug}/`, 0.5)), page('/api/shapes/', 0.4)]
      : []),
  ];
}
