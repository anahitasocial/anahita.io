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
        <Typography variant="body2" color="text.secondary">
          © {year} Anahita. No cookies, no tracking.
        </Typography>
      </Container>
    </Box>
  );
}
