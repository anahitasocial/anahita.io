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
