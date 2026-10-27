'use client';

import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';

// The language last chosen in a group of code tabs (lib/markdown.js,
// codeTabs), for every group on every page.
const TAB_KEY = 'anahita-code-tab';

function choose(root, name) {
  root.querySelectorAll('[data-code-tabs]').forEach((group) => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    if (!tabs.some((tab) => tab.dataset.tab === name)) return;
    tabs.forEach((tab) => {
      const on = tab.dataset.tab === name;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    group.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
      panel.hidden = panel.dataset.tab !== name;
    });
  });
}

// Writing from Markdown, set in the theme's type: a readable measure,
// quiet headings, and code that stays inside the page.
export default function Prose({ html }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !root.querySelector('[data-code-tabs]')) return undefined;
    try {
      const saved = window.localStorage.getItem(TAB_KEY);
      if (saved) choose(root, saved);
    } catch {
      // No storage: the first tab of each group stays chosen.
    }
    const pick = (name) => {
      choose(root, name);
      try {
        window.localStorage.setItem(TAB_KEY, name);
      } catch {
        // Not remembered, which is all.
      }
    };
    const onClick = (event) => {
      const tab = event.target.closest('[data-code-tabs] [role="tab"]');
      if (tab) pick(tab.dataset.tab);
    };
    // Left and right move between a group's tabs, as in any tab list.
    const onKey = (event) => {
      const tab = event.target.closest('[data-code-tabs] [role="tab"]');
      if (!tab || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      const tabs = [...tab.parentElement.querySelectorAll('[role="tab"]')];
      const next = tabs[(tabs.indexOf(tab) + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      pick(next.dataset.tab);
      next.focus();
      event.preventDefault();
    };
    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKey);
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('keydown', onKey);
    };
  }, [html]);

  return (
    <Box
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
      sx={(theme) => ({
        maxWidth: 680,
        ...theme.typography.body1,
        fontSize: '1.0625rem',
        lineHeight: 1.75,
        '& h2': { ...theme.typography.h3, mt: 6, mb: 2 },
        '& h3': { ...theme.typography.h4, mt: 4, mb: 1 },
        '& p, & ul, & ol': { my: 2 },
        '& li': { my: 0.5 },
        '& a': { color: 'primary.main' },
        // After a link to another site, a small arrow out of a box (MUI's
        // OpenInNew), in the link's own colour.
        '& a[target="_blank"]::after': {
          content: '""',
          display: 'inline-block',
          width: '0.75em',
          height: '0.75em',
          ml: 0.25,
          verticalAlign: '-0.05em',
          bgcolor: 'currentColor',
          mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z'/%3E%3C/svg%3E") center / contain no-repeat`,
        },
        '& .visually-hidden': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
        },
        '& code': {
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '0.875em',
          bgcolor: 'action.hover',
          borderRadius: 1,
          px: 0.5,
        },
        '& pre': {
          bgcolor: 'action.hover',
          borderRadius: 2,
          p: 2,
          overflowX: 'auto',
          lineHeight: 1.5,
          // Go is indented with tabs: four wide, not the browser's eight.
          tabSize: 4,
          '& code': { bgcolor: 'transparent', p: 0 },
        },
        // Code in several languages, one tab each: quiet labels, the chosen
        // one underlined, and the code below in the same box.
        '& .code-tabs': {
          my: 3,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          '& pre': { m: 0, borderRadius: 0 },
        },
        '& .code-tabs-list': {
          display: 'flex',
          overflowX: 'auto',
          borderBottom: 1,
          borderColor: 'divider',
          px: 1,
        },
        '& .code-tabs-list button': {
          appearance: 'none',
          border: 0,
          borderBottom: '2px solid transparent',
          mb: '-1px',
          bgcolor: 'transparent',
          color: 'text.secondary',
          cursor: 'pointer',
          ...theme.typography.body2,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          px: 2,
          py: 1,
          '&:hover': { color: 'text.primary' },
          '&[aria-selected="true"]': { color: 'text.primary', borderBottomColor: 'primary.main' },
          '&:focus-visible': { outline: 2, outlineColor: 'primary.main', outlineOffset: -2 },
        },
        '& blockquote': {
          borderLeft: 2,
          borderColor: 'divider',
          color: 'text.secondary',
          m: 0,
          pl: 2,
        },
        '& img': { maxWidth: '100%', borderRadius: 2 },
        // Wide tables scroll inside the page rather than widening it.
        '& table': {
          display: 'block',
          overflowX: 'auto',
          borderCollapse: 'collapse',
          my: 3,
          ...theme.typography.body2,
        },
        '& th, & td': {
          borderBottom: 1,
          borderColor: 'divider',
          textAlign: 'left',
          verticalAlign: 'top',
          px: 1.5,
          py: 1,
        },
        '& th': { fontWeight: 500 },
        // Long names (REACT_APP_…) break, so the column beside them keeps its room.
        '& td code': { overflowWrap: 'anywhere' },
        '& td:first-of-type': { minWidth: 120 },
        '& h2, & h3': { scrollMarginTop: 88 },
        // Code coloured by language (rehype-highlight): few colours, quiet,
        // each readable on the code block's background in light and dark.
        '--code-comment': '#6E7781',
        '--code-keyword': '#8250DF',
        '--code-string': '#0A6E3F',
        '--code-number': '#0550AE',
        '--code-title': '#953800',
        '.dark &': {
          '--code-comment': '#8B949E',
          '--code-keyword': '#D2A8FF',
          '--code-string': '#7EE787',
          '--code-number': '#79C0FF',
          '--code-title': '#FFA657',
        },
        '& .hljs-comment, & .hljs-quote': { color: 'var(--code-comment)', fontStyle: 'italic' },
        '& .hljs-keyword, & .hljs-built_in, & .hljs-selector-tag, & .hljs-meta': { color: 'var(--code-keyword)' },
        '& .hljs-string, & .hljs-attr + .hljs-string, & .hljs-regexp': { color: 'var(--code-string)' },
        '& .hljs-number, & .hljs-literal, & .hljs-variable, & .hljs-template-variable': { color: 'var(--code-number)' },
        '& .hljs-attr, & .hljs-title, & .hljs-section, & .hljs-name, & .hljs-type': { color: 'var(--code-title)' },
      })}
    />
  );
}
