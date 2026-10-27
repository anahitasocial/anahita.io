// Reads the docs that scripts/fetch-docs.mjs copied into .docs-src/<key>/,
// and turns them into pages of this site: links between docs become links
// within the site, links to code go to GitHub, images are served from
// public/docs-assets/.
import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import { codeTabs, outboundLinks } from './markdown';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { docSources } from '../data/docSources.mjs';
import { apiHref } from './api';

const folder = path.join(process.cwd(), '.docs-src');

// The sources that were fetched, in the order of docSources.
export function getSources() {
  return docSources
    .filter(({ key }) => fs.existsSync(path.join(folder, key, 'README.md')))
    .map(({ key, title, side, repo, branch, aliases }) => ({ key, title, side, repo, branch, aliases, ...readMeta(key) }));
}

export function getSource(key) {
  return getSources().find((source) => source.key === key);
}

function readMeta(key) {
  const file = path.join(folder, key, '.meta.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
}

function readFile(key, slug) {
  const file = path.join(folder, key, `${slug}.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
}

// The groups of a source's pages, from its README's Contents: each
// `### Group` heading there, and the pages its list links to, in order. A
// README whose Contents has no such headings has no groups.
function readGroups(key) {
  const readme = readFile(key, 'README') || '';
  const contents = readme.match(/^## Contents\n([\s\S]*?)(?=^## |(?![\s\S]))/m)?.[1] || '';
  const groups = [];
  for (const line of contents.split('\n')) {
    const heading = line.match(/^### (.+)$/);
    if (heading) groups.push({ name: heading[1].trim(), slugs: [] });
    const entry = line.match(/^\d+\. \[[^\]]+\]\(([\w-]+)\.md\)/);
    if (entry && groups.length) groups[groups.length - 1].slugs.push(entry[1]);
  }
  return groups;
}

// Every page of a source: in its groups' order where its README has groups,
// else in the order the README first links to them (the ways in, then its
// contents); then any page the README leaves out. Each is called by its own
// first heading, and carries its group's name, or null.
export function getPages(key) {
  const readme = withoutSections(readFile(key, 'README'), ['Plans']);
  const slugs = [...readme.matchAll(/\]\(([\w-]+)\.md(?:#[^)]*)?\)/g)].map(([, slug]) => slug);
  const files = fs
    .readdirSync(path.join(folder, key))
    .filter((file) => file.endsWith('.md') && file !== 'README.md')
    .map((file) => file.slice(0, -3));
  const groups = readGroups(key);
  const groupOf = new Map(groups.flatMap(({ name, slugs: inGroup }) => inGroup.map((slug) => [slug, name])));
  const grouped = groups.flatMap(({ slugs: inGroup }) => inGroup);
  const order = [...new Set([...grouped, ...slugs, ...files])].filter((slug) => files.includes(slug));
  return order.map((slug) => ({ slug, title: readTitle(readFile(key, slug)) || slug, group: groupOf.get(slug) || null }));
}

// A source's groups with their pages, for its overview: [] where its README
// has none.
export function getGroups(key) {
  const pages = getPages(key);
  return readGroups(key).map(({ name }) => ({ name, pages: pages.filter((page) => page.group === name) }));
}

// The pages before and after one, in the order of the docs' menu: the
// Overview, then getPages. Either is null at an end.
export function getNeighbours(key, slug) {
  const source = getSource(key);
  const all = [
    { href: `/docs/${key}/`, title: 'Overview', slug: 'README' },
    ...getPages(key).map((page) => ({ href: `/docs/${key}/${page.slug}/`, title: page.title, slug: page.slug })),
  ];
  const at = all.findIndex((page) => page.slug === slug);
  if (!source || at === -1) return { previous: null, next: null };
  const pick = (page) => (page ? { href: page.href, title: page.title } : null);
  return { previous: pick(all[at - 1]), next: pick(all[at + 1]) };
}

// What a README holds for its own repository and not for this site: its
// contents list, which is the sidebar here, and its plans, which are work
// notes and stay in the repository with docs/plans/.
function withoutSections(markdown, names = ['Contents', 'Plans']) {
  const heading = new RegExp(`^## (${names.join('|')})\\n[\\s\\S]*?(?=^## |(?![\\s\\S]))`, 'gm');
  return markdown.replace(heading, '');
}

function readTitle(markdown) {
  return markdown.match(/^#\s+(.+)$/m)?.[1].trim();
}

// The page's own title comes from its first heading, and the trail of links
// under it ("[Documentation](README.md) › …") gives way to the site's own.
function split(markdown) {
  const title = readTitle(markdown);
  const body = markdown
    .replace(/^#\s+.+$/m, '')
    .replace(/^\[Documentation\]\(README\.md\).*$/m, '');
  return { title, body };
}

export async function getDoc(key, slug) {
  const markdown = readFile(key, slug);
  if (markdown === null) return null;
  const source = getSource(key);
  // A page's own contents list repeats "On this page" beside it.
  const { title, body } = split(withoutSections(markdown, slug === 'README' ? undefined : ['Contents']));
  const headings = [];
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeHighlight, { detect: false })
      .use(codeTabs)
      .use(rewriteLinks, { source, slug })
      .use(outboundLinks)
      .use(collectHeadings, { headings })
      .use(rehypeStringify)
      .process(body),
  );
  return { title, html, headings, source };
}

// Where a link in the docs should go on this site.
export function resolveHref(href, { source, slug }) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:')) return href;

  const github = href.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/blob\/[^/]+\/docs\/([\w-]+)\.md(#.*)?$/);
  if (github) {
    const target = getSources().find((s) => s.repo === github[1] || s.aliases.includes(github[1]));
    if (target) return docHref(target.key, github[2], github[3]);
    // A source not on the site yet (a private repository): no link at all.
    if (docSources.some((d) => d.aliases.includes(github[1]))) return null;
    return href;
  }
  if (/^[a-z]+:/.test(href)) return href;

  const [file, hash = ''] = href.split('#');
  const resolved = path.posix.normalize(path.posix.join('docs', path.posix.dirname(slug), file));
  const page = resolved.match(/^docs\/([\w-]+)\.md$/);
  if (page && readFile(source.key, page[1]) !== null) {
    return docHref(source.key, page[1], hash && `#${hash}`);
  }
  // The API reference is the site's own pages at /api/: a service, a route
  // or a shape by what follows the # (lib/api.js).
  if (source.key === 'services' && /^docs\/api\/(index\.html)?$/.test(resolved)) {
    return apiHref(hash);
  }
  if (resolved.startsWith('docs/images/')) {
    return `/docs-assets/${source.key}/${resolved.slice('docs/'.length)}`;
  }
  // Anything else (plans, code) is read on GitHub.
  return `https://github.com/${source.repo}/blob/${source.branch}/${resolved}${hash && `#${hash}`}`;
}

function docHref(key, slug, hash = '') {
  return slug === 'README' ? `/docs/${key}/${hash}` : `/docs/${key}/${slug}/${hash}`;
}

function rewriteLinks(options) {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a') {
        const href = resolveHref(node.properties.href, options);
        if (href === null) {
          node.tagName = 'span';
          delete node.properties.href;
        } else {
          node.properties.href = href;
        }
      }
      if (node.tagName === 'img') node.properties.src = resolveHref(node.properties.src, options);
    });
  };
}

function collectHeadings({ headings }) {
  const text = (node) =>
    node.type === 'text' ? node.value : (node.children || []).map(text).join('');
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h2' || node.tagName === 'h3') {
        headings.push({ id: node.properties.id, text: text(node), level: Number(node.tagName[1]) });
      }
    });
  };
}
