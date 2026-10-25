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
      })}
    />
  );
}
