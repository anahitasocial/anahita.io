import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from './Link';
import { footer } from '../data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', mt: 12, py: 4 }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'space-between',
        }}
      >
        <Box component="nav" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {footer.map(({ label, href }) => (
            <MuiLink
              key={label}
              component={href.startsWith('/') ? Link : 'a'}
              href={href}
              variant="body2"
              color="text.secondary"
              underline="hover"
            >
              {label}
            </MuiLink>
          ))}
        </Box>
        <Box sx={{ textAlign: { sm: 'right' } }}>
          <Typography variant="body2" color="text.secondary">
            © 2008–{year} rmd studio. No cookies, no tracking.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Anahita is a registered trademark of rmd studio in Canada.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
