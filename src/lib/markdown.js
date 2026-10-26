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

export async function toHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    // Code marked with its language (```sh, ```json) is coloured; Prose
    // gives the colours.
    .use(rehypeHighlight, { detect: false })
    .use(outboundLinks)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}
