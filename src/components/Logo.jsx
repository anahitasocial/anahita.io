import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from './Link';

// The circle mark and the name. The mark is drawn from the identity's own
// vector file (Anahita_base), without its star and facing right; its white
// ring keeps it clear on a dark background, so one file serves both modes.
export default function Logo() {
  return (
    <Box
      component={Link}
      href="/"
      aria-label="Anahita, home"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: 'text.primary',
        textDecoration: 'none',
      }}
    >
      <Box component="img" src="/images/logo.svg" alt="" width={32} height={32} sx={{ display: 'block' }} />
      <Typography component="span" variant="h6" sx={{ fontWeight: 500 }}>
        Anahita
      </Typography>
    </Box>
  );
}
