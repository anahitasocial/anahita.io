import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Prose from './Prose';

// One page of the docs: its title, the page, and where it came from. On wide
// screens its headings are listed beside it.
export default function DocPage({ doc, eyebrow, title: heading }) {
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
        {source.commit && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 8 }} data-pagefind-ignore>
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
