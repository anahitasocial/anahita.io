import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from './Link';

// Who wrote a page of the docs or the API, at its foot, with the section of
// About that says how the site is written (the user, 2026-10-27: people
// should know how much is written by Claude).
export default function WrittenBy({ sx }) {
  return (
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ...sx }} data-pagefind-ignore>
      Written by Claude, reviewed by Rastin Mehr ·{' '}
      <MuiLink component={Link} href="/about/#ai-usage" underline="hover">
        About this
      </MuiLink>
    </Typography>
  );
}
