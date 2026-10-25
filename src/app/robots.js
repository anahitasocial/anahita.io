import { site } from '../data/site';

export const dynamic = 'force-static';

// robots.txt: everything may be read, unless the site is hidden (staging).
export default function robots() {
  return site.hidden
    ? { rules: { userAgent: '*', disallow: '/' } }
    : { rules: { userAgent: '*', allow: '/' }, sitemap: `${site.url}/sitemap.xml` };
}
