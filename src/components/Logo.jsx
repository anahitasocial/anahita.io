import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from './Link';

// The circle mark and the name. The PNGs are anahita-web's until the vector
// files arrive; the white one is shown in dark mode.
const mark = { display: 'block', '.dark &': { display: 'none' } };
const markDark = { display: 'none', '.dark &': { display: 'block' } };
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
      <Box component="img" src="/images/logo.png" alt="" width={32} height={32} sx={mark} />
      <Box component="img" src="/images/logo-white.png" alt="" width={32} height={32} sx={markDark} />
      <Typography component="span" variant="h6" sx={{ fontWeight: 500 }}>
        Anahita
      </Typography>
    </Box>
  );
}
