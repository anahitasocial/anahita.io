import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from './Link';

// The top of every page but the home page: its title, and a line on what it
// holds. `parent` is the page above it ({ href, label }), shown over the title.
export default function PageHeader({ parent, title, subtitle, children }) {
  return (
    <Container component="header" sx={{ pt: { xs: 8, md: 12 } }}>
      <Box sx={{ maxWidth: 680 }}>
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
    </Container>
  );
}
