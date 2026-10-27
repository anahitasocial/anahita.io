import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BlueskyIcon from './BlueskyIcon';
import Link from './Link';
import { footer, site } from '../data/site';

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
        <Box component="nav" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 3, rowGap: 1 }}>
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
          {/* Anahita's own account, @anahita.io: a profile to follow. */}
          <IconButton
            href={site.bluesky}
            aria-label="Anahita on Bluesky"
            title="Anahita on Bluesky"
            size="small"
            sx={{ color: 'text.secondary', ml: -1, '&:hover': { color: '#1185FE' } }}
          >
            <BlueskyIcon fontSize="small" />
          </IconButton>
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
