// Markdown to HTML, for the blog's posts, the FAQ's answers and the About
// page's story; outboundLinks is shared with the docs (lib/docs.js).
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

// A link to another site opens in a new tab, and says so: Prose draws an
// arrow after it, and screen readers are told in words.
export function outboundLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a' || !/^https?:\/\//.test(node.properties.href || '')) return;
      node.properties.target = '_blank';
      node.properties.rel = ['noopener', 'noreferrer'];
      node.children.push({
        type: 'element',
        tagName: 'span',
        properties: { className: ['visually-hidden'] },
        children: [{ type: 'text', value: ' (opens in a new tab)' }],
      });
    });
  };
}

// Code in several languages, written in Markdown as a bold label above each
// block (**Go**, then ```go, **Python**, then ```python), becomes tabs: two
// labelled blocks in a row or more. On GitHub they read as they are written.
// Prose styles them and switches between them.
let codeTabsCount = 0;

function label(node) {
  if (node?.type !== 'element' || node.tagName !== 'p' || node.children.length !== 1) return null;
  const strong = node.children[0];
  if (strong.type !== 'element' || strong.tagName !== 'strong' || strong.children.length !== 1) return null;
  const text = strong.children[0];
  return text.type === 'text' && text.value.trim() ? text.value.trim() : null;
}

function slugOf(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function codeTabs() {
  return (tree) => {
    visit(tree, (parent) => {
      if (!parent.children) return;
      const kids = parent.children;
      const out = [];
      let i = 0;
      while (i < kids.length) {
        // The run of label-and-block pairs starting here, white space between
        // them allowed.
        const pairs = [];
        let j = i;
        while (j < kids.length) {
          let k = j;
          while (kids[k]?.type === 'text' && !kids[k].value.trim()) k += 1;
          const name = label(kids[k]);
          let m = k + 1;
          while (kids[m]?.type === 'text' && !kids[m].value.trim()) m += 1;
          if (!name || kids[m]?.tagName !== 'pre') break;
          pairs.push({ name, pre: kids[m] });
          j = m + 1;
        }
        if (pairs.length < 2) {
          out.push(kids[i]);
          i += 1;
          continue;
        }
        codeTabsCount += 1;
        const id = `code-tabs-${codeTabsCount}`;
        out.push({
          type: 'element',
          tagName: 'div',
          properties: { className: ['code-tabs'], dataCodeTabs: '' },
          children: [
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['code-tabs-list'], role: 'tablist' },
              children: pairs.map(({ name }, n) => ({
                type: 'element',
                tagName: 'button',
                properties: {
                  type: 'button',
                  role: 'tab',
                  id: `${id}-${slugOf(name)}-tab`,
                  ariaControls: `${id}-${slugOf(name)}`,
                  ariaSelected: n === 0 ? 'true' : 'false',
                  tabIndex: n === 0 ? 0 : -1,
                  dataTab: name,
                },
                children: [{ type: 'text', value: name }],
              })),
            },
            ...pairs.map(({ name, pre }, n) => ({
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['code-tabs-panel'],
                role: 'tabpanel',
                id: `${id}-${slugOf(name)}`,
                ariaLabelledBy: `${id}-${slugOf(name)}-tab`,
                dataTab: name,
                hidden: n !== 0,
              },
              children: [pre],
            })),
          ],
        });
        i = j;
      }
      parent.children = out;
    });
  };
}

// A picture on a line of its own becomes a Polaroid, as the About page has
// them (components/Polaroid.jsx): every picture on the site is shown so (the
// user, 2026-11-16). Its caption, if it has one, is Markdown's title
// (![What it shows](/images/blog/a.webp "On Mastodon")), written in the
// frame's wide bottom. A diagram (an SVG) takes the page's whole width; a
// screenshot or a photo, at most 480. Prose draws the frame.
export function polaroids() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent) return;
      const kids = node.children.filter((kid) => !(kid.type === 'text' && !kid.value.trim()));
      const img = kids[0];
      if (kids.length !== 1 || img.tagName !== 'img') return;
      const caption = img.properties.title || '';
      delete img.properties.title;
      img.properties.loading = 'lazy';
      const wide = /\.svg$/i.test(img.properties.src || '');
      parent.children[index] = {
        type: 'element',
        tagName: 'figure',
        properties: { className: ['polaroid', ...(wide ? ['wide'] : [])] },
        children: [img, { type: 'element', tagName: 'figcaption', properties: {}, children: caption ? [{ type: 'text', value: caption }] : [] }],
      };
    });
  };
}

export async function toHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    // Code marked with its language (```sh, ```json) is coloured; Prose
    // gives the colours.
    .use(rehypeHighlight, { detect: false })
    .use(codeTabs)
    .use(polaroids)
    .use(outboundLinks)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}
