import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from './Link';
import HeroBackground from './HeroBackground';
import Network from './diagrams/Network';

// Each page draws its own variation of the home page's network: a layout of
// its own (src/components/diagrams/Network.jsx), and a seed from its title.
// A page not named here takes a layout by its seed.
const layoutOf = {
  Products: 1,
  'Anahita Services': 2,
  Docs: 3,
  FAQ: 4,
  Blog: 5,
  Donate: 6,
};
const seedOf = (text) => [...String(text)].reduce((n, c) => (n * 31 + c.charCodeAt(0)) | 0, 7);

// The top of every page but the home page: its title, and a line on what it
// holds. `parent` is the page above it ({ href, label }), shown over the title.
export default function PageHeader({ parent, title, subtitle, children }) {
  return (
    <HeroBackground component="header">
      <Container sx={{ pt: { xs: 8, md: 12 }, display: 'flex', alignItems: 'center', gap: { md: 6 } }}>
        <Box sx={{ maxWidth: 680, flex: '1 1 600px' }}>
          {parent && (
            <MuiLink component={Link} href={parent.href} variant="body2" underline="hover" sx={{ display: 'inline-block', mb: 2 }}>
              {parent.label}
            </MuiLink>
          )}
          <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3rem' } }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, fontSize: { xs: '1.125rem', md: '1.25rem' } }}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </Box>
        <Network
          seed={seedOf(title)}
          layout={layoutOf[title] ?? 1 + (Math.abs(seedOf(title)) % 6)}
          sx={{
            display: { xs: 'none', md: 'block' },
            flex: '0 1 440px',
            maxWidth: 460,
            minWidth: 0,
            ml: 'auto',
            // A tall layout is scaled to fit, so every header keeps a like depth.
            '& svg': { maxHeight: 300 },
          }}
        />
      </Container>
    </HeroBackground>
  );
}
