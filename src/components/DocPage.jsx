import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Prose from './Prose';

// The page before and the page after, at the foot of the page: quiet boxes,
// side by side, each saying which way it goes and where.
function Neighbours({ previous, next }) {
  if (!previous && !next) return null;
  const box = (page, label, align) => (
    <MuiLink
      href={page.href}
      underline="none"
      color="inherit"
      sx={{
        display: 'block',
        gridColumn: align === 'right' ? { sm: 2 } : undefined,
        textAlign: align,
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        px: 2,
        py: 1.5,
        '&:hover': { borderColor: 'text.secondary' },
      }}
    >
      <Typography variant="body2" color="text.secondary" component="span" sx={{ display: 'block' }}>
        {label}
      </Typography>
      <Typography variant="subtitle1" component="span" sx={{ display: 'block' }}>
        {page.title}
      </Typography>
    </MuiLink>
  );
  return (
    <Box
      component="nav"
      aria-label="Previous and next pages"
      data-pagefind-ignore
      sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 8 }}
    >
      {previous && box(previous, '← Previous', 'left')}
      {next && box(next, 'Next →', 'right')}
    </Box>
  );
}

// One page of the docs: its title, the page, and where it came from. On wide
// screens its headings are listed beside it.
export default function DocPage({ doc, eyebrow, title: heading, neighbours = {} }) {
  const { html, headings, source } = doc;
  const title = heading || doc.title;
  const sections = headings.filter(({ level }) => level === 2);

  return (
    <Box sx={{ display: 'flex', gap: 6 }}>
      <Box component="article" sx={{ flexGrow: 1, minWidth: 0, maxWidth: 760 }}>
        <Typography variant="body2" color="text.secondary">
          {eyebrow || source.title}
        </Typography>
        <Typography variant="h1" sx={{ mt: 1, mb: 4, fontSize: { xs: '2rem', md: '2.5rem' } }}>
          {title}
        </Typography>
        <Prose html={html} />
        <Neighbours previous={neighbours.previous} next={neighbours.next} />
        {source.commit && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }} data-pagefind-ignore>
            From{' '}
            <MuiLink href={`https://github.com/${source.repo}/tree/${source.commit}/docs`} underline="hover">
              {source.repo}
            </MuiLink>
            , {source.date}.
          </Typography>
        )}
      </Box>
      {sections.length > 1 && (
        <Box
          component="nav"
          aria-label="On this page"
          data-pagefind-ignore
          sx={{ display: { xs: 'none', lg: 'block' }, width: 200, flexShrink: 0 }}
        >
          <Box sx={{ position: 'sticky', top: 88 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
              On this page
            </Typography>
            {sections.map(({ id, text }) => (
              <MuiLink
                key={id}
                href={`#${id}`}
                variant="body2"
                color="text.secondary"
                underline="hover"
                sx={{ display: 'block', py: 0.5 }}
              >
                {text}
              </MuiLink>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
