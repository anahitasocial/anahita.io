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
    .use(outboundLinks)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}
