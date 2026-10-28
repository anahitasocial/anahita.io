import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from './Link';
import HeroBackground from './HeroBackground';
import HeroRule from './HeroRule';
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
      <Container
        sx={{
          pt: { xs: 8, md: 12 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          gap: { xs: 4, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: 680, flex: { md: '1 1 600px' } }}>
          {parent && (
            <MuiLink component={Link} href={parent.href} variant="body2" underline="hover" sx={{ display: 'inline-block', mb: 2 }}>
              {parent.label}
            </MuiLink>
          )}
          <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3rem' } }}>
            {title}
          </Typography>
          {subtitle && <HeroRule />}
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 3, fontSize: { xs: '1.125rem', md: '1.25rem' } }}
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
            // Beside the words on wide screens; under them, smaller, on a phone.
            flex: { md: '0 1 440px' },
            width: { xs: '100%', md: 'auto' },
            maxWidth: { xs: 320, md: 460 },
            minWidth: 0,
            mx: { xs: 'auto', md: 0 },
            ml: { md: 'auto' },
            // A tall layout is scaled to fit, so every header keeps a like depth.
            '& svg': { maxHeight: { xs: 200, md: 300 } },
          }}
        />
      </Container>
    </HeroBackground>
  );
}
