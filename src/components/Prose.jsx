'use client';

import Box from '@mui/material/Box';

// Writing from Markdown, set in the theme's type: a readable measure,
// quiet headings, and code that stays inside the page.
export default function Prose({ html }) {
  return (
    <Box
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
          '& code': { bgcolor: 'transparent', p: 0 },
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
      })}
    />
  );
}
